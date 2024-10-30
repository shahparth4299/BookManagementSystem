package com.acme.bookmanagement.controller;

import com.acme.bookmanagement.model.Author;
import com.acme.bookmanagement.service.AuthorService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import java.util.List;

/*
Author Controller handles following 3 operations.
1. Find all the authors
2. Create a new author
3. Delete an existing authod using id of author
*/
@Controller
@RequestMapping("/graphql")
public class AuthorController {
    private final AuthorService authorService;

    public AuthorController(AuthorService authorService){
        this.authorService = authorService;
    }

    @QueryMapping
    public List<Author> findAllAuthors() {
        return authorService.findAll();
    }

    @MutationMapping
    public Author createAuthor (
            @Argument String name,
            @Argument String details) {
        Author author = new Author(null, name, details);
        return authorService.save(author);
    }

    @MutationMapping
    public Long deleteAuthor(@Argument Long id) {
        return authorService.deleteById(id);
    }
}
