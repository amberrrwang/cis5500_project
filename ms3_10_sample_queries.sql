
-- 1. For the book's detail page: Given an ISBN number, find average rate score, reviews, and other
-- information related to this book.(complex) (non-trivial runtime). We may want to break this
-- query into separate queries. (YS)
SELECT
ib.isbn,
ib.isbn13,
ib.title AS isbndb_title,
ib.language,
ib.title_long,
ib.date_published,
bm.description,
bm.authors,
bm.image,
bm.previewLink,
bm.publisher,
bm.info_link,
-- assume rating_count cleaned
bm.ratings_count,
ARRAY_AGG(DISTINCT a.name) AS author_names,
ARRAY_AGG(DISTINCT c.name) AS category_names,
COUNT(br.user_id) AS review_count,
-- add more field from review tablelater
ARRAY_AGG(br.review_summary) AS review_summaries,
ARRAY_AGG(br.review_text) AS review_text,
SUM(CASE WHEN br.score = 5 THEN 1 ELSE 0 END) AS five_star_count,
SUM(CASE WHEN br.score = 4 THEN 1 ELSE 0 END) AS four_star_count,
SUM(CASE WHEN br.score = 3 THEN 1 ELSE 0 END) AS three_star_count,
SUM(CASE WHEN br.score = 2 THEN 1 ELSE 0 END) AS two_star_count,
SUM(CASE WHEN br.score = 1 THEN 1 ELSE 0 END) AS one_star_count
FROM isbndb_books ib
-- Join metadata
LEFT JOIN book_mapping map ON ib.isbn13 = map.isbn13
LEFT JOIN books_metadata bm ON map.title = bm.title
-- Join book reviews using ISBN
LEFT JOIN book_reviews br ON br.book_id = ib.isbn
-- Join authors
LEFT JOIN book_authors ba ON ba.isbn = ib.isbn
LEFT JOIN authors a ON a.author_id = ba.author_id
-- Join categories
LEFT JOIN book_categories bc ON bc.book_title = bm.title
LEFT JOIN categories c ON c.category_id = bc.category_id
WHERE ib.isbn = $ISBN_NUMBER
GROUP BY
ib.isbn, ib.isbn13, ib.title, ib.language, ib.title_long,
ib.date_published,
bm.description, bm.authors, bm.image, bm.previewLink, bm.publisher,
bm.info_link,bm.rating_count;

-- 2. Individual Book list page. Given a book list id, return all the book's information in that list,
-- allowing the user to sort the list based on some criteria. (YS)
SELECT
ib.isbn,
ib.isbn13,
bm.title,
bm.description,
bm.authors,
bm.image,
bm.previewLink,
bm.publisher,
bm.info_link,
bm.ratings_count,
bm.average_rating
FROM reading_list_books rlb
JOIN books_metadata bm ON rlb.book_title = bm.title
JOIN book_mapping map ON bm.title = map.title
JOIN isbndb_books ib ON map.isbn13 = ib.isbn13
WHERE rlb.list_id = $list_id;
-- add more here such as ORDER BY ratings if needed

-- 3. Reading list overview page for a user's own list. Show all the reading list this user has and
-- create preview information for each of them. (complex) (YS)
SELECT
rl.list_id,
rl.list_name,
rl.description,
rl.created_date,
rl.is_public,
COUNT(rlb.book_title) AS book_count,
MAX(rlb.date_added) AS latest_date_added,
-- preview image from latest added book
(
SELECT bm.image
FROM reading_list_books rlb2
JOIN books_metadata bm ON rlb2.book_title = bm.title
WHERE rlb2.list_id = rl.list_id
ORDER BY rlb2.date_added DESC
LIMIT 1
) AS preview_image
FROM reading_lists rl
LEFT JOIN reading_list_books rlb ON rl.list_id = rlb.list_id
WHERE rl.user_id = :user_id
GROUP BY rl.list_id, rl.list_name, rl.description, rl.created_date,
rl.is_public
ORDER BY rl.created_date DESC;

-- 4. Return the book's ISBN written by a specific author (Amber)
SELECT bm.authors, bm.title, ib.isbn, ib.isbn13
FROM books_metadata bm
JOIN book_mapping m ON bm.title = m.title
JOIN isbndb_books ib ON m.isbn13 = ib.isbn13
WHERE bm.authors ILIKE '%' || :author_name || '%';

-- 5. Filter (all books) to get a list of books based on filters like genre, publisher, and publication
-- date (Amber)
SELECT
bm.title,
bm.authors,
ib.isbn,
ib.isbn13,
ib.date_published,
bm.publisher,
c.category_name AS genre
FROM books_metadata bm
JOIN book_reviews br ON bm.title = br.title
JOIN book_mapping m ON bm.title = m.title
JOIN isbndb_books ib ON m.isbn13 = ib.isbn13
JOIN book_categories bc ON bm.title = bc.book_title
JOIN categories c ON bc.category_id = c.category_id
WHERE bm.publisher ILIKE '%' || :publisher_name || '%'
AND c.category_name ILIKE '%' || :category_name || '%'
AND TRY_CAST(ib.date_published AS DATE)
BETWEEN :start_date AND :end_date
GROUP BY bm.title, bm.authors, ib.isbn, ib.isbn13, ib.date_published,
bm.publisher, c.category_name;

