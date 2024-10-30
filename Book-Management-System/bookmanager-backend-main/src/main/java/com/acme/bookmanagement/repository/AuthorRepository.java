package com.acme.bookmanagement.repository;

import com.acme.bookmanagement.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Long> {
}
