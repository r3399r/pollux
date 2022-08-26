CREATE TABLE user_user (
	id SERIAL,
	src_user_id STRING NOT NULL,
	dst_user_id STRING NOT NULL,
	nickname STRING NOT NULL,
	PRIMARY KEY (id ASC),
	UNIQUE (src_user_id, dst_user_id)
);