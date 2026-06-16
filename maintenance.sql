-- =========================
-- Inspect database
-- =========================
SELECT table_schema, table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_type = 'BASE TABLE'
ORDER BY table_name;

SHOW TIMEZONE;


-- =========================
-- Select all rows
-- =========================
SELECT * FROM users;
SELECT * FROM sessions;
SELECT * FROM user_themes;
SELECT * FROM user_profile_images;


-- =========================
-- Delete all rows
-- Child tables first, parent tables last
-- =========================
DELETE FROM user_profile_images;
DELETE FROM user_themes;
DELETE FROM sessions;
DELETE FROM users;


-- =========================
-- Drop tables
-- Child tables first, parent tables last
-- =========================
DROP TABLE IF EXISTS user_profile_images CASCADE;
DROP TABLE IF EXISTS user_themes CASCADE;
DROP TABLE IF EXISTS sessions CASCADE;
DROP TABLE IF EXISTS users CASCADE;

DROP TYPE IF EXISTS theme;