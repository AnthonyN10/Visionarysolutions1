
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
    const positions = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
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
          size={0.005}
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
    <mesh ref={meshRef} position={[0, 0, -5]}>
      <torusGeometry args={[1, 0.3, 16, 100]} />
      <meshPhongMaterial 
        transparent 
        opacity={0.3}
        wireframe={true}
      >
        <primitive object={new THREE.Color("#0a1657")} attach="color" />
      </meshPhongMaterial>
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
      <ambientLight intensity={0.4} color="#c9deff" />
      <directionalLight
        ref={lightRef}
        position={[2, 2, 5]}
        intensity={0.8}
        color="#ffffff"
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#0a1657" />
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
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
