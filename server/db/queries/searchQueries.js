const db = require('../index');

async function searchBooks(queryParams) {
  const {
    searchTerm,
    searchType = 'all',
    genres = [],
    minRating,
    maxRating,
    minRatingCount,
    maxRatingCount,
    startYear,
    endYear,
    sortBy = 'relevance',
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
          bm.image AS "coverImage",
          bm.average_rating AS rating,
          bm.published_year AS "publishedYear",
          bm.rating_count AS "ratingsCount",
          ts_rank(
            to_tsvector('english', lower(coalesce(bm.title, '') || ' ' || 
                        coalesce(bm.description, ''))), 
            to_tsquery('english', lower($1))
          ) AS relevance_score
        FROM books_metadata bm
        WHERE 1=1
    `;

    const values = [];
    let paramCount = 1;

    if (searchTerm) {
      // Convert search term to proper tsquery format with AND operator
      const searchVector = searchTerm
        .trim()
        .toLowerCase()  // Convert to lowercase for case-insensitive search
        .split(/\s+/)
        .map(word => word + ':*')  // Add prefix matching
        .join(' & ');  // Use AND operator
      values.push(searchVector);
      
      if (searchType === 'title') {
        query += ` AND to_tsvector('english', lower(bm.title)) @@ to_tsquery('english', $${paramCount})`;
      } else if (searchType === 'author') {
        query += ` AND to_tsvector('english', lower(bm.authors)) @@ to_tsquery('english', $${paramCount})`;
      } else {
        query += ` AND (
          to_tsvector('english', lower(coalesce(bm.title, ''))) @@ to_tsquery('english', $${paramCount}) OR
          to_tsvector('english', lower(coalesce(bm.authors, ''))) @@ to_tsquery('english', $${paramCount}) OR
          to_tsvector('english', lower(coalesce(bm.description, ''))) @@ to_tsquery('english', $${paramCount})
        )`;
      }
      paramCount++;
    }

  
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

    if (minRatingCount !== undefined) {
      query += ` AND bm.rating_count >= $${paramCount}`;
      values.push(minRatingCount);
      paramCount++;
    }
    if (maxRatingCount !== undefined) {
      query += ` AND bm.rating_count <= $${paramCount}`;
      values.push(maxRatingCount);
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

    query += `
      )
      SELECT 
        bs.*,
        COUNT(*) OVER() as total_count
      FROM book_search bs
    `;

    switch (sortBy) {
      case 'relevance':
        query += ` ORDER BY 
          CASE 
            WHEN lower(bs.title) LIKE lower($${paramCount}) THEN 1  -- Exact match gets highest priority
            WHEN lower(bs.title) LIKE lower($${paramCount + 1}) THEN 2  -- Starts with search term
            ELSE 3
          END,
          bs.relevance_score DESC, 
          bs.rating DESC`;
        values.push(`%${searchTerm}%`, `${searchTerm}%`);
        paramCount += 2;
        break;
      case 'rating_count':
        query += ` ORDER BY bs."ratingsCount" ${sortOrder.toUpperCase()} NULLS LAST`;
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