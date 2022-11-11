CREATE TABLE question (
	id SERIAL,
	content STRING NOT NULL,
	answer STRING NULL,
	solution STRING NULL,
	is_mathjax BOOLEAN NOT NULL,
	user_id STRING NOT NULL,
	date_created TIMESTAMP NULL,
	date_updated TIMESTAMP NULL,
	PRIMARY KEY (id ASC)
);