CREATE TABLE bank_question (
	id SERIAL,
	bank_id INT8 NOT NULL,
	question_id INT8 NOT NULL,
	PRIMARY KEY (id ASC),
	FOREIGN KEY (bank_id) REFERENCES bank (id),
	FOREIGN KEY (question_id) REFERENCES question (id),
	UNIQUE (bank_id, question_id)
);