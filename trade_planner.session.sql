
-- SELECT * FROM user_calc;
-- DELETE FROM user_req;
-- DELETE FROM user_calc;
-- DELETE FROM user_req WHERE id = 8;


-- ALTER TABLE user_calc
-- DROP COLUMN user_id;

-- -- 2. اضافه کردن ستون با نوع جدید
-- ALTER TABLE user_calc
-- ADD COLUMN user_id INTEGER;


-- ALTER TABLE user_calc
-- ALTER COLUMN user_id TYPE NUMERIC
-- USING user_id::integer;

-- CREATE TABLE user_calc(
--     id SERIAL PRIMARY KEY,
--     full_name VARCHAR(1000),
--     month_level VARCHAR(20),
--     first_of_month_cap NUMERIC,
--     last_of_month_cap NUMERIC,
--     profit_per_day NUMERIC,
--     profit_per_day_rate NUMERIC,
--     profit_per_month NUMERIC,
--     profit_per_month_rate NUMERIC,
--     max_lot NUMERIC,
--     financial_symbol VARCHAR(10),
--     risk_management_pip NUMERIC


-- );


-- VALUES (
--     id:integer,
--     'first_name:character varying',
--     'last_name:character varying',
--     initial_capital:numeric,
--     target_capital:numeric,
--     daily_max_loss_limit:numeric,
--     working_days_in_month:integer
--   );

-- ALTER TABLE user_calc
-- ADD COLUMN user_id NUMERIC;

