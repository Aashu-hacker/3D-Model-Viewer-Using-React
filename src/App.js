import React, { useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { HexColorPicker } from 'react-colorful';
import './App.css';
import Model from './Model';  // Import the updated Model component

function App() {
  const [file, setFile] = useState(null);
  const [color, setColor] = useState('#ffffff');
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0, z: 0 });
  const fileInputRef = useRef();

  const handleFileUpload = (event) => {
    const file = URL.createObjectURL(event.target.files[0]);
    setFile(file);
  };

  const handleRotationChange = (axis, value) => {
    setRotation((prev) => ({ ...prev, [axis]: value }));
  };

  const handlePositionChange = (axis, value) => {
    setPosition((prev) => ({ ...prev, [axis]: value }));
  };

  return (
    <div className="App">
      <h2 className='title-bar'>3D Model Viewer</h2>
      {!file && (
        <div className="upload-container">
          <h2>Upload a 3D Model</h2>
          <input 
          type="file" 
          accept=".gltf, .glb, .js, .jsx, .3dm, .obj, .stl, .m3g" 
          ref={fileInputRef} 
          onChange={handleFileUpload} 
          className="file-input"
        />
        </div>
      )}

      {file && (
        <div className="container">
          <div className="sidebar">
            
            <div className="color-picker">
              <h3>Change Color</h3>
              <HexColorPicker color={color} onChange={setColor} />
            </div>

            <div className="slider">
              <h3>Scale</h3>
              <input 
                type="range" 
                min="0.5" 
                max="3" 
                step="0.1" 
                value={scale} 
                onChange={(e) => setScale(e.target.value)} 
              />
            </div>

            <div className="slider">
              <h3>Rotate (X-axis)</h3>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={rotation.x} 
                onChange={(e) => handleRotationChange('x', e.target.value)} 
              />
            </div>

            <div className="slider">
              <h3>Rotate (Y-axis)</h3>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={rotation.y} 
                onChange={(e) => handleRotationChange('y', e.target.value)} 
              />
            </div>

            <div className="slider">
              <h3>Rotate (Z-axis)</h3>
              <input 
                type="range" 
                min="0" 
                max="360" 
                value={rotation.z} 
                onChange={(e) => handleRotationChange('z', e.target.value)} 
              />
            </div>

            <div className="slider">
              <h3>Move (X-axis)</h3>
              <input 
                type="range" 
                min="-5" 
                max="5" 
                step="0.1" 
                value={position.x} 
                onChange={(e) => handlePositionChange('x', e.target.value)} 
              />
            </div>

            <div className="slider">
              <h3>Move (Y-axis)</h3>
              <input 
                type="range" 
                min="-5" 
                max="5" 
                step="0.1" 
                value={position.y} 
                onChange={(e) => handlePositionChange('y', e.target.value)} 
              />
            </div>

            <div className="slider">
              <h3>Move (Z-axis)</h3>
              <input 
                type="range" 
                min="-5" 
                max="5" 
                step="0.1" 
                value={position.z} 
                onChange={(e) => handlePositionChange('z', e.target.value)} 
              />
            </div>
          </div>

          <div className="model-viewer">
            <Canvas>
              <ambientLight />
              <pointLight position={[10, 10, 10]} />
              <OrbitControls />
              <Model 
                file={file} 
                color={color} 
                scale={scale} 
                rotation={rotation} 
                position={position} 
              />
            </Canvas>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
