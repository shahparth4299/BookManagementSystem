package com.acme.bookmanagement.controller;

import com.acme.bookmanagement.model.Author;
import com.acme.bookmanagement.model.Book;
import com.acme.bookmanagement.service.AuthorService;
import com.acme.bookmanagement.service.BookService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.GraphQlTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;
import java.util.*;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@GraphQlTest(BookController.class)
public class BookControllerTest {

    @Autowired
    private GraphQlTester graphQlTester;

    @MockBean
    private BookService bookService;

    @MockBean
    private AuthorService authorService;

    private final Map<Long, Book> books = Map.of(
            1L, new Book(1L,
                    "title-1",
                    LocalDate.of(2021, 2, 3),
                    "Fiction",
                    19.99,
                    "English",
                    "title-1 summary",
                    300,
                    Set.of(new Author(1L, "author-1", "author-1 details"))
            ),
            2L, new Book(2L,
                    "title-2",
                    LocalDate.of(2021, 2, 3),
                    "Adventure",
                    29.99,
                    "English",
                    "title-2 summary",
                    450,
                    Set.of(new Author(2L, "author-2", "author-2 details"))
            )
    );

    @Test
    void shouldGetBookById() {

        when(this.bookService.findById(1L))
                .thenReturn(Optional.ofNullable(books.get(1L)));

        this.graphQlTester
                .documentName("findBookById")
                .variable("id", 1L)
                .execute()
                .path("findBookById")
                .matchesJson("""
                    {
                        "id": 1,
                        "title": "title-1",
                        "publishedDate": "2021-02-03",
                        "genre": "Fiction",
                        "price": 19.99,
                        "language": "English",
                        "summary": "title-1 summary",
                        "totalPages": 300,
                        "authors": [
                            {
                                "id": 1,
                                "name": "author-1",
                                "details": "author-1 details"
                            }
                        ]
                    }
                """);
    }

    @Test
    void shouldGetAllBooks() {
        when(this.bookService.findAll())
                .thenReturn(new ArrayList<>(books.values()));

        this.graphQlTester
                .documentName("findAllBooks")
                .execute()
                .path("findAllBooks")
                .matchesJson("""
                    [
                        {
                            "id": 1,
                            "title": "title-1",
                            "publishedDate": "2021-02-03",
                            "genre": "Fiction",
                            "price": 19.99,
                            "language": "English",
                            "summary": "title-1 summary",
                            "totalPages": 300,
                            "authors": [
                                {
                                    "id": 1,
                                    "name": "author-1",
                                    "details": "author-1 details"
                                }
                            ]
                        },
                        {
                            "id": 2,
                            "title": "title-2",
                            "publishedDate": "2021-02-03",
                            "genre": "Adventure",
                            "price": 29.99,
                            "language": "English",
                            "summary": "title-2 summary",
                            "totalPages": 450,
                            "authors": [
                                {
                                    "id": 2,
                                    "name": "author-2",
                                    "details": "author-2 details"
                                }
                            ]
                        }
                    ]
                """);
    }

    @Test
    void shouldCreateBook() {
        Book newBook = new Book(
                3L,
                "title-3",
                LocalDate.of(2018, 8, 22),
                "Action",
                25.50,
                "English",
                "title-3 summary",
                550,
                Set.of(new Author(3L, "author-3", "author-3 details"))
        );
        when(this.bookService.save(any(Book.class)))
                .thenReturn(newBook);
        when(this.authorService.findAllByIds(any(Set.class)))
                .thenReturn(Set.of(new Author(3L, "author-3", "A new author")));


        this.graphQlTester
                .documentName("createBook")
                .variable("title", newBook.getTitle())
                .variable("authorIds", List.of(3L))
                .variable("publishedDate", newBook.getPublishedDate().toString())
                .variable("genre", newBook.getGenre())
                .variable("price", newBook.getPrice())
                .variable("language", newBook.getLanguage())
                .variable("summary", newBook.getSummary())
                .variable("totalPages", newBook.getTotalPages())
                .execute()
                .path("createBook")
                .matchesJson("""
                    {
                        "id": 3,
                        "title": "title-3",
                        "publishedDate": "2018-08-22",
                        "genre": "Action",
                        "price": 25.50,
                        "language": "English",
                        "summary": "title-3 summary",
                        "totalPages": 550,
                        "authors": [
                            {
                                "id": 3,
                                "name": "author-3",
                                "details": "author-3 details"
                            }
                        ]
                    }
                """);
    }

    @Test
    void shouldDeleteBook() {
        when(this.bookService.deleteById(1L))
                .thenReturn(1L);

        this.graphQlTester
                .documentName("deleteBook")
                .variable("id", 1L)
                .execute()
                .path("deleteBook")
                .matchesJson("1");
    }
}