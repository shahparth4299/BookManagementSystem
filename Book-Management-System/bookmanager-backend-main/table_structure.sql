CREATE TABLE Author (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255),
    details TEXT
);

CREATE TABLE Book (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    published_date DATE,
    genre VARCHAR(100),
    price DECIMAL(10, 2),
    language VARCHAR(100),
    summary TEXT,
    total_pages INT
);

CREATE TABLE Book_Author (
    book_id INT,
    author_id INT,
    PRIMARY KEY (book_id, author_id),
    FOREIGN KEY (book_id) REFERENCES Book(id),
    FOREIGN KEY (author_id) REFERENCES Author(id)
);

