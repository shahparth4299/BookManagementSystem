import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {deleteAuthor as apiDeleteAuthor, fetchAuthors, createAuthor} from "../api/api";
import {deleteAuthor as deleteAuthorAction, setAuthors, addAuthor} from "../features/authorReducer";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {Button, TextField} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";

const AuthorsList = () => {
    const authors = useSelector((state: RootState) => state.authors.authors);
    const dispatch = useDispatch();

    const [addMode, setAddMode] = useState(false);
    const [newAuthor, setNewAuthor] = useState({
        name: '', details: ''
    });

    useEffect(() => {
        const loadAuthors = async () => {
            const authors = await fetchAuthors();
            dispatch(setAuthors(authors));
        };

        loadAuthors();
    }, [dispatch]);

    const handleDeleteAuthor = async (id: number) => {
        await apiDeleteAuthor(id);
        dispatch(deleteAuthorAction(id));
    };

    const handleAddAuthor = () => {
        setAddMode(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewAuthor(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveAuthor = async () => {
        try {
            const authorData = await createAuthor(newAuthor);
            dispatch(addAuthor(authorData));
            setAddMode(false);
            setNewAuthor({ name: '', details: '' });
        } catch (error) {
            console.error("Error adding author:", error);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="Books Table">
                <TableHead>
                    <TableRow sx={{backgroundColor: '#eeeeee'}}>
                        <TableCell sx={{ fontWeight: 'bold'}}>Author Name</TableCell>
                        <TableCell sx={{ fontWeight: 'bold'}}>Details</TableCell>
                        <TableCell sx={{ width: 100 }}></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {authors.map((author, index) => (
                        <TableRow key={author.id} sx={{ backgroundColor: index % 2 === 0 ? 'white' : '#eeeeee' }}>
                            <TableCell>{author.name}</TableCell>
                            <TableCell>{author.details}</TableCell>
                            <TableCell>
                                <IconButton aria-label="delete" color="error" onClick={() => handleDeleteAuthor(author.id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}

                    {addMode && (
                        <TableRow>
                            {['name', 'details'].map(field => (
                                <TableCell key={field}>
                                    <TextField
                                        name={field}
                                        value={newAuthor[field as keyof typeof newAuthor] || ""}
                                        onChange={handleInputChange}
                                        variant="outlined"
                                        size="small"
                                        placeholder={field}
                                    />
                                </TableCell>
                            ))}
                            <TableCell>
                                <Button variant="contained" color="success" onClick={handleSaveAuthor}>Add</Button>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <Fab
                color="primary"
                aria-label="add"
                onClick={handleAddAuthor}
                sx={{
                    position: 'absolute',
                    bottom: 16,
                    right: 16,
                    backgroundColor: '#039be5'
                }}
            >
                <AddIcon />
            </Fab>
        </TableContainer>
    );
};


export default AuthorsList;