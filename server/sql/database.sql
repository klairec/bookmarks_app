CREATE DATABASE bookmarks_db;

CREATE TYPE bookmark_type AS ENUM ('vimeo', 'flickr');

CREATE TABLE bookmark(
    bookmark_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT UNIQUE NOT NULL,
    type bookmark_type NOT NULL,
    author_name TEXT,
    creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    width SMALLINT,
    height SMALLINT,
    duration INT,
    keywords text []
);

INSERT INTO bookmark (title, url, type, author_name, width, height) 
    VALUES  ('Landscape', 'https://vimeo.com/238573128', 'vimeo','Antonios Charalambous', 640, 338),
            ('Bee', 'https://www.flickr.com/photos/bees/2362225867/', 'flickr', 'Cal Henderson', null, null),
            ('Nature', 'https://vimeo.com/59474226', 'vimeo', 'KIKURU', 480, 270),
            ('Nature 2', 'https://vimeo.com/10450125', 'vimeo', 'Michael Williams', 480, 270),
            ('Nature 3', 'https://vimeo.com/284834103', 'vimeo', 'Federico Cantini', 640, 360),
            ('Nature 4','https://vimeo.com/88240846','vimeo','REDHOOD', 480, 270),
            ('Cat', 'https://www.flickr.com/photos/bnesic/50577483592','flickr','Bosko Nesic', null, null);