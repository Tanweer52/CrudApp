
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusCircle, JournalAlbum } from 'react-bootstrap-icons';

import "./Navigation.css"
const Navigation = () => {
    const nav = useNavigate();
    const gotoHome = () => {
        nav('/');
    }

    const gotoAdd = () => {
        nav('/add');
    }

    return (
        <nav className='NavigationContainer'>
            <h1 className='ViewAll' onClick={gotoHome}><JournalAlbum /></h1>
            <h1 className='AddIcon' onClick={gotoAdd}><PlusCircle /></h1>
        </nav>
    );
};

export default Navigation;
