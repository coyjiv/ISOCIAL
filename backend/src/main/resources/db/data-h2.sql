-- User 1
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('John', 'Doe', 'test@example.com', 'New York', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu',
        ARRAY ['https://sm.ign.com/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.jpg'], 'https://picsum.photos/id/21/1200/350',
        'A short bio about John Doe', 'NOT_SPECIFIED    ', FALSE, CURRENT_TIMESTAMP,
        '1990-01-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');
INSERT INTO public.roles (user_id, name)
VALUES (1, 'ROLE_USER');

-- User 2
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Alice', 'Johnson', 'test2@example.com', 'Los Angeles',
        '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY ['https://i.pravatar.cc/150?img=2'], 'https://picsum.photos/id/22/1200/350',
        'Bio for Alice Johnson', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1985-03-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (2, 'ROLE_USER');

-- User 3
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Bob', 'Smith', 'bob.smith@example.com', 'Chicago', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY ['https://i.pravatar.cc/150?img=3'], 'https://picsum.photos/id/23/1200/350',
        'Bob Smith bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1992-07-08', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (3, 'ROLE_USER');

-- User 4
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Eva', 'Martinez', 'eva.martinez@example.com', 'San Francisco', 'securepass123',
        ARRAY ['https://i.pravatar.cc/150?img=49'], 'https://picsum.photos/id/37/1200/350',
        'Evas bio description', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1988-12-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (4, 'ROLE_USER');

-- User 5
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)

