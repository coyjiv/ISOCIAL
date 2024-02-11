INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
    VALUES ('John', 'Doe', 'test@example.com', 'New York', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY['https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/11/11874d973da2bb7fcb6d4f8f0d76c81ae7d91a41_full.jpg',
        'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/00/00ae084f9b4c6ac5c13d5438202b42c79f94a3c1_full.jpg'], 'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmFuZG9tfGVufDB8fDB8fHww',
        'A short bio about John Doe', FALSE, CURRENT_TIMESTAMP,
        '1990-01-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 1);
INSERT INTO public.roles (user_id,name) VALUES ( 1, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
VALUES ('Alice', 'Johnson', 'test2@example.com', 'Los Angeles', '$2a$10$5OPwzIZ2N8CIeWUA2q9t0OzoI1kB7cvf1qDGwyxeiBFEAR3h2Psmu', ARRAY['https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/ee/ee918198b740e546700b7d608472232343366b7c_full.jpg',
        'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/20/206b08bd3b9d5228fb0f54671fdb7dcaab4356ba_full.jpg'], 'https://miro.medium.com/v2/resize:fit:1400/1*TzaiFDmkiEkOxNU7eG43pw.jpeg',
        'Bio for Alice Johnson', FALSE, CURRENT_TIMESTAMP,
        '1985-03-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 1);
INSERT INTO public.roles (user_id,name) VALUES ( 2, 'ROLE_USER' );


INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
VALUES ('Bob', 'Smith', 'bob.smith@example.com', 'Chicago', 'mypassword', ARRAY['https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/dd/ddf4316f4a5795d1847f6acb6e9f05717f71dd13_full.jpg',
        'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/4d/4dc12a7b3cd5ba55d1c4b5650e27ea349b2cab37_full.jpg'], 'https://www.thesaurus.com/e/wp-content/uploads/2022/10/20221011_randomWords_1000x700-790x310.jpg',
        'Bob Smith bio', FALSE, CURRENT_TIMESTAMP,
        '1992-07-08', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 1);
INSERT INTO public.roles (user_id,name) VALUES ( 3, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
VALUES ('Eva', 'Martinez', 'eva.martinez@example.com', 'San Francisco', 'securepass123',
        ARRAY['https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/76/76cd454b3968b180c7c52eccd0041aad2fb92247_full.jpg'], '',
        'Evas bio description', FALSE, CURRENT_TIMESTAMP,
        '1988-12-01', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 1);
INSERT INTO public.roles (user_id,name) VALUES ( 4, 'ROLE_USER' );

INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
VALUES ('Michael', 'Williams', 'michael.williams@example.com', 'Miami', 'password123', ARRAY['https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/31/31094e6bbcc40fc33d200df150f04ccb011499fc_full.jpg',
        'https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/6f/6f60ac4e73a91a72927aae5cc3bbc5e8420dbc1f_full.jpg'], 'https://beebom.com/wp-content/uploads/2023/06/featured-new.jpg',
        'Michaels bio', FALSE, CURRENT_TIMESTAMP,
        '1975-06-25', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 1);
INSERT INTO public.roles (user_id,name) VALUES ( 5, 'ROLE_USER' );


INSERT INTO public.users (first_name, last_name, email, city, password, avatars_url, banner_url, bio,
                          is_private, last_seen, date_of_birth, creation_date, last_modified_date, is_active, activity_status)
VALUES ('Sophia', 'Lee', 'sophia.lee@example.com', 'Seattle', 'strongpassword456', ARRAY['https://static.vecteezy.com/system/resources/previews/019/133/014/original/anime-girl-with-bows-in-her-hair-and-in-a-cardigan-vector.jpg',
        'https://wallpapers.com/images/hd/anime-girl-pictures-bfqehgv2fc86eicd.jpg'], 'https://www.zmo.ai/wp-content/uploads/2023/11/Sea-girl-created-by-ZMO.webp',
        'Sophias bio information', FALSE, CURRENT_TIMESTAMP,
        '1995-09-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, true, 1);
INSERT INTO public.roles (user_id,name) VALUES ( 6, 'ROLE_USER' );
