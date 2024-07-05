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

      <Route path="/profil/:userId" element={<PageBibliotheque />} />
      <Route path="/parametres/:userId" element={<PageMemoireDetail />} />
      <Route path="/nouveau-compte" element={<PageMemoire />} />
      <Route path="/connection" element={<PagePageMemoireLecture />} />
      <Route path="/patient/:userId/:tabId" element={<PageProfile />} />
    </Routes>
  </Router>
);


export default App;
