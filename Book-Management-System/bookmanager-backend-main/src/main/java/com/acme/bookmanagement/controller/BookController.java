package com.acme.bookmanagement.controller;

import com.acme.bookmanagement.model.Author;
import com.acme.bookmanagement.model.Book;
import com.acme.bookmanagement.model.BookFilterModel;
import com.acme.bookmanagement.service.BookService;
import com.acme.bookmanagement.service.AuthorService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

/*
Book Controller handles following 4 operations.
1. Find all the books
2. Find the book by it's id
3. Create a new book
4. Delete an existing book using id of author
*/
@Controller
@RequestMapping("/graphql")
public class BookController {

    private final BookService bookService;
    private final AuthorService authorService;

    public BookController(BookService bookService, AuthorService authorService) {

        this.bookService = bookService;
        this.authorService = authorService;
    }

    /*
    Find all books method is used to find all the books and it is also used to perform filters. 
    It accepts BookFilterModel parameter and after finding all the books from database,
    it filters the list of books based on filter parameters.
    */
    @QueryMapping
    public List<Book> findAllBooks(@Argument BookFilterModel filter) {
        List<Book> books = bookService.findAll();
        if (filter != null) {
            if (filter.getLanguage() != null && !filter.getLanguage().isEmpty()) {
                books = books.stream()
                        .filter(book -> filter.getLanguage().equals(book.getLanguage()))
                        .collect(Collectors.toList());
            }
            if (filter.getGenre() != null && !filter.getGenre().isEmpty()) {
                books = books.stream()
                        .filter(book -> filter.getGenre().equals(book.getGenre()))
                        .collect(Collectors.toList());
            }
            if (filter.getMinPrice() != null && filter.getMinPrice() >= 0) {
                books = books.stream()
                        .filter(book -> book.getPrice() >= filter.getMinPrice())
                        .collect(Collectors.toList());
            }
            if (filter.getMaxPrice() != null && filter.getMaxPrice() > 0) {
                books = books.stream()
                        .filter(book -> book.getPrice() <= filter.getMaxPrice())
                        .collect(Collectors.toList());
            }
            if (filter.getAuthorName() != null && !filter.getAuthorName().isEmpty()) {
                books = books.stream()
                        .filter(book -> book.getAuthors().stream()
                                .anyMatch(author -> author.getName().equalsIgnoreCase(filter.getAuthorName())))
                                .collect(Collectors.toList());
            }
            if (filter.getPublishedAfterYear() != null && filter.getPublishedAfterYear() > 0) {
                books = books.stream()
                        .filter(book -> book.getPublishedDate() != null &&
                                book.getPublishedDate().getYear() > filter.getPublishedAfterYear())
                                .collect(Collectors.toList());
            }
        }
        return books;
    }

    @QueryMapping
    public Optional<Book> findBookById(@Argument Integer id) {
        return bookService.findById(Long.valueOf(id));
    }

    @MutationMapping
    public Book createBook(@Argument String title,
                           @Argument Set<Long> authorIds,
                           @Argument String publishedDate,
                           @Argument String genre,
                           @Argument Double price,
                           @Argument String language,
                           @Argument String summary,
                           @Argument int totalPages
                           ) {
        LocalDate localPublishedDate;
        try {
            localPublishedDate = LocalDate.parse(publishedDate, DateTimeFormatter.ISO_LOCAL_DATE);
        } catch (DateTimeParseException e) {
            throw new IllegalArgumentException("Invalid date format. Please use YYYY-MM-DD.");
        }
        Set<Author> authors = authorService.findAllByIds(authorIds);
        Book book = new Book(null, title, localPublishedDate, genre, price, language, summary, totalPages, authors);
        return bookService.save(book);
    }

    @MutationMapping
    public Long deleteBook(@Argument Long id) {
        return bookService.deleteById(id);
    }
}
