package com.acme.bookmanagement.service;

import com.acme.bookmanagement.model.Author;
import com.acme.bookmanagement.repository.AuthorRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AuthorService{

    private static final Logger logger = LoggerFactory.getLogger(AuthorService.class);
    private final AuthorRepository authorRepository;

    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Author> findAll() {
        return authorRepository.findAll();
    }

    public Set<Author> findAllByIds(Set<Long> ids) {
        return new HashSet<>(authorRepository.findAllById(ids));
    }

    public Author save(Author author) {
        logger.info("Author details {}", author.getId() + " : " + author.getName());
        return authorRepository.save(author);
    }

    public Long deleteById(Long id) {
        logger.info("Delete ID {}", id);
        authorRepository.deleteById(id);
        return id;
    }
}

