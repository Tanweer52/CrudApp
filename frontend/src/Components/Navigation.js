
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

            <h2 className='ViewAll' onClick={gotoHome}><JournalAlbum /></h2>
            <h2 className='AddIcon' onClick={gotoAdd}><PlusCircle /></h2>

        </nav>

        // <div className="top">
        //     <div className="top-center">
        //         <i onClick={gotoHome}
        //             className="topicon fa-brands fa-facebook"><JournalAlbum /></i>
        //         <i onClick={gotoAdd}
        //             className="topicon fa-brands fa-twitter"><PlusCircle /></i>
        //     </div>
        // </div>
    );
};

export default Navigation;
