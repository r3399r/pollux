CREATE TABLE tag (
	id SERIAL,
	name STRING NOT NULL,
	user_id STRING NOT NULL,
	date_created TIMESTAMP NULL,
	date_updated TIMESTAMP NULL,
	PRIMARY KEY (id ASC),
	UNIQUE (name, user_id)
);