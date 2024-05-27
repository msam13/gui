// src/App.jsx
import React from 'react';
import './App.css';
import NavBar from './NavBar';
import ImagePicker from './ImagePicker';

function App() {
  return (
    <div className="App">
      <NavBar />
      <h1>Image Uploader</h1>
      <ImagePicker />
    </div>
  );
}

export default App;
