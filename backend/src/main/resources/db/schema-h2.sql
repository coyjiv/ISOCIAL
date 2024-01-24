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

DROP TABLE IF EXISTS roles;
CREATE TABLE public.roles
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS chats;
CREATE TABLE public.chats
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS messages;
CREATE TABLE public.messages
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    chat_id            INT,
    sender_id          INT,
    status             VARCHAR(50) NOT NULL DEFAULT 'SENT',
    text               VARCHAR(1000),
    attachements       VARCHAR ARRAY,
    is_editted         BOOLEAN,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (chat_id) REFERENCES chats(id),
    FOREIGN KEY (sender_id) REFERENCES users(id)
);

DROP TABLE IF EXISTS users_chats;
CREATE TABLE public.users_chats
(
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    chat_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (chat_id) REFERENCES chats(id)
);