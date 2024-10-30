package com.acme.bookmanagement.model;

/*
Model class for storing all the filter options.
*/
public class BookFilterModel {
    private String language;
    private String genre;
    private double minPrice;
    private double maxPrice;
    private String authorName;
    private int publishedAfterYear;

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Double getMinPrice() {
        return minPrice;
    }

    public void setMinPrice(Double minPrice) {
        this.minPrice = minPrice;
    }

    public Double getMaxPrice() {
        return maxPrice;
    }

    public void setMaxPrice(Double maxPrice) {
        this.maxPrice = maxPrice;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public Integer getPublishedAfterYear() {
        return publishedAfterYear;
    }

    public void setPublishedAfterYear(Integer publishedAfterYear) {
        this.publishedAfterYear = publishedAfterYear;
    }
}
