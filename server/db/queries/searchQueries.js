const db = require('../index');

async function searchBooks(queryParams) {
  const {
    searchTerm,
    searchType = 'all', // 新增全局搜索选项
    genres = [],
    minRating,
    maxRating,
    startYear,
    endYear,
    sortBy = 'relevance', // 新增相关性排序
    sortOrder = 'desc',
    limit = 20,
    offset = 0
  } = queryParams;

  try {
    let query = `
      WITH book_search AS (
        SELECT 
          bm.title AS id,
          bm.title,
          bm.authors AS author,
          bm.image AS "coverImage",
          bm.average_rating AS rating,
          bm.published_year AS "publishedYear",
          bm.ratings_count AS "ratingsCount",
          // 新增相关性计算
          ts_rank(
            to_tsvector('english', coalesce(bm.title, '') || ' ' || 
                        coalesce(bm.authors, '') || ' ' || 
                        coalesce(bm.description, '')), 
            to_tsquery('english', $1)
          ) AS relevance_score
        FROM books_metadata bm
        WHERE 1=1
    `;

    const values = [];
    let paramCount = 1;

    // 全文搜索改进
    if (searchTerm) {
      const searchVector = searchTerm.split(' ').map(term => `${term}:*`).join(' & ');
      values.push(searchVector);
      
      if (searchType === 'title') {
        query += ` AND to_tsvector('english', bm.title) @@ to_tsquery('english', $${paramCount})`;
      } else if (searchType === 'author') {
        query += ` AND to_tsvector('english', bm.authors) @@ to_tsquery('english', $${paramCount})`;
      } else { // 全局搜索
        query += ` AND (
          to_tsvector('english', coalesce(bm.title, '')) @@ to_tsquery('english', $${paramCount}) OR
          to_tsvector('english', coalesce(bm.authors, '')) @@ to_tsquery('english', $${paramCount}) OR
          to_tsvector('english', coalesce(bm.description, '')) @@ to_tsquery('english', $${paramCount})
        )`;
      }
      paramCount++;
    }

    // 类型和年份过滤保持不变
    if (genres && genres.length > 0) {
      query += `
        AND EXISTS (
          SELECT 1 
          FROM book_categories bc
          JOIN categories c ON bc.category_id = c.category_id
          WHERE bc.book_title = bm.title
          AND c.category_name = ANY($${paramCount}::text[])
        )
      `;
      values.push(genres);
      paramCount++;
    }

    // 评分和年份过滤
    if (minRating !== undefined) {
      query += ` AND bm.average_rating >= $${paramCount}`;
      values.push(minRating);
      paramCount++;
    }
    if (maxRating !== undefined) {
      query += ` AND bm.average_rating <= $${paramCount}`;
      values.push(maxRating);
      paramCount++;
    }

    if (startYear !== undefined) {
      query += ` AND bm.published_year >= $${paramCount}`;
      values.push(startYear);
      paramCount++;
    }
    if (endYear !== undefined) {
      query += ` AND bm.published_year <= $${paramCount}`;
      values.push(endYear);
      paramCount++;
    }

    // 关闭 CTE
    query += `
      )
      SELECT 
        bs.*,
        COUNT(*) OVER() as total_count
      FROM book_search bs
    `;

    // 智能排序
    switch (sortBy) {
      case 'relevance':
        query += ` ORDER BY bs.relevance_score DESC, bs.rating DESC`;
        break;
      case 'title':
        query += ` ORDER BY bs.title ${sortOrder.toUpperCase()}`;
        break;
      case 'rating':
        query += ` ORDER BY bs.rating ${sortOrder.toUpperCase()} NULLS LAST`;
        break;
      case 'year':
        query += ` ORDER BY bs."publishedYear" ${sortOrder.toUpperCase()} NULLS LAST`;
        break;
      default:
        query += ` ORDER BY bs.relevance_score DESC, bs.rating DESC`;
    }

    // 分页
    query += ` LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    values.push(limit, offset);

    const result = await db.query(query, values);
    
    const totalCount = result.rows.length > 0 ? parseInt(result.rows[0].total_count) : 0;
    
    const books = result.rows.map(({ total_count, relevance_score, ...book }) => book);

    return {
      books,
      total: totalCount
    };
  } catch (error) {
    console.error('搜索书籍时出错:', error);
    throw error;
  }
}

// 获取所有类别的函数
async function getAllCategories() {
  try {
    const query = `
      SELECT DISTINCT category_name 
      FROM categories 
      WHERE category_name IS NOT NULL AND TRIM(category_name) != ''
      ORDER BY category_name
    `;
    const result = await db.query(query);
    return result.rows.map(row => row.category_name);
  } catch (error) {
    console.error('获取类别时出错:', error);
    throw error;
  }
}

module.exports = {
  searchBooks,
  getAllCategories
};