VALUES ('Michael', 'Williams', 'michael.williams@example.com', 'Miami', 'password123', ARRAY ['https://i.pravatar.cc/150?img=14'], 'banner5.jpg',
        'Michaels bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1975-06-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (5, 'ROLE_USER');

-- User 6
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Sophia', 'Lee', 'sophia.lee@example.com', 'Seattle', 'strongpassword456', ARRAY [], 'banner6.jpg',
        'Sophias bio information', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1995-09-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null , null , 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (6, 'ROLE_USER');

-- User 7
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Daniella', 'Brown', 'daniel.brown@example.com', 'Houston', 'password7', ARRAY ['https://i.pravatar.cc/150?img=5'], 'https://picsum.photos/id/28/1200/350',
        'Daniel Brown bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1980-04-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (7, 'ROLE_USER');

-- User 8
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Mia', 'Wilson', 'mia.wilson@example.com', 'Phoenix', 'password8', ARRAY ['https://i.pravatar.cc/150?img=9'], 'https://picsum.photos/id/29/1200/350',
        'Mia Wilson bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1993-11-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (8, 'ROLE_USER');

-- User 9
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Liam', 'Jones', 'liam.jones@example.com', 'New York', 'password9', ARRAY ['https://i.pravatar.cc/150?img=7'], 'https://picsum.photos/id/30/1200/350',
        'Liam Jones bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1982-08-17', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (9, 'ROLE_USER');

-- User 10
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Ava', 'Smith', 'ava.smith@example.com', 'New York', 'password10', ARRAY ['https://i.pravatar.cc/150?img=10'], 'https://picsum.photos/id/31/1200/350',
        'Ava Smith bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1998-05-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (10, 'ROLE_USER');

-- User 11
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Olivia', 'Anderson', 'olivia.anderson@example.com', 'Los Angeles', 'password11', ARRAY ['https://i.pravatar.cc/150?img=16'], 'https://picsum.photos/id/27/1200/350',
        'Olivia Anderson bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1995-09-12', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (11, 'ROLE_USER');

-- User 12
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Emily', 'Brown', 'emily.brown@example.com', 'Philadelphia', 'password12',
        ARRAY ['https://i.pravatar.cc/150?img=19'], 'https://picsum.photos/id/32/1200/350',
        'Emily`s bio information', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1997-11-12', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (12, 'ROLE_USER');

-- User 13
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('William', 'Jones', 'william.jones@example.com', 'Philadelphia', 'password13',
        ARRAY [], 'https://picsum.photos/id/33/1200/350',
        'William`s bio information', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1983-04-18', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (13, 'ROLE_USER');

-- User 14
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Olivia', 'Garcia', 'olivia.garcia@example.com', 'New York', 'password14',
        ARRAY ['https://i.pravatar.cc/150?img=38'], 'https://picsum.photos/id/34/1200/350',
        'Olivia`s bio information', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1990-08-29', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (14, 'ROLE_USER');

-- User 15
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Daniel', 'Rodriguez', 'daniel.rodriguez@example.com', 'Phoenix', 'password15',
        ARRAY ['https://i.pravatar.cc/150?img=12'], 'https://picsum.photos/id/35/1200/350',
        'Daniel`s bio information', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1987-02-03', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (15, 'ROLE_USER');

-- User 16
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Ava', 'Fernandez', 'ava.hernandez@example.com', 'Los Angeles', 'password16',
        ARRAY ['https://i.pravatar.cc/150?img=26'], 'https://picsum.photos/id/36/1200/350',
        'Ava`s bio information', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1993-06-14', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (16, 'ROLE_USER');

-- User 17
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Matthew', 'Lopez', 'matthew.lopez@example.com', 'San Diego', 'password17',
        ARRAY ['https://i.pravatar.cc/150?img=59'], 'https://picsum.photos/id/37/1200/350',
        'Matthew`s bio information', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1982-09-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (17, 'ROLE_USER');

-- User 18
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Mia', 'Martinez', 'mia.martinez@example.com', 'New York', 'password18',
        ARRAY ['https://i.pravatar.cc/150?img=30'], 'https://picsum.photos/id/38/1200/350',
        'Mia`s bio information', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1996-12-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (18, 'ROLE_USER');

-- User 19
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('James', 'Gonzalez', 'james.gonzalez@example.com', 'New York', 'password19',
        ARRAY ['https://i.pravatar.cc/150?img=60'], 'https://picsum.photos/id/39/1200/350',
        'James`s bio information', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1984-07-17', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (19, 'ROLE_USER');

-- User 20
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Alexander', 'Johnson', 'alexander.johnson@example.com', 'Houston', 'password20', ARRAY [], 'https://picsum.photos/id/27/1200/350',
        'Alexander Johnson bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1987-04-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name)
VALUES (20, 'ROLE_USER');

-- User 21
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Alex', 'Miller', 'alex.miller@example.com', 'Los Angeles', 'password21', ARRAY ['https://i.pravatar.cc/150?img=4'], 'https://picsum.photos/id/27/1200/350',
        'Alex Millers bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1983-04-18', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (21, 'ROLE_USER');

-- User 22
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Chris', 'Wilson', 'chris.wilson@example.com', 'Dallas', 'password22', ARRAY ['https://i.pravatar.cc/150?img=61'], 'https://picsum.photos/id/28/1200/350',
        'Chris Wilsons bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1991-11-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (22, 'ROLE_USER');

-- User 23
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Emma', 'Clark', 'emma.clark@example.com', 'New York', 'password23', ARRAY ['https://i.pravatar.cc/150?img=43'], 'https://picsum.photos/id/29/1200/350',
        'Emma Clarks bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1987-08-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (23, 'ROLE_USER');

-- User 24
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('David', 'Turner', 'david.turner@example.com', 'Phoenix', 'password24', ARRAY ['https://i.pravatar.cc/150?img=7'], 'https://picsum.photos/id/30/1200/350',
        'David Turners bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1993-02-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (24, 'ROLE_USER');

-- User 25
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Olivia', 'Brown', 'olivia.brown@example.com', 'Dallas', 'password25', ARRAY ['https://i.pravatar.cc/150?img=5'], 'https://picsum.photos/id/28/1200/350',
        'Olivia Browns bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1998-12-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (25, 'ROLE_USER');

-- User 26
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Daniel', 'Clark', 'daniel.clark@example.com', 'Denver', 'password26', ARRAY ['https://i.pravatar.cc/150?img=6'], 'https://picsum.photos/id/29/1200/350',
        'Daniel Clarks bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1982-08-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (26, 'ROLE_USER');

-- User 27
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Emma', 'Ward', 'emma.ward@example.com', 'Phoenix', 'password27', ARRAY ['https://i.pravatar.cc/150?img=48'], 'https://picsum.photos/id/30/1200/350',
        'Emma Wards bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1993-02-14', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (27, 'ROLE_USER');

-- User 28
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Olivia', 'Bowie', 'olivia.bowie@example.com', 'New York', 'password28', ARRAY ['https://i.pravatar.cc/150?img=23'], 'https://picsum.photos/id/28/1200/350',
        'Olivia Bowies bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1991-12-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (28, 'ROLE_USER');

-- User 29
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Daniel', 'Garcia', 'daniel.garcia@example.com', 'New York', 'password29', ARRAY ['https://i.pravatar.cc/150?img=13'], 'https://picsum.photos/id/29/1200/350',
        'Daniel Garcias bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1987-08-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (29, 'ROLE_USER');

-- User 30
INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active,
                          is_premium, premium_nickname, premium_emoji, activity_status)
VALUES ('Emily', 'Taylor', 'emily.taylor@example.com', 'Phoenix', 'password30', ARRAY ['https://i.pravatar.cc/150?img=40'], 'https://picsum.photos/id/30/1200/350',
        'Emily Taylors bio', 'FEMALE', FALSE, CURRENT_TIMESTAMP,
        '1993-03-12', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false, null, null, 'OFFLINE');

INSERT INTO public.roles (user_id, name) 
VALUES (30, 'ROLE_USER');

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


-- INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
-- VALUES (1, 1, '11111111', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false);
--
-- INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
-- VALUES (2, 2, '2222222222', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, false);
--
-- INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
-- VALUES (3, 3, '3333333333', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false);
--
-- INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
-- VALUES (4, 4, '44444444', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, false, false);
--
-- INSERT INTO public.comments (commenter_id, post_id, text, creation_date, last_modified_date, is_active, is_edited)
-- VALUES (5, 5, '55555555', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, false);
--
-- -- Assuming PostgreSQL syntax, the corrected INSERT statement for posts with empty arrays
-- INSERT INTO public.posts (text_content, attachments, is_edited, user_id, creation_date, last_modified_date, is_active)
-- VALUES ('This is a post by user 1 with no attachments.', ARRAY [], FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE),
--        ('Another post by user 1, still no attachments here.', ARRAY [], FALSE, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
--
-- -- Posts for user_id 1 with image srcs in attachments
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
--
INSERT INTO public.likes (user_id, entity_id, entity_type, creation_date, last_modified_date)
VALUES (1, 1, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 1, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (1, 2, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (3, 1, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
       (2, 3, 'POST', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (4, 1, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (11, 1, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (12, 1, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (13, 1, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (14, 1, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);

INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (3, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (6, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (15, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (16, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (17, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (18, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (19, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (20, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (24, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (25, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (27, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (29, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (30, 1, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);

-- friends of Alice Johnson
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (11, 2, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (12, 2, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (13, 2, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (14, 2, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);

INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (16, 2, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (17, 2, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (18, 2, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (19, 2, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);

INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (1, 5, 'REQUEST_SENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);

-- friends of Emily Brown
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (7, 12, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (9, 12, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
INSERT INTO public.friends (requester_id, addresser_id, status, creation_date, last_modified_date, is_active)
VALUES (15, 12, 'FRIEND', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, TRUE);
