
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import * as THREE from 'three';

// Custom shader material for organic flowing background
const FluidShaderMaterial = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse, viewport } = useThree();
  
  const uniforms = useMemo(() => ({
    u_time: { value: 0.0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    u_color1: { value: new THREE.Color('#020b43') },
    u_color2: { value: new THREE.Color('#0a1657') },
    u_color3: { value: new THREE.Color('#c9deff') },
  }), []);

  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    uniform vec3 u_color1;
    uniform vec3 u_color2;
    uniform vec3 u_color3;
    varying vec2 vUv;

    // Noise function for organic movement
    float noise(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    // Fractal Brownian Motion for complex patterns
    float fbm(vec2 st) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 0.0;
      
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(st);
        st *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Smooth flowing patterns
    float flow(vec2 st, float time) {
      vec2 flow1 = vec2(
        fbm(st + time * 0.1),
        fbm(st + vec2(1.0) + time * 0.1)
      );
      
      vec2 flow2 = vec2(
        fbm(st + flow1 + time * 0.05),
        fbm(st + flow1 + vec2(1.0) + time * 0.05)
      );
      
      return fbm(st + flow2);
    }

    void main() {
      vec2 st = vUv;
      vec2 mouseInfluence = u_mouse * 0.5;
      
      // Create flowing organic patterns
      float pattern1 = flow(st * 3.0 + mouseInfluence, u_time);
      float pattern2 = flow(st * 2.0 - mouseInfluence * 0.5, u_time * 0.8);
      float pattern3 = flow(st * 4.0 + mouseInfluence * 0.3, u_time * 1.2);
      
      // Combine patterns for depth
      float combined = pattern1 * 0.5 + pattern2 * 0.3 + pattern3 * 0.2;
      
      // Create color mixing based on patterns
      vec3 color = mix(u_color1, u_color2, pattern1);
      color = mix(color, u_color3, pattern2 * 0.3);
      
      // Add subtle pulsing effect
      float pulse = sin(u_time * 2.0) * 0.1 + 0.9;
      color *= pulse;
      
      // Add gradient from center
      float dist = distance(st, vec2(0.5));
      color *= (1.0 - dist * 0.3);
      
      gl_FragColor = vec4(color, 0.8);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.u_mouse.value.set(
        mouse.x * viewport.width / 2,
        mouse.y * viewport.height / 2
      );
    }
  });

  return (
    <shaderMaterial
      ref={materialRef}
      vertexShader={vertexShader}
      fragmentShader={fragmentShader}
      uniforms={uniforms}
      transparent={true}
      side={THREE.DoubleSide}
    />
  );
};

// Secondary flowing layer for depth
const SecondaryFluidLayer = () => {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { mouse } = useThree();
  
  const uniforms = useMemo(() => ({
    u_time: { value: 0.0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_color: { value: new THREE.Color('#c9deff') },
  }), []);

  const fragmentShader = `
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec3 u_color;
    varying vec2 vUv;

    float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }

    void main() {
      vec2 st = vUv;
      
      // Create flowing particles effect
      vec2 flow = vec2(
        sin(st.x * 10.0 + u_time * 2.0) * 0.1,
        cos(st.y * 8.0 + u_time * 1.5) * 0.1
      );
      
      st += flow + u_mouse * 0.1;
      
      // Flowing energy streams
      float pattern = sin(st.x * 20.0 + u_time * 3.0) * 
                     cos(st.y * 15.0 + u_time * 2.0) * 0.5 + 0.5;
      
      pattern *= smoothstep(0.3, 0.7, random(floor(st * 10.0)));
      
      vec3 color = u_color * pattern * 0.3;
      
      gl_FragColor = vec4(color, pattern * 0.4);
    }
  `;

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.u_time.value = state.clock.elapsedTime;
      materialRef.current.uniforms.u_mouse.value.set(mouse.x, mouse.y);
    }
  });

  return (
    <mesh position={[0, 0, -1]}>
      <planeGeometry args={[50, 50]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
};

// Main fluid background mesh
const FluidBackground = () => {
  return (
    <>
      {/* Main flowing background */}
      <mesh>
        <planeGeometry args={[50, 50]} />
        <FluidShaderMaterial />
      </mesh>
      
      {/* Secondary particle layer */}
      <SecondaryFluidLayer />
    </>
  );
};

const ThreeBackground = () => {
  return (
    <div className="absolute inset-0 z-10 pointer-events-none">
      <Canvas
        camera={{
          position: [0, 0, 10],
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{
          background: 'transparent'
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Suspense fallback={null}>
          <FluidBackground />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeBackground;
