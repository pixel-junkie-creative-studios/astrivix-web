import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, useTexture, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

// Preload planet textures and 3D GLTF Satellite for instant WebGL loading
try {
  useTexture.preload('/assets/planets/earth.jpg');
  useTexture.preload('/assets/planets/earth_normal.jpg');
  useTexture.preload('/assets/planets/earth_specular.jpg');
  useTexture.preload('/assets/planets/earth_clouds.png');
  useTexture.preload('/assets/planets/moon.jpg');
  useTexture.preload('/assets/planets/venus.jpg');
  useTexture.preload('/assets/planets/circle_05.png');
  useGLTF.preload('/assets/planets/satellite.glb');
} catch (e) {
  // Graceful fallback for pre-load environments
}

// Camera Z Depth Controller based on window scroll progress
const CameraController = () => {
  const targetZ = useRef(0);

  useFrame(({ camera }) => {
    if (typeof window === 'undefined') return;

    const scrollY = window.scrollY || window.pageYOffset || 0;
    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const progress = Math.min(1, Math.max(0, scrollY / maxScroll));

    // Camera smoothly glides from Z = 0 (Hero) to Z = -25 (Footer)
    targetZ.current = -progress * 25;
    camera.position.z += (targetZ.current - camera.position.z) * 0.08;
  });

  return null;
};

// Helper function for slowdown during Services section
const getSpeedMultiplier = () => {
  if (typeof document === 'undefined') return 1.0;
  const el = document.getElementById('services');
  if (!el) return 1.0;
  const rect = el.getBoundingClientRect();
  const windowH = window.innerHeight;
  const inServices = rect.top < windowH && rect.bottom > 0;
  return inServices ? 0.08 : 1.0;
};

// Earth Component with Cloud Layer
const DetailedEarth = ({ position, isMobile = false }) => {
  const earthRef = useRef();
  const cloudsRef = useRef();

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    '/assets/planets/earth.jpg',
    '/assets/planets/earth_normal.jpg',
    '/assets/planets/earth_specular.jpg',
    '/assets/planets/earth_clouds.png'
  ]);

  useEffect(() => {
    [colorMap, normalMap, specularMap, cloudsMap].forEach(tex => {
      if (tex) {
        tex.anisotropy = 16;
        tex.colorSpace = THREE.SRGBColorSpace;
      }
    });
  }, [colorMap, normalMap, specularMap, cloudsMap]);

  useFrame((state, delta) => {
    const mult = getSpeedMultiplier();
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.18 * mult;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.22 * mult;
  });

  const earthRadius = isMobile ? 3.2 : 4.5;

  return (
    <group position={position} rotation={[0.4, 0, 0.2]}>
      <Sphere ref={earthRef} args={[earthRadius, 96, 96]}>
        <meshStandardMaterial 
          map={colorMap} 
          normalMap={normalMap} 
          normalScale={new THREE.Vector2(3.0, 3.0)}
          roughnessMap={specularMap} 
          roughness={0.25} 
          metalness={0.2}
        />
      </Sphere>

      <Sphere ref={cloudsRef} args={[earthRadius + 0.05, 96, 96]}>
        <meshStandardMaterial 
          map={cloudsMap} 
          transparent={true} 
          opacity={0.85} 
          depthWrite={false} 
          roughness={0.9}
        />
      </Sphere>
    </group>
  );
};

// Earth Fallback Mesh
const EarthFallback = ({ position, isMobile = false }) => {
  const earthRadius = isMobile ? 3.2 : 4.5;
  return (
    <group position={position}>
      <Sphere args={[earthRadius, 32, 32]}>
        <meshStandardMaterial color="#1e3a8a" roughness={0.4} metalness={0.6} />
      </Sphere>
    </group>
  );
};

// Moon Component
const DetailedMoon = ({ position, isMobile = false }) => {
  const moonRef = useRef();
  const colorMap = useTexture('/assets/planets/moon.jpg');

  useEffect(() => {
    if (colorMap) {
      colorMap.anisotropy = 16;
      colorMap.colorSpace = THREE.SRGBColorSpace;
    }
  }, [colorMap]);

  useFrame((state, delta) => {
    const mult = getSpeedMultiplier();
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.12 * mult;
  });

  const moonRadius = isMobile ? 1.6 : 2.4;

  return (
    <group position={position}>
      <Sphere ref={moonRef} args={[moonRadius, 96, 96]}>
        <meshStandardMaterial 
          map={colorMap} 
          bumpMap={colorMap} 
          bumpScale={0.35} 
          roughness={0.85} 
          metalness={0.05} 
        />
      </Sphere>
    </group>
  );
};

// Moon Fallback
const MoonFallback = ({ position, isMobile = false }) => {
  const moonRadius = isMobile ? 1.6 : 2.4;
  return (
    <group position={position}>
      <Sphere args={[moonRadius, 32, 32]}>
        <meshStandardMaterial color="#888888" roughness={0.8} />
      </Sphere>
    </group>
  );
};

