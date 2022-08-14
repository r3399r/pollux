CREATE TABLE bank_user (
	id SERIAL,
	bank_id INT8 NOT NULL,
	user_id STRING NOT NULL,
	PRIMARY KEY (id ASC),
	FOREIGN KEY (bank_id) REFERENCES bank (id),
	UNIQUE (bank_id, user_id)
);