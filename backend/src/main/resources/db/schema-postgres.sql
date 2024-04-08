DROP TABLE IF EXISTS public.users CASCADE;
CREATE TABLE public.users
(
    id                 SERIAL PRIMARY KEY,
    first_name         VARCHAR(250) NOT NULL,
    last_name          VARCHAR(250),
    email              VARCHAR(250) NOT NULL,
    city               VARCHAR(250),
    password           VARCHAR(250),
    avatars_url        TEXT[],
    banner_url         VARCHAR,
    bio                VARCHAR,
    birth_place        VARCHAR,
    study_place        VARCHAR,
    is_private         BOOLEAN      NOT NULL DEFAULT FALSE,
    last_seen          TIMESTAMP,
    activity_status    VARCHAR(10)  NOT NULL DEFAULT 'OFFLINE',
    gender             VARCHAR(20)  NOT NULL,
    date_of_birth      DATE,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_premium         BOOLEAN      NOT NULL DEFAULT FALSE,
    premium_nickname   VARCHAR(250),
    premium_emoji      VARCHAR(250),
    is_active          BOOLEAN      NOT NULL DEFAULT FALSE
);


DROP TABLE IF EXISTS public.roles CASCADE;
CREATE TABLE public.roles
(
    id      SERIAL PRIMARY KEY,
    user_id INT         NOT NULL,
    name    VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.users (id)
);

DROP TABLE IF EXISTS public.chats CASCADE;
CREATE TABLE public.chats
(
    id                 SERIAL PRIMARY KEY,
    last_message       VARCHAR(1000),
    last_message_by    INT,
    last_message_date  TIMESTAMP,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS public.messages CASCADE;
CREATE TABLE public.messages
(
    id                 SERIAL PRIMARY KEY,
    chat_id            INT,
    sender_id          INT,
    status             VARCHAR(50) NOT NULL DEFAULT 'SENT',
    text               VARCHAR(1000),
    attachments        TEXT[],
    is_edited          BOOLEAN,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN     NOT NULL DEFAULT FALSE,
    FOREIGN KEY (chat_id) REFERENCES public.chats (id),
    FOREIGN KEY (sender_id) REFERENCES public.users (id)
);

DROP TABLE IF EXISTS public.users_chats CASCADE;
CREATE TABLE public.users_chats
(
    id      SERIAL PRIMARY KEY,
    user_id INT,
    chat_id INT,
    FOREIGN KEY (user_id) REFERENCES public.users (id),
    FOREIGN KEY (chat_id) REFERENCES public.chats (id)
);

DROP TABLE IF EXISTS public.friends CASCADE;
CREATE TABLE public.friends
(
    id                 SERIAL PRIMARY KEY,
    requester_id       INT,
    addresser_id       INT,
    status             VARCHAR(255),
    FOREIGN KEY (requester_id) REFERENCES public.users (id),
    FOREIGN KEY (addresser_id) REFERENCES public.users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS public.subscriptions CASCADE;
CREATE TABLE public.subscriptions
(
    id                 SERIAL PRIMARY KEY,
    user_id            INT,
    subscriber_id      INT,
    FOREIGN KEY (user_id) REFERENCES public.users (id),
    FOREIGN KEY (subscriber_id) REFERENCES public.users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS public.comments CASCADE;
CREATE TABLE public.comments
(
    id                 SERIAL PRIMARY KEY,
    commenter_id       INT     NOT NULL,
    post_id            INT     NOT NULL,
    text               VARCHAR(1000),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE,
    is_edited          BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS public.posts CASCADE;
CREATE TABLE public.posts
(
    id                 SERIAL PRIMARY KEY,
    text_content       VARCHAR(1000),
    attachments        TEXT[],
    is_edited          BOOLEAN NOT NULL DEFAULT FALSE,
    original_post_id   INT,
    user_id            INT,
    FOREIGN KEY (user_id) REFERENCES public.users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS public.favorites CASCADE;
CREATE TABLE public.favorites
(
    id                 SERIAL PRIMARY KEY,
    selected_post_id   INT,
    user_selector_id   INT,
    FOREIGN KEY (user_selector_id) REFERENCES public.users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);


DROP TABLE IF EXISTS public.subscribers CASCADE;
CREATE TABLE public.subscribers
(
    id                 SERIAL PRIMARY KEY,
    user_id            INT,
    subscriber_id      INT,
    FOREIGN KEY (user_id) REFERENCES public.users (id),
    FOREIGN KEY (subscriber_id) REFERENCES public.users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS public.likes CASCADE;
CREATE TABLE likes
(
    id                 BIGSERIAL PRIMARY KEY,
    user_id            BIGINT                                                     NOT NULL,
    entity_id          BIGINT                                                     NOT NULL,
    entity_type        TEXT CHECK (entity_type IN ('POST', 'COMMENT', 'MESSAGE')) NOT NULL,
    creation_date      TIMESTAMP                                                           DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP                                                           DEFAULT CURRENT_TIMESTAMP,
    is_active          BOOLEAN                                                    NOT NULL DEFAULT TRUE
);

DROP TABLE IF EXISTS notifications;
CREATE TABLE notifications
(
    id                 BIGSERIAL PRIMARY KEY,
    receiver_id        BIGINT       NOT NULL,
    sender_id          BIGINT       NOT NULL,
    entity_id          BIGINT       NOT NULL,
    event_type         VARCHAR(100) NOT NULL,
    sender_avatar      VARCHAR(250) NOT NULL,
    sender_name        VARCHAR(250) NOT NULL,
    creation_date      TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active          BOOLEAN      NOT NULL DEFAULT TRUE
);

DROP TABLE IF EXISTS post_seen;
CREATE TABLE post_seen
(
    id                 BIGSERIAL PRIMARY KEY,
    user_id            BIGINT    NOT NULL,
    post_id            BIGINT    NOT NULL,
    creation_date      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    last_modified_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    is_active          BOOLEAN   NOT NULL DEFAULT TRUE
);

CREATE TABLE user_preferences
(
    id                      BIGSERIAL PRIMARY KEY,
    user_id                 BIGINT UNIQUE NOT NULL,
    friends_list_visibility VARCHAR(255)  NOT NULL DEFAULT 'ALL',
    age_visibility          VARCHAR(255)  NOT NULL DEFAULT 'ALL',
    posts_visibility        VARCHAR(255)  NOT NULL DEFAULT 'ALL',
    receive_notifications   BOOLEAN       NOT NULL DEFAULT TRUE,
    creation_date           TIMESTAMP     NOT NULL,
    last_modified_date      TIMESTAMP     NOT NULL,
    is_active               BOOLEAN       NOT NULL DEFAULT TRUE,
    FOREIGN KEY (user_id) REFERENCES users (id)
);
