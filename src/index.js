import React from 'react';
import ReactDOM from 'react-dom/client';
//import './index.css';
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import App from './App';
import {BrowserRouter, Route, Routes} from "react-router-dom";

const root = ReactDOM.createRoot(
    document.getElementById('root')
);
root.render(
    <React.StrictMode>
        <AlertProvider template={AlertTemplate}>
            <App/>
        </AlertProvider>
    </React.StrictMode>
);
