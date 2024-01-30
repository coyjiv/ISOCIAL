DROP TABLE IF EXISTS users;
CREATE TABLE public.users
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    first_name         VARCHAR(250) NOT NULL,
    last_name          VARCHAR(250),
    email              VARCHAR(250) NOT NULL,
    city               VARCHAR(250),
    password           VARCHAR(250),
    avatars_url        VARCHAR ARRAY,
    banner_url         VARCHAR,
    bio                VARCHAR,
    is_private         BOOLEAN  NOT NULL DEFAULT FALSE,
    last_seen          TIMESTAMP,
    date_of_birth      DATE,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS posts;
CREATE TABLE public.posts
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    text_content       VARCHAR(1000) NOT NULL,
    attachments        VARCHAR ARRAY,
    is_edited          BOOLEAN NOT NULL DEFAULT FALSE,
    original_post_id   INT NOT NULL DEFAULT 0,
    user_id            INTEGER REFERENCES users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active BOOLEAN  NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS roles;
CREATE TABLE public.roles
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

