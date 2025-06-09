import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Vector3, CatmullRomCurve3, TubeGeometry, Color } from 'three';
import * as THREE from 'three';

const RibbonMesh = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse, viewport } = useThree();

  // Create the ribbon curve
  const { geometry } = useMemo(() => {
    const points = [];
    const numPoints = 50;
    
    // Create a flowing, twisted ribbon path
    for (let i = 0; i < numPoints; i++) {
      const t = (i / numPoints) * Math.PI * 4;
      const x = Math.cos(t) * (2 + Math.sin(t * 0.5));
      const y = Math.sin(t * 0.3) * 1.5;
      const z = Math.sin(t) * (1.5 + Math.cos(t * 0.3));
      points.push(new Vector3(x, y, z));
    }
    
    const curve = new CatmullRomCurve3(points, true);
    const tubeGeometry = new TubeGeometry(curve, 200, 0.3, 8, true);
    
    return { geometry: tubeGeometry };
  }, []);

  // Custom shader material for glowing effect
  const shaderMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mouseX: { value: 0 },
        mouseY: { value: 0 },
        color1: { value: new Color('#00d4ff') },
        color2: { value: new Color('#0066cc') },
        color3: { value: new Color('#001a4d') }
      },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        uniform float time;
        uniform float mouseX;
        uniform float mouseY;
        
        void main() {
          vUv = uv;
          vPosition = position;
          vNormal = normal;
          
          vec3 pos = position;
          
          // Add gentle wave animation
          pos.x += sin(time * 0.5 + position.z * 0.1) * 0.1;
          pos.y += cos(time * 0.3 + position.x * 0.1) * 0.1;
          
          // Mouse influence
          pos.x += mouseX * 0.2;
          pos.y += mouseY * 0.2;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        uniform vec3 color1;
        uniform vec3 color2;
        uniform vec3 color3;
        varying vec2 vUv;
        varying vec3 vPosition;
        varying vec3 vNormal;
        
        void main() {
          // Create gradient along the ribbon
          float gradient = sin(vUv.x * 3.14159) * 0.5 + 0.5;
          
          // Animated color flow
          float flow = sin(time * 0.8 + vUv.x * 10.0) * 0.5 + 0.5;
          
          // Mix colors based on position and time
          vec3 color = mix(color3, color1, gradient);
          color = mix(color, color2, flow);
          
          // Add glow effect
          float fresnel = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
          color += color1 * fresnel * 0.5;
          
          // Add some transparency for layering
          float alpha = 0.8 + sin(time * 0.5 + vUv.x * 5.0) * 0.2;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && meshRef.current.material) {
      const material = meshRef.current.material as THREE.ShaderMaterial;
      if (material.uniforms) {
        material.uniforms.time.value = state.clock.elapsedTime;
        material.uniforms.mouseX.value = mouse.x * 0.5;
        material.uniforms.mouseY.value = mouse.y * 0.5;
      }
    }
    
    if (meshRef.current) {
      // Gentle rotation
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} geometry={geometry} material={shaderMaterial}>
    </mesh>
  );
};

const MultipleRibbons = () => {
  return (
    <>
      <RibbonMesh />
      <group rotation={[0, Math.PI / 3, 0]} scale={0.7} position={[2, -1, -2]}>
        <RibbonMesh />
      </group>
      <group rotation={[0, -Math.PI / 4, 0]} scale={0.5} position={[-1.5, 1, -1]}>
        <RibbonMesh />
      </group>
    </>
  );
};

const BlueRibbonBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: 5 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 75 }}
        style={{ background: 'radial-gradient(circle, #001122 0%, #000000 100%)' }}
      >
        <ambientLight intensity={0.3} color="#001a4d" />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={1} 
          color="#00ccff"
        />
        <directionalLight 
          position={[-10, -10, -5]} 
          intensity={0.5} 
          color="#0066cc"
        />
        
        <MultipleRibbons />
      </Canvas>
    </div>
  );
};

export default BlueRibbonBackground;
