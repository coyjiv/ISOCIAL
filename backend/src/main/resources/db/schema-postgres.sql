
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
    bio                TEXT,
    is_private         BOOLEAN NOT NULL DEFAULT FALSE,
    last_seen          TIMESTAMP,
    activity_status    VARCHAR(10) NOT NULL DEFAULT 'OFFLINE',
    gender             VARCHAR(10) NOT NULL,
    date_of_birth      DATE,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE
);

-- Create the roles table
CREATE TABLE public.roles
(
    id      SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name    VARCHAR(50) NOT NULL,
    FOREIGN KEY (user_id) REFERENCES public.users (id)
);

-- Create the chats table
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

-- Create the messages table
CREATE TABLE public.messages
(
    id                 SERIAL PRIMARY KEY,
    chat_id            INT,
    sender_id          INT,
    status             VARCHAR(50) NOT NULL DEFAULT 'SENT',
    text               VARCHAR(1000),
    attachements       TEXT[],
    is_editted         BOOLEAN,
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active          BOOLEAN NOT NULL DEFAULT FALSE,
    FOREIGN KEY (chat_id) REFERENCES public.chats (id),
    FOREIGN KEY (sender_id) REFERENCES public.users (id)
);

-- Create the users_chats table
CREATE TABLE public.users_chats
(
    id      SERIAL PRIMARY KEY,
    user_id INT,
    chat_id INT,
    FOREIGN KEY (user_id) REFERENCES public.users (id),
    FOREIGN KEY (chat_id) REFERENCES public.chats (id)
);

-- Create the friends table
CREATE TABLE public.friends
(
    id           SERIAL PRIMARY KEY,
    requester_id INT,
    addresser_id INT,
    status       VARCHAR(255),
    FOREIGN KEY (requester_id) REFERENCES public.users (id),
    FOREIGN KEY (addresser_id) REFERENCES public.users (id),
    creation_date      TIMESTAMP,
    last_modified_date TIMESTAMP,
    is_active BOOLEAN NOT NULL DEFAULT FALSE
);