-- 6. Retrieving a specific user booklist (Scott)
SELECT
b.book_id,
b.title,
b.image AS cover_image,
b.average_rating,
b.publisher,
b.date_published,
rlb.date_added,
rlb.notes,
STRING_AGG(a.name, ', ') AS authors
FROM
reading_lists rl
JOIN
reading_list_books rlb ON rl.list_id = rlb.list_id
JOIN
books b ON rlb.book_id = b.book_id
LEFT JOIN
book_authors ba ON b.book_id = ba.book_id
LEFT JOIN
authors a ON ba.author_id = a.author_id
WHERE
rl.user_id = $1
AND rl.list_name = 'Favorites'
GROUP BY
b.book_id, rlb.date_added, rlb.notes
ORDER BY
rlb.date_added DESC;

-- 7. Given user input of when a book is published, the average rating score, average helpfulness,
-- we want to find books that have at least 3 reviews(so that it is popular). (complex) (YS)
SELECT
bm.title,
bm.authors,
bm.image,
bm.publisher,
bm.previewLink,
AVG(br.score) AS average_rating,
AVG(
CAST(SPLIT_PART(br.helpfulness, '/', 1) AS FLOAT) /
NULLIF(CAST(SPLIT_PART(br.helpfulness, '/', 2) AS FLOAT), 0)
) AS average_helpfulness,
COUNT(br.review_id) AS review_count,
ib.date_published
FROM book_reviews br
JOIN books_metadata bm ON br.title = bm.title
JOIN book_mapping map ON bm.title = map.title
JOIN isbndb_books ib ON map.isbn13 = ib.isbn13
WHERE
ib.date_published >= $published_after AND
ib.date_published <= $published_before
GROUP BY
bm.title, bm.authors, bm.image, bm.publisher, bm.previewLink,
ib.date_published
HAVING
COUNT(br.review_id) >= 3 AND
AVG(br.score) >= $min_rating AND
AVG(
CAST(SPLIT_PART(br.helpfulness, '/', 1) AS FLOAT) /
NULLIF(CAST(SPLIT_PART(br.helpfulness, '/', 2) AS FLOAT), 0)
) >= $min_helpfulness;

-- 8. When a user visits an author's detail page, the website needs to provide comprehensive
-- information about the author, including all books they've written, publishing statistics,
-- average ratings across all their works, and more details for all their books. (Scott)
SELECT
a.author_id,
a.name AS author_name,
COUNT(DISTINCT b.book_id) AS book_count,
AVG(b.average_rating) AS avg_rating,
STRING_AGG(DISTINCT b.publisher, ', ') AS publishers,
json_agg(
json_build_object(
'book_id', b.book_id,
'title', b.title,
'isbn', b.isbn,
'isbn13', b.isbn13,
'publisher', b.publisher,
'date_published', b.date_published,
'average_rating', b.average_rating
)
ORDER BY
b.date_published DESC
) AS books
FROM
authors a
JOIN
book_authors ba ON a.author_id = ba.author_id
JOIN
books b ON ba.book_id = b.book_id
WHERE
a.author_id = $1
GROUP BY
a.author_id, a.name;

-- 9. This recommendation system finds books that share the most categories or genres with a
-- given book. When a user is viewing a book's details page, this query will generate a list of
-- recommendations based on genre similarity, helping users discover new books that match
-- their current interests. (Scott)
WITH
book_categories_count AS (
SELECT
category_id,
COUNT(*) OVER() AS total_categories
FROM
book_categories
WHERE
book_id = $1
),
other_books_similarity AS (
SELECT
b.book_id,
b.title,
b.average_rating,
b.image AS cover_image,
COUNT(*) AS shared_categories,
MAX(bcc.total_categories) AS total_target_categories,
COUNT(*)::float / MAX(bcc.total_categories) AS similarity_score
FROM
book_categories bc
JOIN
book_categories_count bcc ON bc.category_id = bcc.category_id
JOIN
books b ON bc.book_id = b.book_id
WHERE
bc.book_id <> $1
GROUP BY
b.book_id, b.title, b.average_rating, b.image
)
SELECT
obs.book_id,
obs.title,
obs.average_rating,
obs.cover_image,
obs.shared_categories,
obs.total_target_categories,
obs.similarity_score,
(SELECT
STRING_AGG(a.name, ', ')
FROM
book_authors ba
JOIN
authors a ON ba.author_id = a.author_id
WHERE
ba.book_id = obs.book_id
) AS authors,
(SELECT
STRING_AGG(c.name, ', ')
FROM
book_categories bc
JOIN
categories c ON bc.category_id = c.category_id
WHERE
bc.book_id = obs.book_id
) AS categories
FROM
other_books_similarity obs
WHERE
obs.shared_categories > 0
ORDER BY
obs.similarity_score DESC,
obs.average_rating DESC
LIMIT 10;

-- 10. This feature displays the most popular public reading lists on the platform, ranked by the
-- number of books they contain. This helps users discover curated collections of books that
-- might interest them. The query will return each reading list's details along with the number of
-- books it contains and the username of the creator. (Scott)
SELECT
rl.list_id,
rl.list_name,
rl.description,
rl.created_date,
au.username AS creator,
COUNT(rlb.book_id) AS book_count,
(SELECT
json_agg(
json_build_object(
'title', b.title,
'cover_image', b.image
)
)
FROM (
SELECT rlb2.book_id
FROM reading_list_books rlb2
WHERE rlb2.list_id = rl.list_id
LIMIT 3
) top_books
JOIN books b ON top_books.book_id = b.book_id
) AS preview_books
FROM
reading_lists rl
JOIN
app_users au ON rl.user_id = au.user_id
LEFT JOIN
reading_list_books rlb ON rl.list_id = rlb.list_id
WHERE
rl.is_public = TRUE
GROUP BY
rl.list_id, rl.list_name, rl.description, rl.created_date,
au.username
ORDER BY
book_count DESC,
rl.created_date DESC
LIMIT 10;