// src/components/HeroScene3D.jsx
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Icosahedron } from '@react-three/drei'

// 1. Este es el componente de la forma que rota
function Shape() {
  const meshRef = useRef()

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <Icosahedron ref={meshRef} args={[1.8, 0]}> 
      <meshStandardMaterial 
        color="#4da8da" 
        wireframe={true}
      />
    </Icosahedron>
  )
}

// 2. ASEGÚRATE DE QUE ESTA LÍNEA ES EXACTA
export default function HeroScene3D() {
  return (
    <div style={{ width: '200px', height: '200px', cursor: 'grab' }}>
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} intensity={2} />
        <pointLight position={[-10, -10, -10]} intensity={1} />
        
        <Shape />
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  )
}