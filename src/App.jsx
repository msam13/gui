// App.jsx
import React from 'react';
import './App.css';
import NavBar from './NavBar';
import ImagePicker from './ImagePicker';
import ModelViewer from './ModelViewer';

function App() {
  return (
    <div className="App">
      <NavBar />
      <div className="container">
        <div className="left">
          <ImagePicker />
        </div>
        <div className="right">
          <ModelViewer />
        </div>
      </div>
    </div>
  );
}

export default App;