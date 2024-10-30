import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {addBook} from '../features/bookReducer';
import {createBook, fetchAuthors} from '../api/api';

interface Author {
    id: number;
    name: string;
}
export interface Book {
    id: number;
    title: string;
    publishedDate: string;
    genre: string;
    price: number;
    language: string;
    summary: string;
    totalPages: number;
    authors: Author[];
}

const AddBook = () => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [authorIds, setAuthorIds] = useState<number[]>([]);
    const [publishedDate, setPublishedDate] = useState('');
    const [genre, setGenre] = useState('');
    const [price, setPrice] = useState<number>(0);
    const [language, setLanguage] = useState('');
    const [summary, setSummary] = useState('');
    const [totalPages, setTotalPages] = useState<number>(0);
    const [authors, setAuthors] = useState<Author[]>([]);

    // Fetch authors on mount
    useEffect(() => {
        const loadAuthors = async () => {
            const authorsList = await fetchAuthors();
            setAuthors(authorsList);
        };
        loadAuthors();
    }, []);

    const handleAddBook = async () => {
        const newBook = await createBook({
            title,
            authorIds,
            publishedDate,
            genre,
            price,
            language,
            summary,
            totalPages
        });
        dispatch(addBook(newBook));
        setTitle('');
        setAuthorIds([]);
        setPublishedDate('');
        setGenre('');
        setPrice(0);
        setLanguage('');
        setSummary('');
        setTotalPages(0);
    };

    return (
        <div>
            <h2>Add Book</h2>
            <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="date" placeholder="Published Date" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
            <input type="text" placeholder="Genre" value={genre} onChange={(e) => setGenre(e.target.value)} />
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            <input type="text" placeholder="Language" value={language} onChange={(e) => setLanguage(e.target.value)} />
            <textarea placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} />
            <input type="number" placeholder="Total Pages" value={totalPages} onChange={(e) => setTotalPages(Number(e.target.value))} />
            <select
                multiple
                value={authorIds.map(String)}
                onChange={(e) => setAuthorIds(Array.from(e.target.selectedOptions, option => Number(option.value)))}
            >
                {authors.map(author => (
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                ))}
            </select>

            <button onClick={handleAddBook}>Add</button>
        </div>
    );
};

export default AddBook;
