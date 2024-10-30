import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface Author {
    id: number;
    name: string;
    details?: string;
}

interface AuthorState {
    authors: Author[];
}

const initialState: AuthorState = {
    authors: [],
};

const authorReducer = createSlice({
    name: 'authors',
    initialState,
    reducers: {
        setAuthors(state, action: PayloadAction<Author[]>) {
            state.authors = action.payload;
        },
        addAuthor(state, action: PayloadAction<Author>) {
            state.authors.push(action.payload);
        },
        deleteAuthor(state, action: PayloadAction<number>) {
            state.authors = state.authors.filter(author => author.id !== action.payload);
        },
    },
});

export const {setAuthors, addAuthor, deleteAuthor} = authorReducer.actions;

export default authorReducer.reducer;
