DROP TABLE IF EXISTS disaster CASCADE;

CREATE TABLE disaster(
    id BIG INT NOT NULL,
    county VARCHAR,
    state VARCHAR,
	lat FLOAT,
	lon FLOAT,
    year INT,
	date DATE,
    disastertype VARCHAR,
    declarationtitle VARCHAR
);

ALTER TABLE disaster
ADD PRIMARY KEY (id);