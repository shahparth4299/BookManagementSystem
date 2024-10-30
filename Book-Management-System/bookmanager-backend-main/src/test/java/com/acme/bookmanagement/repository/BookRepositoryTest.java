package com.acme.bookmanagement.repository;

import com.acme.bookmanagement.model.Author;
import com.acme.bookmanagement.model.Book;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest(properties = {
        "spring.datasource.url=jdbc:h2:mem:testdb",
        "spring.jpa.hibernate.ddl-auto=create-drop"
})
public class BookRepositoryTest {

    @Autowired
    private BookRepository repo;
    @Autowired
    private AuthorRepository authorRepository;

    private Book book;
    private Author author;

    @BeforeEach
    public void setUp() {
        author = new Author(11L, "author-1", "author-1 details");
        author = authorRepository.save(author);
        Set<Author> authors = new HashSet<>();
        authors.add(author);

        book = new Book(11L, "title-1", LocalDate.of(2021, 2, 3), "Fiction",
                19.99, "English", "title-1 summary", 300, authors);
        book = repo.save(book);
    }

    @AfterEach
    public void tearDown() {
        repo.delete(book);
    }

    @Test
    void testSavedBookCanBeFoundById() {
        Book savedBook = repo.findById(book.getId()).orElse(null);

        assertNotNull(savedBook);
        assertEquals(1, savedBook.getAuthors().size());
        assertEquals("author-1", savedBook.getAuthors().iterator().next().getName());
        assertEquals("title-1", savedBook.getTitle());
        assertEquals("Fiction", savedBook.getGenre());
        assertEquals(19.99, savedBook.getPrice());
        assertEquals(300, savedBook.getTotalPages());
    }

    @Test
    void testUpdatedBookCanBeFoundByIdWithUpdatedData() {
        book.setTitle("title-one");
        repo.save(book);

        Book updatedBook = repo.findById(book.getId()).orElse(null);

        assertNotNull(updatedBook);
        assertEquals("title-one", updatedBook.getTitle());
    }

}
