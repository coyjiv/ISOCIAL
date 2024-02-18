INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
    VALUES ('John', 'Doe', 'test@example.com', 'New York', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY[], 'banner.jpg',
        'A short bio about John Doe', 'NOT_SPECIFIED    ', FALSE, CURRENT_TIMESTAMP,
        '1990-01-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 'OFFLINE');
INSERT INTO public.roles (user_id,name) VALUES ( 1, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)

VALUES ('Alice', 'Johnson', 'test2@example.com', 'Los Angeles', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY['avatar3.jpg',
        'avatar4.jpg'], 'banner2.jpg',
        'Bio for Alice Johnson', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1985-03-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 'OFFLINE');

INSERT INTO public.roles (user_id,name) VALUES ( 2, 'ROLE_USER' );


INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)

VALUES ('Bob', 'Smith', 'bob.smith@example.com', 'Chicago', 'mypassword', ARRAY['avatar5.jpg',
        'avatar6.jpg'], 'banner3.jpg',
        'Bob Smith bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1992-07-08', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 'OFFLINE');

INSERT INTO public.roles (user_id,name) VALUES ( 3, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
VALUES ('Eva', 'Martinez', 'eva.martinez@example.com', 'San Francisco', 'securepass123',
        ARRAY['avatar7.jpg', 'avatar8.jpg'], 'banner4.jpg',
        'Evas bio description', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1988-12-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 'OFFLINE');

INSERT INTO public.roles (user_id,name) VALUES ( 4, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)

VALUES ('Michael', 'Williams', 'michael.williams@example.com', 'Miami', 'password123', ARRAY['avatar9.jpg',
        'avatar10.jpg'], 'banner5.jpg',
        'Michaels bio', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1975-06-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 'OFFLINE');

INSERT INTO public.roles (user_id,name) VALUES ( 5, 'ROLE_USER' );


INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio, gender,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
VALUES ('Sophia', 'Lee', 'sophia.lee@example.com', 'Seattle', 'strongpassword456', ARRAY['avatar11.jpg',
        'avatar12.jpg'], 'banner6.jpg',
        'Sophias bio information', 'MALE', FALSE, CURRENT_TIMESTAMP,
        '1995-09-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 'OFFLINE');
INSERT INTO public.roles (user_id,name) VALUES ( 6, 'ROLE_USER' );
