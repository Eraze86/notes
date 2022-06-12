import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Layout } from './components/Layout.tsx';
import { Home } from './components/Home.tsx';
import { User } from './components/User.tsx';
import { NoPage } from './components/NoPage.tsx';
import { AddDoc } from './components/addDoc.tsx';

import reportWebVitals from './reportWebVitals';
import { Note } from './components/note.tsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
  <BrowserRouter>
     <Routes>
       <Route path="/" element={<Layout />}>
         <Route index element={<Home />} />
         <Route path="/user" element={<User />} />
         <Route path="/user/addDoc" element={<AddDoc/>} />
         <Route path="/user/:id" element={<Note />} />
         <Route path="*" element={<NoPage />} />
       </Route>
     </Routes>
   </BrowserRouter>
 </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
