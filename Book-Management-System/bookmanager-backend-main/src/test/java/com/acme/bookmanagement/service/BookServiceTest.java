package com.acme.bookmanagement.service;

import com.acme.bookmanagement.model.Author;
import com.acme.bookmanagement.model.Book;
import com.acme.bookmanagement.repository.BookRepository;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;

import java.time.LocalDate;
import java.util.Collections;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertEquals;

class BookServiceTest {
    private final BookRepository bookRepository = Mockito.mock(BookRepository.class);
    private final BookService bookService = new BookService(bookRepository);
    private final Author author = new Author(1L, "author-1", "Author details");
    private final Set<Author> authors = new HashSet<>(Collections.singletonList(author));
    private final Book book = new Book(1L, "title-1", LocalDate.of(2021, 2, 3), "Fiction",
            19.99, "English", "title-1 summary.", 300, authors);

    @Test
    void testFindAll() {
        Mockito.when(bookRepository.findAll()).thenReturn(Collections.singletonList(book));
        assertEquals(1, bookService.findAll().size());
    }

    @Test
    void testFindById() {
        Mockito.when(bookRepository.findById(1L)).thenReturn(Optional.of(book));
        Book book = bookService.findById(1L).orElse(null);
        assertEquals("title-1", book.getTitle());
        assertEquals("Fiction", book.getGenre());
        assertEquals("English", book.getLanguage());
        assertEquals(19.99, book.getPrice());
    }

    @Test
    void testSave() {
        Mockito.when(bookRepository.save(book)).thenReturn(book);
        assertEquals(book, bookService.save(book));
    }

    @Test
    void testDeleteById() {
        bookService.deleteById(1L);
        Mockito.verify(bookRepository).deleteById(1L);
    }
}
