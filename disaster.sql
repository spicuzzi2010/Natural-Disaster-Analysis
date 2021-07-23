CREATE TABLE disaster(
	id SERIAL Primary Key,
    county VARCHAR,
    state VARCHAR,
	lat FLOAT,
	lon FLOAT,
    year INT,
	date DATE,
    disastertype VARCHAR,
    declarationtitle VARCHAR
);

SELECT * FROM disaster;