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
    is_private         BOOLEAN      NOT NULL DEFAULT FALSE,
    last_seen          TIMESTAMP,
    activity_status    INT  NOT NULL DEFAULT 1,
    date_of_birth      DATE,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN      NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS posts;
CREATE TABLE public.posts
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    text_content       VARCHAR(1000),
    attachments        VARCHAR ARRAY,
    is_edited          BOOLEAN NOT NULL DEFAULT FALSE,
    original_post_id   INT,
    user_id            INT REFERENCES users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active BOOLEAN  NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS roles;
CREATE TABLE public.roles
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT         NOT NULL,
    name    VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users (id)
);

DROP TABLE IF EXISTS chats;
CREATE TABLE public.chats
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    last_message       VARCHAR(1000),
    last_message_by    INT,
    last_message_date  TIMESTAMP,
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
    is_active          BOOLEAN     NOT NULL DEFAULT FALSE,
    FOREIGN KEY (chat_id) REFERENCES chats (id),
    FOREIGN KEY (sender_id) REFERENCES users (id)
);

DROP TABLE IF EXISTS users_chats;
CREATE TABLE public.users_chats
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    chat_id INT,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (chat_id) REFERENCES chats (id)
);


DROP TABLE IF EXISTS subscriptions;
CREATE TABLE public.subscriptions
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    user_id            INT,
    subscriber_id          INT,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS favorites;
CREATE TABLE public.favorites
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    selected_post_id   INT,
    user_selector_id   INT REFERENCES users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active BOOLEAN  NOT NULL DEFAULT FALSE
);