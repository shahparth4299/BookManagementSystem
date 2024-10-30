import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {setBooks} from './features/bookReducer';
import BooksList from './components/BooksList';
import AddBook from './components/AddBook';
import {fetchBooks} from './api/api';
import NavigationDrawer from './components/NavigationDrawer';

const App: React.FC = () => {
    const dispatch = useDispatch();

    return (
        <div>
            <NavigationDrawer/>
        </div>
    );
};

export default App;

