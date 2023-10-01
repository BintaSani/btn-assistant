import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';

const ButtonAssistant = () => {
  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (button) => {
    setActiveButton(button);
  };

  return (
    <div>
      <h1>Button Function Descriptions</h1>
      <div className="button-container">
        <button onClick={() => handleButtonClick('button1')}>Button 1</button>
        <button onClick={() => handleButtonClick('button2')}>Button 2</button>
        <button onClick={() => handleButtonClick('button3')}>Button 3</button>
        <button onClick={() => handleButtonClick('button4')}>Button 4</button>
      </div>

      <Canvas>
        {/* Lights and camera */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />

        {/* 3D Model */}
        {activeButton && <Model button={activeButton} />}
      </Canvas>

      {activeButton && (
        <div className="description">
          {/* Display button description based on the activeButton state */}
          {getDescription(activeButton)}
        </div>
      )}
    </div>
  );
};

const getDescription = (button) => {
  // Define descriptions for each button
  const descriptions = {
    button1: 'Description for Button 1',
    button2: 'Description for Button 2',
    button3: 'Description for Button 3',
    button4: 'Description for Button 4',
  };

  return descriptions[button] || '';
};

const Model = ({ button }) => {
  // Load and display your 3D model (e.g., walking.fbx)
  const { nodes, materials } = useGLTF('../src/assets/Start Walking.fbx'); 

  // Calculate the model position based on the active button
  let modelPosition = [0, -10, 0];

  switch (button) {
    case 'button1':
      modelPosition = [-2, -10, 0];
      break;
    case 'button2':
      modelPosition = [0, -10, -2];
      break;
    case 'button3':
      modelPosition = [2, -10, 0];
      break;
    case 'button4':
      modelPosition = [0, -10, 2];
      break;
    default:
      break;
  }

  return (
    <group position={modelPosition}>
      <primitive object={nodes.modelName} material={materials.materialName} />
    </group>
  );
};

export default ButtonAssistant;
