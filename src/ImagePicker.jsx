// ImagePicker.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { initializeWebSocket } from './WebSocketHandler';
import './ImagePicker.css';

function ImagePicker() {
  const [images, setImages] = useState([]);
  const [websocket, setWebSocket] = useState(null);

  const onDrop = useCallback((acceptedFiles) => {
    const imagePreviews = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setImages((prevImages) => [...prevImages, ...imagePreviews]);
  }, []);

  useEffect(() => {
    return () => {
      images.forEach((image) => URL.revokeObjectURL(image.preview));
    };
  }, [images]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/*' });

  const handleRunClick = () => {
    if (images.length === 0) {
      alert('Please select some images first.');
      return;
    }

    if (!websocket) {
      const ws = initializeWebSocket(
        'wss://73.223.189.120:8000/ws',
        () => {
          console.log('WebSocket connection opened.');
          const initialMessage = JSON.stringify({ num_photos: images.length });
          ws.send(initialMessage);

          images.forEach((image) => {
            const reader = new FileReader();
            reader.onload = (event) => {
              const binaryData = event.target.result;
              ws.send(binaryData);
            };
            reader.readAsArrayBuffer(image);
          });
        },
        (message) => {
          console.log('Received:', message.data);
        },
        () => {
          console.log('WebSocket connection closed.');
          setWebSocket(null);
        },
        (error) => {
          console.error('WebSocket error:', error);
          alert('WebSocket error occurred. Please try again.');
        }
      );

      setWebSocket(ws);
    }
  };

  return (
    <div className="image-picker">
      <div className="select-text">Select All Image</div>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag & drop images here, or click to select files</p>
      </div>
      <div className="preview-container">
        {images.map((image, index) => (
          <div key={index} className="preview">
            <img src={image.preview} alt={`preview ${index}`} className="image" />
          </div>
        ))}
      </div>
      <button onClick={handleRunClick} className="button">
        RUN
      </button>
    </div>
  );
}

export default ImagePicker;