// Mars Component
const RealisticMars = ({ position, isMobile = false }) => {
  const marsRef = useRef();
  const rockyMap = useTexture('/assets/planets/venus.jpg');

  useEffect(() => {
    if (rockyMap) {
      rockyMap.anisotropy = 16;
      rockyMap.colorSpace = THREE.SRGBColorSpace;
    }
  }, [rockyMap]);

  useFrame((state, delta) => {
    const mult = getSpeedMultiplier();
    if (marsRef.current) marsRef.current.rotation.y -= delta * 0.2 * mult;
  });

  const marsRadius = isMobile ? 2.4 : 3.8;

  return (
    <group position={position} rotation={[-0.3, 0, 0.3]}>
      <Sphere ref={marsRef} args={[marsRadius, 96, 96]}>
        <meshStandardMaterial 
          map={rockyMap} 
          color="#d64c24" 
          bumpMap={rockyMap} 
          bumpScale={0.3} 
          roughness={0.8} 
          metalness={0.1}
        />
      </Sphere>
    </group>
  );
};

// Mars Fallback
const MarsFallback = ({ position, isMobile = false }) => {
  const marsRadius = isMobile ? 2.4 : 3.8;
  return (
    <group position={position}>
      <Sphere args={[marsRadius, 32, 32]}>
        <meshStandardMaterial color="#c2410c" roughness={0.7} />
      </Sphere>
    </group>
  );
};

// Ultra-Detailed GLTF 3D Satellite Model (Bigger, Brighter & Crisper)
const GLTFSatelliteModel = ({ orbitRadius = 7.5, speed = 0.22, yOffset = 1.2, isMobile = false }) => {
  const pivotRef = useRef();
  const satRef = useRef();
  const { scene } = useGLTF('/assets/planets/satellite.glb');

  // Clone scene so it can be instantiated safely
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  useFrame((state, delta) => {
    const mult = getSpeedMultiplier();
    if (pivotRef.current) {
      pivotRef.current.rotation.y += delta * speed * mult;
    }
    if (satRef.current) {
      satRef.current.rotation.z += delta * 0.25 * mult;
      satRef.current.rotation.x += delta * 0.12 * mult;
    }
  });

  const scale = isMobile ? 1.4 : 2.5; // Scaled up to be larger, clearer, and prominent!
  const radius = isMobile ? 4.8 : orbitRadius;

  return (
    <group ref={pivotRef} rotation={[0.3, 0, 0.2]}>
      <group 
        ref={satRef} 
        position={[radius, yOffset, 0]} 
        scale={[scale, scale, scale]}
      >
        {/* Dedicated High-Intensity Lighting Rig for Satellite Specular Highlights */}
        <directionalLight position={[10, 15, 10]} intensity={5.0} color="#ffffff" />
        <pointLight position={[0, 4, 4]} intensity={6.0} color="#ffffff" distance={12} />
        <primitive object={clonedScene} />
      </group>
    </group>
  );
};

