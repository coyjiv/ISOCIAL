INSERT INTO public.users (first_name,last_name,phone,email,city,password,avatars_url,banner_url,bio,
                          is_private,last_seen,date_of_birth,creation_date,last_modified_date)
VALUES ('John','Doe','555-1234','john.doe@example.com','New York','securepassword',ARRAY['avatar1.jpg', 'avatar2.jpg'],'banner.jpg',
        'A short bio about John Doe', FALSE,CURRENT_TIMESTAMP,
        '1990-01-15',CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
INSERT INTO public.users (first_name, last_name, phone, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date)
VALUES ('Alice', 'Johnson', '555-5678', 'alice.johnson@example.com', 'Los Angeles', 'strongpass', ARRAY['avatar3.jpg', 'avatar4.jpg'], 'banner2.jpg',
        'Bio for Alice Johnson', FALSE, CURRENT_TIMESTAMP,
        '1985-03-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO public.users (first_name, last_name, phone, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date)
VALUES ('Bob', 'Smith', '555-8765', 'bob.smith@example.com', 'Chicago', 'mypassword', ARRAY['avatar5.jpg', 'avatar6.jpg'], 'banner3.jpg',
        'Bob Smith bio', FALSE, CURRENT_TIMESTAMP,
        '1992-07-08', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.users (first_name, last_name, phone, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date)
VALUES ('Eva', 'Martinez', '555-4321', 'eva.martinez@example.com', 'San Francisco', 'securepass123', ARRAY['avatar7.jpg', 'avatar8.jpg'], 'banner4.jpg',
        'Evas bio description', FALSE, CURRENT_TIMESTAMP,
        '1988-12-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO public.users (first_name, last_name, phone, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date)
VALUES ('Michael', 'Williams', '555-9876', 'michael.williams@example.com', 'Miami', 'password123', ARRAY['avatar9.jpg', 'avatar10.jpg'], 'banner5.jpg',
        'Michaels bio', FALSE, CURRENT_TIMESTAMP,
        '1975-06-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);


INSERT INTO public.users (first_name, last_name, phone, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date)
VALUES ('Sophia', 'Lee', '555-1111', 'sophia.lee@example.com', 'Seattle', 'strongpassword456', ARRAY['avatar11.jpg', 'avatar12.jpg'], 'banner6.jpg',
        'Sophias bio information', FALSE, CURRENT_TIMESTAMP,
        '1995-09-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);