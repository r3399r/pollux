CREATE TABLE question_tag (
	id SERIAL,
	question_id INT8 NOT NULL,
	tag_id INT8 NOT NULL,
	PRIMARY KEY (id ASC),
	FOREIGN KEY (question_id) REFERENCES question (id),
	FOREIGN KEY (tag_id) REFERENCES tag (id),
	UNIQUE (question_id, tag_id)
);