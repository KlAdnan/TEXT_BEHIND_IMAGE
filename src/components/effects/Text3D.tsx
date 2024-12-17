import { Canvas, useFrame } from '@react-three/fiber';
import { Text3D as DreiText, OrbitControls, Environment, useTexture } from '@react-three/drei';
import { motion } from 'framer-motion-3d';
import { useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom, ChromaticAberration } from '@react-three/postprocessing';

type AnimationType = 'rotate' | 'float' | 'pulse' | 'none' | 'wave' | 'bounce' | 'spiral' | 'glitch';

interface Text3DProps {
  text: string;
  color?: string;
  metalness?: number;
  roughness?: number;
  bevelEnabled?: boolean;
  bevelSize?: number;
  bevelThickness?: number;
  animation?: AnimationType;
  animationSpeed?: number;
}

const Text3DContent = ({ text, ...props }: Text3DProps) => {
  const meshRef = useRef<THREE.Mesh | null>(null);
  const [hovered, setHovered] = useState(false);
  const initialPosition = useRef({ x: 0, y: 0, z: 0 });
  const time = useRef(0);
  
  const matcapTexture = useTexture<THREE.Texture>('/textures/matcap-gold.png');

  useFrame((state) => {
    if (!meshRef.current) return;
    time.current += 0.016 * (props.animationSpeed || 1);

    switch (props.animation) {
      case 'rotate':
        meshRef.current.rotation.y += 0.01 * (props.animationSpeed || 1);
        break;
        
      case 'float':
        meshRef.current.position.y = 
          initialPosition.current.y + Math.sin(time.current) * 0.1;
        break;
        
      case 'pulse':
        const scale = 1 + Math.sin(time.current * 2) * 0.05;
        meshRef.current.scale.setScalar(scale);
        break;
        
      case 'wave':
        const chars = meshRef.current.children;
        chars.forEach((char, i) => {
          char.position.y = Math.sin(time.current * 2 + i * 0.5) * 0.1;
        });
        break;
        
      case 'bounce':
        const bounceHeight = Math.abs(Math.sin(time.current * 3));
        meshRef.current.position.y = 
          initialPosition.current.y + bounceHeight * 0.2;
        meshRef.current.rotation.x = bounceHeight * 0.1;
        break;
        
      case 'spiral':
        const radius = 0.2;
        meshRef.current.position.x = 
          initialPosition.current.x + Math.cos(time.current) * radius;
        meshRef.current.position.z = 
          initialPosition.current.z + Math.sin(time.current) * radius;
        meshRef.current.rotation.y = time.current;
        break;
        
      case 'glitch':
        if (Math.random() > 0.95) {
          meshRef.current.position.x = 
            initialPosition.current.x + (Math.random() - 0.5) * 0.1;
          meshRef.current.position.y = 
            initialPosition.current.y + (Math.random() - 0.5) * 0.1;
          setTimeout(() => {
            if (meshRef.current) {
              meshRef.current.position.copy(initialPosition.current);
            }
          }, 50);
        }
        break;
    }
  });

  useEffect(() => {
    if (meshRef.current) {
      initialPosition.current = meshRef.current.position.clone();
    }
  }, []);

  return (
    <motion.group
      initial={{ scale: 0, rotateX: 180 }}
      animate={{ scale: 1, rotateX: 0 }}
      transition={{ duration: 1.5, type: "spring" }}
    >
      <DreiText
        ref={meshRef}
        font="/fonts/inter-bold.json"
        size={0.5}
        height={0.2}
        bevelEnabled={props.bevelEnabled}
        bevelSize={props.bevelSize}
        bevelThickness={props.bevelThickness}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {text}
        <meshStandardMaterial
          color={props.color}
          metalness={hovered ? 1 : props.metalness}
          roughness={hovered ? 0 : props.roughness}
          envMapIntensity={1.5}
          matcap={matcapTexture}
        >
          <motion.meshPhysicalMaterial
            initial={{ transmission: 0 }}
            animate={{ 
              transmission: hovered ? 0.5 : 0,
              emissive: hovered ? new THREE.Color(props.color).multiplyScalar(0.5) : new THREE.Color(0x000000)
            }}
          />
        </meshStandardMaterial>
      </DreiText>
    </motion.group>
  );
};

export const Text3D = (props: Text3DProps) => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 75 }}>
      <color attach="background" args={['#000']} />
      <fog attach="fog" args={['#000', 5, 15]} />
      
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />
      
      <Text3DContent {...props} />
      
      <OrbitControls 
        enableZoom={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
      <Environment preset="sunset" />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={1.5}
          luminanceThreshold={0.6}
          luminanceSmoothing={0.9}
        />
        <ChromaticAberration offset={[0.002, 0.002]} />
      </EffectComposer>
    </Canvas>
  );
}; 