import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

function Model({ file, color, scale, rotation, position }) {
  const { scene } = useGLTF(file);

  useEffect(() => {
    if (scene) {
      // Traverse through the model and update material color
      scene.traverse((child) => {
        if (child.isMesh && child.material) {
          child.material.color.set(color);
        }
      });
    }
  }, [scene, color]);

  return (
    <primitive
      object={scene}
      scale={scale}
      position={[position.x, position.y, position.z]}
      rotation={[
        rotation.x * (Math.PI / 180), 
        rotation.y * (Math.PI / 180), 
        rotation.z * (Math.PI / 180)
      ]}
    />
  );
}

export default Model;