// Procedural Fallback Satellite while GLTF loads
const HighResSatelliteFallback = ({ orbitRadius = 7.5, speed = 0.22, yOffset = 1.2, isMobile = false }) => {
  const pivotRef = useRef();
  const satRef = useRef();

  useFrame((state, delta) => {
    const mult = getSpeedMultiplier();
    if (pivotRef.current) {
      pivotRef.current.rotation.y += delta * speed * mult;
    }
    if (satRef.current) {
      satRef.current.rotation.z += delta * 0.3 * mult;
    }
  });

  const scale = isMobile ? 0.7 : 1.2;
  const radius = isMobile ? 4.8 : orbitRadius;

  return (
    <group ref={pivotRef} rotation={[0.35, 0, 0.2]}>
      <group 
        ref={satRef} 
        position={[radius, yOffset, 0]} 
        scale={[scale, scale, scale]}
      >
        <mesh>
          <boxGeometry args={[1.2, 1.2, 1.6]} />
          <meshStandardMaterial color="#e2b857" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[-2.5, 0, 0]}>
          <boxGeometry args={[3.6, 1.0, 0.05]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[2.5, 0, 0]}>
          <boxGeometry args={[3.6, 1.0, 0.05]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
};

// Shooting Star / Comet
const Comet = () => {
  const cometRef = useRef();
  const [active, setActive] = useState(false);
  const progress = useRef(0);

  useEffect(() => {
    const trigger = () => {
      progress.current = 0;
      setActive(true);
    };
    window.addEventListener('make-a-wish', trigger);
    return () => window.removeEventListener('make-a-wish', trigger);
  }, []);

  useFrame((state, delta) => {
    if (active && cometRef.current) {
      progress.current += delta * 0.5;
      if (progress.current > 1) {
        setActive(false);
      } else {
        const start = new THREE.Vector3(120, 80, -180);
        const end = new THREE.Vector3(-120, -50, -30);
        cometRef.current.position.lerpVectors(start, end, progress.current);
      }
    }
  });

  if (!active) return null;

  return (
    <group ref={cometRef}>
      <mesh>
        <sphereGeometry args={[0.8, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// Galaxy Dust Particle System — Uses circular alpha texture to eliminate all square point artifacts
const GalaxyDustCloud = ({ isMobile = false }) => {
  const pointsRef = useRef();
  const circleTexture = useTexture('/assets/planets/circle_05.png');

  const [positions, colors] = useMemo(() => {
    const count = isMobile ? 4000 : 12000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 140 + 8;
      const spinAngle = radius * 0.05;
      const branchAngle = ((i % 4) * Math.PI) / 2 + spinAngle;

      const randomX = (Math.random() - 0.5) * 18;
      const randomY = (Math.random() - 0.5) * 18;
      const randomZ = (Math.random() - 0.5) * 18;

      pos[i * 3] = Math.cos(branchAngle) * radius + randomX;
      pos[i * 3 + 1] = randomY + (Math.random() - 0.5) * (140 - radius) * 0.2;
      pos[i * 3 + 2] = Math.sin(branchAngle) * radius + randomZ - 45;

      const brightness = 0.6 + Math.random() * 0.4;
      col[i * 3] = brightness;
      col[i * 3 + 1] = brightness;
      col[i * 3 + 2] = brightness;
    }
    return [pos, col];
  }, [isMobile]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const mult = getSpeedMultiplier();
      pointsRef.current.rotation.y += delta * 0.015 * mult;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        map={circleTexture}
        size={isMobile ? 0.25 : 0.18}
        vertexColors={true}
        transparent={true}
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
        alphaTest={0.01}
      />
    </points>
  );
};

// Interactive Background Stars System
const InteractiveStars = ({ isMobile = false }) => {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const targetX = (mouse.current.y * Math.PI) / 16;
      const targetY = (mouse.current.x * Math.PI) / 16;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <React.Suspense fallback={null}>
        <GalaxyDustCloud isMobile={isMobile} />
      </React.Suspense>
      <Stars radius={220} depth={90} count={isMobile ? 5000 : 15000} factor={2.5} saturation={0} fade={false} speed={1.5} />
      <Stars radius={110} depth={50} count={isMobile ? 2500 : 8000} factor={1.8} saturation={0} fade={false} speed={1.0} />
    </group>
  );
};

// WebGL Fault-Tolerant Error Boundary
class WebGLErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error) {
    console.warn("SpaceScene WebGL caught error:", error);
  }
  render() {
    if (this.state.hasError) {
      return <div className="fixed inset-0 w-full h-full z-0 bg-transparent pointer-events-none" />;
    }
    return this.props.children;
  }
}

export default function SpaceScene() {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

  // Exact viewport coordinates calibrated for desktop & mobile
  const earthPos = isMobile ? [0, 4.0, -15] : [5.5, 1.5, -18];
  const moonPos = isMobile ? [-2.8, -3.2, -22] : [-6.5, -2.5, -26];
  const marsPos = isMobile ? [2.8, -1.0, -28] : [7.5, -1.5, -34];

  return (
    <WebGLErrorBoundary>
      <div 
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-transparent overflow-hidden touch-none"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
      >
        <Canvas 
          camera={{ position: [0, 0, 0], fov: isMobile ? 65 : 55 }} 
          dpr={[1, isMobile ? 1.25 : 2]} 
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance", precision: isMobile ? "mediump" : "highp" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          {/* High-Contrast Solar Directional & Ambient Lighting */}
          <ambientLight intensity={0.4} />
          <directionalLight position={[160, 100, 70]} intensity={isMobile ? 5.5 : 6.5} color="#ffffff" />
          <directionalLight position={[-160, -70, -100]} intensity={2.0} color="#7799ff" />

          <InteractiveStars isMobile={isMobile} />
          <Comet />

          {/* EARTH & ULTRA-DETAILED 3D SATELLITE MODEL */}
          <group position={earthPos}>
            <React.Suspense fallback={<EarthFallback position={[0, 0, 0]} isMobile={isMobile} />}>
              <DetailedEarth position={[0, 0, 0]} isMobile={isMobile} />
            </React.Suspense>
            
            {/* GLTF 3D Satellite Model with High-Resolution Specular Lighting */}
            <React.Suspense fallback={<HighResSatelliteFallback orbitRadius={isMobile ? 4.8 : 7.5} speed={0.22} yOffset={1.2} isMobile={isMobile} />}>
              <GLTFSatelliteModel orbitRadius={isMobile ? 4.8 : 7.5} speed={0.22} yOffset={1.2} isMobile={isMobile} />
            </React.Suspense>
          </group>

          {/* MOON WITH INDEPENDENT SUSPENSE */}
          <React.Suspense fallback={<MoonFallback position={moonPos} isMobile={isMobile} />}>
            <DetailedMoon position={moonPos} isMobile={isMobile} />
          </React.Suspense>

          {/* MARS WITH INDEPENDENT SUSPENSE */}
          <React.Suspense fallback={<MarsFallback position={marsPos} isMobile={isMobile} />}>
            <RealisticMars position={marsPos} isMobile={isMobile} />
          </React.Suspense>

          <CameraController />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
