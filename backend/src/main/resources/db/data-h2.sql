INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('John', 'Doe', 'test@example.com', 'New York', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu',
        ARRAY [], 'banner.jpg',
        'A short bio about John Doe', 'NOT_SPECIFIED    ', FALSE, CURRENT_TIMESTAMP,
        '1990-01-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');
INSERT INTO public.roles (user_id, name)
VALUES (1, 'ROLE_USER');

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Alice', 'Johnson', 'test2@example.com', 'Los Angeles',
        '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY ['avatar3.jpg',
            'avatar4.jpg'], 'banner2.jpg',
        'Bio for Alice Johnson', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1985-03-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (2, 'ROLE_USER');


INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Bob', 'Smith', 'bob.smith@example.com', 'Chicago', 'mypassword', ARRAY ['avatar5.jpg',
    'avatar6.jpg'], 'banner3.jpg',
        'Bob Smith bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1992-07-08', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (3, 'ROLE_USER');

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Eva', 'Martinez', 'eva.martinez@example.com', 'San Francisco', 'securepass123',
        ARRAY ['avatar7.jpg', 'avatar8.jpg'], 'banner4.jpg',
        'Evas bio description', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1988-12-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (4, 'ROLE_USER');

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Michael', 'Williams', 'michael.williams@example.com', 'Miami', 'password123', ARRAY ['avatar9.jpg',
    'avatar10.jpg'], 'banner5.jpg',
        'Michaels bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1975-06-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (5, 'ROLE_USER');


INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Sophia', 'Lee', 'sophia.lee@example.com', 'Seattle', 'strongpassword456', ARRAY ['avatar11.jpg',
    'avatar12.jpg'], 'banner6.jpg',
        'Sophias bio information', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1995-09-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');
INSERT INTO public.roles (user_id, name)
VALUES (6, 'ROLE_USER');

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
VALUES (1, 1, '11111111', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false);

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
VALUES (2, 2, '2222222222', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, false);

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
VALUES (3, 3, '3333333333', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false);

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
VALUES (4, 4, '44444444', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, false);

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
VALUES (5, 5, '55555555', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false);

-- Assuming PostgreSQL syntax, the corrected INSERT statement for posts with empty arrays
INSERT INTO public.posts (text_content, attachments, is_edited, user_id, creation_date, last_modified_date, is_active)
VALUES ('This is a post by user 1 with no attachments.', ARRAY [], FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE),
       ('Another post by user 1, still no attachments here.', ARRAY [], FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);

-- Posts for user_id 1 with image srcs in attachments
INSERT INTO public.posts (text_content, attachments, is_edited, user_id, creation_date, last_modified_date, is_active)
VALUES ('This is a post by user 1 with an image.',
        ARRAY ['https://images.unsplash.com/photo-1696176559416-ef8d7115e3ba?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, TRUE),
       ('User 1 post with multiple images.',
        ARRAY ['https://images.unsplash.com/photo-1708200216325-845664d87f9a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1708506825624-9f30964bb5cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        TRUE);


INSERT INTO public.posts (text_content, attachments, is_edited, user_id, creation_date, last_modified_date, is_active)
VALUES ('This is a post by user 1 with an image.',
        ARRAY ['https://images.unsplash.com/photo-1696176559416-ef8d7115e3ba?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, TRUE),
       ('User 1 post with multiple images.',
        ARRAY ['https://images.unsplash.com/photo-1708200216325-845664d87f9a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1708506825624-9f30964bb5cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        TRUE);

INSERT INTO public.posts (text_content, attachments, is_edited, user_id, creation_date, last_modified_date, is_active)
VALUES ('Post by user 2, no attachments here.', ARRAY [], FALSE, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE),
       ('Another content piece by user 2, without attachments.', ARRAY [], FALSE, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);

INSERT INTO public.posts (text_content, attachments, is_edited, user_id, creation_date, last_modified_date, is_active)
VALUES ('User 2 sharing a post with an image.',
        ARRAY ['https://images.unsplash.com/photo-1708367237850-3473e63f8d42?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 2, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, TRUE),
       ('A post by user 2 with several images.',
        ARRAY ['https://images.unsplash.com/photo-1498751041763-40284fe1eb66?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', 'https://images.unsplash.com/photo-1682687220305-ce8a9ab237b1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 2, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        TRUE);

INSERT INTO public.posts (text_content, attachments, is_edited, user_id, creation_date, last_modified_date, is_active)
VALUES ('This is a post by user 1 with an image.',
        ARRAY ['https://images.unsplash.com/photo-1696176559416-ef8d7115e3ba?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, TRUE),
       ('User 1 post with multiple images.',
        ARRAY ['https://images.unsplash.com/photo-1708200216325-845664d87f9a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1708506825624-9f30964bb5cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        TRUE);

INSERT INTO public.posts (text_content, attachments, is_edited, user_id, creation_date, last_modified_date, is_active)
VALUES ('This is a post by user 1 with an image.',
        ARRAY ['https://images.unsplash.com/photo-1696176559416-ef8d7115e3ba?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 1, CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP, TRUE),
       ('User 1 post with multiple images.',
        ARRAY ['https://images.unsplash.com/photo-1708200216325-845664d87f9a?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            'https://images.unsplash.com/photo-1708506825624-9f30964bb5cb?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'],
        FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP,
        TRUE);

INSERT INTO public.likes (user_id, entity_id, entity_type, creation_date, last_modified_date)
VALUES (1, 1, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 1, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 2, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (3, 1, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 3, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

