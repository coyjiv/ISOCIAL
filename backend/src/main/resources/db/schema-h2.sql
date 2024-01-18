DROP TABLE IF EXISTS users;
CREATE TABLE public.users
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    first_name         VARCHAR(250) NOT NULL,
    last_name          VARCHAR(250) NOT NULL,
    email              VARCHAR(250) NOT NULL,
    city               VARCHAR(250) NOT NULL,
    password           VARCHAR(250) NOT NULL,
    avatars_url        VARCHAR ARRAY,
    banner_url         VARCHAR,
    bio                VARCHAR,
    is_private         BOOLEAN  NOT NULL DEFAULT FALSE,
    last_seen          TIMESTAMP,
    date_of_birth      DATE NOT NULL,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS roles;
CREATE TABLE public.roles
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

