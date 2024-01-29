DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS friends;
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
    is_private         BOOLEAN      NOT NULL DEFAULT FALSE,
    last_seen          TIMESTAMP,
    date_of_birth      TIMESTAMP    NOT NULL,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN      NOT NULL DEFAULT FALSE
);
CREATE TABLE friends
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT,
    addresser_id INT,
    status       VARCHAR(255),
    FOREIGN KEY (requester_id) REFERENCES public.users (id),
    FOREIGN KEY (addresser_id) REFERENCES public.users (id)
);
