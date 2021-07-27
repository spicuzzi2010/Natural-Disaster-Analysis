
CREATE TABLE tornado(
	id SERIAL Primary Key,
	lat FLOAT,
	lon FLOAT,
	mag INT,
	date DATE,
	year INT
);

SELECT * FROM tornado;

CREATE TABLE earthquake(
	id SERIAL Primary Key,
	lat FLOAT,
	lon FLOAT,
	mag FLOAT,
	date DATE,
	year INT
);

SELECT * FROM earthquake;