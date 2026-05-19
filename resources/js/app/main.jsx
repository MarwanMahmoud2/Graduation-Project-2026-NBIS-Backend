import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import '../../css/app.css';

const el = document.getElementById('demo-root');
if (el) {
    createRoot(el).render(
        <React.StrictMode>
            <BrowserRouter basename="/demo">
                <App />
            </BrowserRouter>
        </React.StrictMode>
    );
}
