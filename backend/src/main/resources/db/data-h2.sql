INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
    VALUES ('John', 'Doe', 'test@example.com', 'New York', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY['avatar1.jpg',
        'avatar2.jpg'], 'banner.jpg',
        'A short bio about John Doe', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1990-01-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null , null , 'OFFLINE');
INSERT INTO public.roles (user_id,name) VALUES ( 1, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Alice', 'Johnson', 'test1@example.com', 'Los Angeles', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY['avatar3.jpg',
        'avatar4.jpg'], 'banner2.jpg',
        'Bio for Alice Johnson', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1985-03-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null , null , 'OFFLINE');

INSERT INTO public.roles (user_id,name) VALUES ( 2, 'ROLE_USER' );


INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Bob', 'Smith', 'bob.smith@example.com', 'Chicago', 'mypassword', ARRAY['avatar5.jpg',
        'avatar6.jpg'], 'banner3.jpg',
        'Bob Smith bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1992-07-08', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null , null , 'OFFLINE');

INSERT INTO public.roles (user_id,name) VALUES ( 3, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Eva', 'Martinez', 'eva.martinez@example.com', 'San Francisco', 'securepass123',
        ARRAY['avatar7.jpg', 'avatar8.jpg'], 'banner4.jpg',
        'Evas bio description', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1988-12-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null , null , 'OFFLINE');

INSERT INTO public.roles (user_id,name) VALUES ( 4, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Michael', 'Williams', 'michael.williams@example.com', 'Miami', 'password123', ARRAY['avatar9.jpg',
        'avatar10.jpg'], 'banner5.jpg',
        'Michaels bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1975-06-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null , null , 'OFFLINE');

INSERT INTO public.roles (user_id,name) VALUES ( 5, 'ROLE_USER' );


INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Sophia', 'Lee', 'sophia.lee@example.com', 'Seattle', 'strongpassword456', ARRAY['avatar11.jpg',
        'avatar12.jpg'], 'banner6.jpg',
        'Sophias bio information', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1995-09-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null , null , 'OFFLINE');
INSERT INTO public.roles (user_id,name) VALUES ( 6, 'ROLE_USER' );

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active)
VALUES (1, 1, '11111111', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true);

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active)
VALUES (2, 2, '2222222222', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active)
VALUES (3, 3, '3333333333', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true);

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active)
VALUES (4, 4, '44444444', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false);

INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active)
VALUES (5, 5, '55555555', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true);


