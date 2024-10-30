import React, {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import {deleteBook as deleteBookAction, setBooks, addBook as addBookAction} from '../features/bookReducer';
import {addAuthor, setAuthors} from "../features/authorReducer";
import {deleteBook as apiDeleteBook, createBook as apiCreateBook, createAuthor, fetchBooks, fetchAuthors} from '../api/api';
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Chip from "@mui/material/Chip";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Fab from "@mui/material/Fab";
import AddIcon from '@mui/icons-material/Add';
import {Autocomplete, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import RadioFilter from './RadioFilter';
import YearFilter from './YearFilter';
import AuthorDropdown from './AuthorDropDown';

const BooksList = () => {
    const dispatch = useDispatch();
    const books = useSelector((state: RootState) => state.books.books);
    const authors = useSelector((state: RootState) => state.authors.authors);

    const [openAuthorDialog, setOpenAuthorDialog] = useState(false);
    const [genre, setGenre] = useState<string | null>(null);
    const [language, setLanguage] = useState<string | null>(null);
    const [authorName, setAuthorName] = useState<string | null>(null);
    const [publishedAfterYear, setPublishedAfterYear] = useState<number | null>(null);
    const [minPrice, setMinPrice] = useState<number | null>(null);
    const [maxPrice, setMaxPrice] = useState<number | null>(null);
    const [isFilterChanged, setIsFilterChanged] = useState(false);

    const handleSaveBook = async () => {
        const savedBook = await apiCreateBook(newBook);
        dispatch(addBookAction(savedBook));
        setAddMode(false);
        setNewBook({
            title: '', publishedDate: '', genre: '', price: 0, language: '',
            summary: '', totalPages: 0, authorIds: [] as number[]
        });
    };

    useEffect(() => {
        if (!isFilterChanged) return;
        const fetchFilteredBooks = async () => {
            const response = await fetchBooks({
                genre,
                language,
                minPrice,
                maxPrice,
                authorName,
                publishedAfterYear,
            });
            dispatch(setBooks(response));
        };

        const timer = setTimeout(() => {
            fetchFilteredBooks();
        }, 300);

        return () => clearTimeout(timer);
    }, [genre, language, authorName, publishedAfterYear, isFilterChanged, dispatch]);

    const handleFilterChange = (filterType: string, value: any) => {
        setIsFilterChanged(true);

        switch (filterType) {
            case 'genre':
                setGenre(value);
                break;
            case 'language':
                setLanguage(value);
                break;
            case 'authorId':
                setAuthorName(value);
                break;
            case 'yearAfter':
                setPublishedAfterYear(value);
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        fetchAuthors().then(authors => dispatch(setAuthors(authors)));
    }, [dispatch]);

    const [addMode, setAddMode] = useState(false);
    const [newBook, setNewBook] = useState({
        title: '', publishedDate: '', genre: '', price: 0, language: '',
        summary: '', totalPages: 0, authorIds: [] as number[]
    });

    const [newAuthor, setNewAuthor] = useState({ name: '', details: '' });

    useEffect(() => {
        const loadBooks = async () => {
            const books = await fetchBooks();
            dispatch(setBooks(books));
        };

        const loadAuthors = async () => {
            const authors = await fetchAuthors();
            dispatch(setAuthors(authors));
        };

        loadBooks();
        loadAuthors();
    }, [dispatch]);

    const handleDeleteBook = async (id: number) => {
        await apiDeleteBook(id);
        dispatch(deleteBookAction(id));
    };

    const handleAddBook = () => {
        setAddMode(true);
    };

    const handleAddAuthor = () => {
        setOpenAuthorDialog(true);
    };

    const handleSaveAuthor = async () => {
        const authorData = await createAuthor(newAuthor);
        dispatch(addAuthor(authorData));
        setOpenAuthorDialog(false);
        setNewAuthor({ name: '', details: '' });
    };

    // @ts-ignore
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewBook(prev => ({
            ...prev,
            [name]: name === "price" || name === "totalPages" ? Number(value) : value
        }));
    };

    const handleDateChange = (date: any) => {
        const formattedDate = date ? dayjs(date).format('YYYY-MM-DD') : '';
        setNewBook((prev) => ({
            ...prev,
            publishedDate: formattedDate,
        }));
    };

    // @ts-ignore
    return (
        <>
    <div>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 800, p: 3, border: '1px solid #ddd', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Filters</Typography>
            <RadioFilter
            label="Genre"
            options={['Adventure', 'Thriller', 'Fictional', 'Action']}
            value={genre}
            onChange={(value) => handleFilterChange('genre', value)}
        />
        <RadioFilter
            label="Language"
            options={['English', 'Spanish', 'Irish', 'French']}
            value={language}
            onChange={(value) => handleFilterChange('language', value)}
        />
        <YearFilter
            value={publishedAfterYear}
            onChange={(value) => handleFilterChange('yearAfter', value)}
        />
        <AuthorDropdown
            authors={authors}
            value={authorName}
            onChange={(author) => handleFilterChange('authorId', author || null)}
        />
        </Box>
    </div>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Books Table">
                <TableHead>
                    <TableRow sx={{backgroundColor: '#eeeeee'}}>
                        <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Published Date</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Genre</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Price</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Language</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Summary</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Total Pages</TableCell>
                        <TableCell sx={{ fontWeight: 'bold' }}>Authors</TableCell>
                        <TableCell sx={{ width: 60 }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {books.map((book, index) => (
                        <TableRow key={book.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#eeeeee' }}>
                            <TableCell>{book.title}</TableCell>
                            <TableCell>{new Date(book.publishedDate).toLocaleDateString()}</TableCell>
                            <TableCell>{book.genre}</TableCell>
                            <TableCell>${book.price.toFixed(2)}</TableCell>
                            <TableCell>{book.language}</TableCell>
                            <TableCell>{book.summary}</TableCell>
                            <TableCell>{book.totalPages}</TableCell>
                            <TableCell>
                                {book.authors.map((author) => (
                                    <Chip
                                        key={author.id}
                                        avatar={<Avatar>{author.name.charAt(0)}</Avatar>}
                                        label={author.name}
                                        variant="outlined"
                                        color="primary"
                                        sx={{ m: 0.5 }}
                                    />
                                ))}
                            </TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" color="error" onClick={() => handleDeleteBook(book.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {addMode && (
                        <TableRow>
                            {['title', 'publishedDate', 'genre', 'price', 'language', 'summary', 'totalPages'].map(field => (
                                <TableCell key={field}>
                                    {field === 'price' ? (
                                        <TextField
                                            name={field}
                                            value={newBook.price || ""}
                                            onChange={event => {
                                                const value = event.target.value;
                                                if (!isNaN(parseFloat(value)) || value === '') {
                                                    setNewBook(prev => ({ ...prev, price: parseFloat(value) }));
                                                }
                                            }}
                                            variant="outlined"
                                            size="small"
                                            placeholder="Price"
                                            type="number"
                                        />
                                    ) : field === 'totalPages' ? (
                                        <TextField
                                            name={field}
                                            value={newBook.totalPages || ""}
                                            onChange={event => {
                                                const value = event.target.value;
                                                // Allow only positive integer values
                                                if (/^\d*$/.test(value)) {
                                                    setNewBook(prev => ({ ...prev, totalPages: parseInt(value, 10) || 0 }));
                                                }
                                            }}
                                            variant="outlined"
                                            size="small"
                                            placeholder="Total Pages"
                                            type="number"
                                        />
                                    ) : field === 'publishedDate' ? (
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                onChange={handleDateChange}
                                                value={newBook.publishedDate ? dayjs(newBook.publishedDate) : null}
                                                format="YYYY-MM-DD"
                                            />
                                        </LocalizationProvider>
                                    ) : (
                                        <TextField
                                            name={field}
                                            value={newBook[field as keyof typeof newBook] || ""}
                                            onChange={handleInputChange}
                                            variant="outlined"
                                            size="small"
                                            placeholder={field}
                                        />
                                    )}
                                </TableCell>
                            ))}
                            <TableCell>

                                <Autocomplete
                                    multiple
                                    options={authors}
                                    getOptionLabel={(option) => option.name}
                                    onChange={(event, newValue) =>
                                        setNewBook((prev) => ({
                                            ...prev,
                                            authorIds: newValue.map((author) => author.id)
                                        }))
                                    }
                                    renderInput={(params) => <TextField {...params} variant="outlined" placeholder="Select Authors" />}
                                />
                                <Button onClick={handleAddAuthor}>Add New Author</Button>
                            </TableCell>
                            <TableCell>
                                <Button variant="contained" color="success" onClick={handleSaveBook}>Add</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleAddBook}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    backgroundColor: '#039be5'
                }}
            >
                <AddIcon />
            </Fab>

            <Dialog open={openAuthorDialog} onClose={() => setOpenAuthorDialog(false)}>
                <DialogTitle>Add New Author</DialogTitle>
                <DialogContent>
                    <TextField
                        name="name"
                        label="Name"
                        value={newAuthor.name}
                        onChange={(e) => setNewAuthor({ ...newAuthor, name: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                    <TextField
                        name="details"
                        label="Details"
                        value={newAuthor.details}
                        onChange={(e) => setNewAuthor({ ...newAuthor, details: e.target.value })}
                        fullWidth
                        margin="dense"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenAuthorDialog(false)}>Cancel</Button>
                    <Button onClick={handleSaveAuthor} color="primary">Save</Button>
                </DialogActions>
            </Dialog>
        </TableContainer>
    </>
    );
};

export default BooksList;
