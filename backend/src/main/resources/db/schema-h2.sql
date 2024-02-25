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
    activity_status    VARCHAR(10)  NOT NULL DEFAULT 'OFFLINE',
    gender             VARCHAR(20) NOT NULL,
    date_of_birth      DATE,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_premium         BOOLEAN      NOT NULL DEFAULT FALSE,
    premium_nickname   VARCHAR(250),
    premium_emoji      VARCHAR(250),
    is_active          BOOLEAN      NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS roles;
CREATE TABLE public.roles
(
    id      INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT         NOT NULL,
    name    VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.users (id)
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
    attachments       VARCHAR ARRAY,
    is_edited          BOOLEAN,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN     NOT NULL DEFAULT FALSE,
    FOREIGN KEY (chat_id) REFERENCES public.chats (id),
    FOREIGN KEY (sender_id) REFERENCES public.users (id)
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
DROP TABLE IF EXISTS friends;
CREATE TABLE friends
(
    id           INT AUTO_INCREMENT PRIMARY KEY,
    requester_id INT,
    addresser_id INT,
    status       VARCHAR(255),
    FOREIGN KEY (requester_id) REFERENCES public.users (id),
    FOREIGN KEY (addresser_id) REFERENCES public.users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS subscriptions;
CREATE TABLE public.subscriptions
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    user_id            INT,
    subscriber_id          INT,
    is_subscribed          BOOLEAN     NOT NULL DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (subscriber_id) REFERENCES users (id)
);

DROP TABLE IF EXISTS comments;
CREATE TABLE public.comments
(
    id                 INT AUTO_INCREMENT PRIMARY KEY,
    commenter_id       INT NOT NULL,
    post_id            INT NOT NULL ,
    text               VARCHAR(1000),
    requester_id INT,
    addresser_id INT,
    status       VARCHAR(255),
    FOREIGN KEY (requester_id) REFERENCES public.users (id),
    FOREIGN KEY (addresser_id) REFERENCES public.users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
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