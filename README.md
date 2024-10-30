Book Management System

System Structure: The system contains two table Book and Author. There is a many to many relationship between Book and Author. 
Run following queries to create tables in database
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

Features
1. Navigation Drawer with two options (Books, Authors)
   From Author page users can see all the available authors, insert new author, delete an existing author.
   ![Author_insert_delete_display](https://github.com/user-attachments/assets/ea265400-c273-4aad-b190-861780d1e1ee)

2. View all the available books with Authors
   ![image](https://github.com/user-attachments/assets/3c7540eb-028f-4244-9050-d3b5f72d7960)

3. Insert new book to database (While inserting users can see all the available authors and users can also add new author to database)
   ![Insert_Book](https://github.com/user-attachments/assets/d54e0211-c342-4a71-b637-a8d94839acac)

4. Filter options
   Filter by language, Genre, Author Name and Year After (Filter all the books published after selected year)
   ![image](https://github.com/user-attachments/assets/74785c2a-e308-49f1-8b7f-69237d096391)

   

   
