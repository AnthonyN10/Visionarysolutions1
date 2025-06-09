
import { Canvas } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Animated particles component
const AnimatedParticles = () => {
  const ref = useRef<THREE.Points>(null);
  const { mouse, viewport } = useThree();
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    
    for (let i = 0; i < 5000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    return positions;
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
      
      // React to mouse movement
      ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, mouse.x * viewport.width / 8, 0.02);
      ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, -mouse.y * viewport.height / 8, 0.02);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={particlesPosition} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#c9deff"
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

// Floating geometric shapes
const FloatingGeometry = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.2;
      meshRef.current.rotation.y += delta * 0.3;
      
      // Parallax effect based on mouse movement
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 2 + mouse.x * 0.5;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.3) * 1 + mouse.y * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -2]}>
      <torusGeometry args={[1.5, 0.4, 16, 100]} />
      <meshPhongMaterial 
        color="#0a1657"
        transparent 
        opacity={0.6}
        wireframe={true}
      />
    </mesh>
  );
};

// Additional floating sphere
const FloatingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.3) * 3;
      meshRef.current.position.y = Math.cos(state.clock.elapsedTime * 0.4) * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[3, 1, -4]}>
      <sphereGeometry args={[0.8, 32, 32]} />
      <meshPhongMaterial 
        color="#c9deff"
        transparent 
        opacity={0.4}
        wireframe={false}
      />
    </mesh>
  );
};

// Ambient lighting and effects
const Lighting = () => {
  const lightRef = useRef<THREE.DirectionalLight>(null);
  
  useFrame((state) => {
    if (lightRef.current) {
      lightRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.5) * 3;
      lightRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.5) * 3;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} color="#c9deff" />
      <directionalLight
        ref={lightRef}
        position={[2, 2, 5]}
        intensity={1.2}
        color="#ffffff"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#0a1657" />
    </>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{
          background: 'transparent'
        }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <AnimatedParticles />
          <FloatingGeometry />
          <FloatingSphere />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
