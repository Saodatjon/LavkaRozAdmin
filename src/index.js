import React from 'react';
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.css';
import App from './App'
import { BrowserRouter } from 'react-router-dom';
import './assets/css/style.css'
import UserContextProvider from './context/userContext';

const root = ReactDOM.createRoot(document.querySelector('.wrapper'));

root.render(
    <BrowserRouter>
        <UserContextProvider>
            <App/>
       </UserContextProvider>
    </BrowserRouter>
);

