DROP TABLE IF EXISTS users;
CREATE TABLE public.users
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    first_name         VARCHAR(250) NOT NULL,
    last_name          VARCHAR(250) NOT NULL,
    phone              VARCHAR(250) NOT NULL,
    email              VARCHAR(250) NOT NULL,
    city               VARCHAR(250) NOT NULL,
    password           VARCHAR(250) NOT NULL,
    avatars_url        VARCHAR ARRAY    NOT NULL,
    banner_url         VARCHAR  NOT NULL,
    bio                VARCHAR  NOT NULL,
    is_private         BOOLEAN  NOT NULL DEFAULT FALSE,
    last_seen          TIMESTAMP,
    date_of_birth      TIMESTAMP NOT NULL,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP
);
