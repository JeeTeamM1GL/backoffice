import logo from './logo.svg';
import './App.css';

import React from 'react';
import { Button } from 'antd';
import 'antd/dist/reset.css'; // Importer les styles d'Ant Design
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageAutentification from "./front/PageAutentification.tsx";
import PageBibliotheque  from "./front/PageBibliotheque.tsx";
import PageMemoireDetail from "./front/PageMemoireDetail.tsx";
import PageMemoire from "./front/PageMemoire.tsx";
import PagePageMemoireLecture from "./front/PageMemoireLecture.tsx";
import PageProfile from "./front/PageProfile.tsx";
// import { BrowserRouter as Router, Route } from "react-router-dom";


const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<PageAutentification />} />
      <Route path="/bibliotheque" element={<PageBibliotheque />} />
      <Route path="/memoireDetail" element={<PageMemoireDetail />} />
      <Route path="/memoire" element={<PageMemoire />} />
      <Route path="/memoire-lecture" element={<PagePageMemoireLecture />} />
      <Route path="/profil" element={<PageProfile />} />
    </Routes>
  </Router>
);


export default App;
