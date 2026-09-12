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

// Earth Component with Cloud Layer (Top-Left Backdrop Framing)
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
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.15 * mult;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.18 * mult;
  });

  const earthRadius = isMobile ? 3.8 : 5.5;

  return (
    <group position={position} rotation={[0.4, 0, 0.2]}>
      <Sphere ref={earthRef} args={[earthRadius, 96, 96]}>
        <meshStandardMaterial 
          map={colorMap} 
          normalMap={normalMap} 
          normalScale={new THREE.Vector2(2.5, 2.5)}
          roughnessMap={specularMap} 
          roughness={0.3} 
          metalness={0.15}
        />
      </Sphere>

      <Sphere ref={cloudsRef} args={[earthRadius + 0.06, 96, 96]}>
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
  const earthRadius = isMobile ? 3.8 : 5.5;
  return (
    <group position={position}>
      <Sphere args={[earthRadius, 32, 32]}>
        <meshStandardMaterial color="#1e3a8a" roughness={0.4} metalness={0.6} />
      </Sphere>
    </group>
  );
};

// Moon Component (Lower-Right Backdrop Framing)
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
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.1 * mult;
  });

  const moonRadius = isMobile ? 2.0 : 3.2;

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
  const moonRadius = isMobile ? 2.0 : 3.2;
  return (
    <group position={position}>
      <Sphere args={[moonRadius, 32, 32]}>
        <meshStandardMaterial color="#888888" roughness={0.8} />
      </Sphere>
    </group>
  );
};

// Mars Component (Deep Space Top-Right Backdrop)
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
    if (marsRef.current) marsRef.current.rotation.y -= delta * 0.15 * mult;
  });

  const marsRadius = isMobile ? 2.2 : 3.8;

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
  const marsRadius = isMobile ? 2.2 : 3.8;
  return (
    <group position={position}>
      <Sphere args={[marsRadius, 32, 32]}>
        <meshStandardMaterial color="#c2410c" roughness={0.7} />
      </Sphere>
    </group>
  );
};

// Ultra-Detailed GLTF 3D Satellite Model (Orbiting Earth in Top-Left Background)
const GLTFSatelliteModel = ({ orbitRadius = 10, speed = 0.12, yOffset = 4.0, isMobile = false }) => {
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
  });

  const scale = isMobile ? 0.18 : 0.28; // Sleek, perfectly proportioned realistic scale
  const radius = isMobile ? 6.5 : orbitRadius;

  return (
    <group ref={pivotRef} rotation={[0.3, 0, 0.1]}>
      <group 
        ref={satRef} 
        position={[radius, yOffset, 0]} 
        scale={[scale, scale, scale]}
        rotation={[0.5, Math.PI / 2, 0]}
      >
        {/* High-Contrast Solar Specular Lighting Rig */}
        <directionalLight position={[15, 20, 15]} intensity={6.0} color="#ffffff" />
        <pointLight position={[0, 5, 5]} intensity={8.0} color="#ffffff" distance={15} />
        <primitive object={clonedScene} />
      </group>
    </group>
  );
};

// Fallback Satellite
const HighResSatelliteFallback = ({ orbitRadius = 10, speed = 0.12, yOffset = 4.0, isMobile = false }) => {
  const pivotRef = useRef();
  const satRef = useRef();

  useFrame((state, delta) => {
    const mult = getSpeedMultiplier();
    if (pivotRef.current) {
      pivotRef.current.rotation.y += delta * speed * mult;
    }
    if (satRef.current) {
      satRef.current.rotation.z += delta * 0.25 * mult;
    }
  });

  const scale = isMobile ? 0.4 : 0.7;
  const radius = isMobile ? 6.5 : orbitRadius;

  return (
    <group ref={pivotRef} rotation={[0.3, 0, 0.1]}>
      <group 
        ref={satRef} 
        position={[radius, yOffset, 0]} 
        scale={[scale, scale, scale]}
      >
        <mesh>
          <boxGeometry args={[1.4, 1.4, 1.8]} />
          <meshStandardMaterial color="#e2b857" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[-2.8, 0, 0]}>
          <boxGeometry args={[4.0, 1.1, 0.05]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[2.8, 0, 0]}>
          <boxGeometry args={[4.0, 1.1, 0.05]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
    </group>
  );
};

// Pure Silver Shooting Star / Comet
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
      progress.current += delta * 0.4;
      if (progress.current > 1) {
        setActive(false);
      } else {
        const start = new THREE.Vector3(140, 90, -190);
        const end = new THREE.Vector3(-140, -50, -40);
        cometRef.current.position.lerpVectors(start, end, progress.current);
      }
    }
  });

  if (!active) return null;

  return (
    <group ref={cometRef}>
      <mesh>
        <sphereGeometry args={[0.9, 16, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  );
};

// Interactive Pure Monochrome Deep Space Starfield
const InteractiveStars = ({ isMobile = false }) => {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleOrientation = (e) => {
      if (e.beta !== null && e.gamma !== null) {
        mouse.current.x = Math.max(-1, Math.min(1, e.gamma / 25));
        mouse.current.y = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (typeof window !== 'undefined') window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const targetX = (mouse.current.y * Math.PI) / 14;
      const targetY = (mouse.current.x * Math.PI) / 14;
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={180} depth={80} count={isMobile ? 4000 : 10000} factor={3.5} saturation={0} fade speed={1.5} />
      <Stars radius={90} depth={40} count={isMobile ? 2000 : 5000} factor={2.2} saturation={0} fade speed={1.0} />
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
      return <div className="fixed inset-0 w-full h-full z-0 bg-black pointer-events-none" />;
    }
    return this.props.children;
  }
}

export default function SpaceScene() {
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

  // Exact backdrop positions from astrivix-bc1neib7z (Earth top-left, Moon lower-right, Mars deep space top-right)
  const earthPos = isMobile ? [-7.0, 4.5, -28] : [-16.0, 6.5, -34];
  const moonPos = isMobile ? [6.5, -3.5, -48] : [16.5, -3.5, -68];
  const marsPos = isMobile ? [12.0, 11.0, -80] : [34.0, 15.0, -120];

  return (
    <WebGLErrorBoundary>
      <div 
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black overflow-hidden touch-none"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
      >
        <Canvas 
          camera={{ position: [0, 0, 0], fov: isMobile ? 65 : 55 }} 
          dpr={[1, isMobile ? 1.25 : 2]} 
          gl={{ alpha: false, antialias: true, powerPreference: "high-performance", precision: isMobile ? "mediump" : "highp" }}
        >
          {/* High-Contrast Solar Directional & Ambient Lighting */}
          <ambientLight intensity={0.35} />
          <directionalLight position={[180, 120, 80]} intensity={isMobile ? 5.5 : 6.5} color="#ffffff" castShadow={false} />
          <directionalLight position={[-180, -80, -120]} intensity={2.0} color="#7799ff" />

          <InteractiveStars isMobile={isMobile} />
          <Comet />

          {/* EARTH & ULTRA-DETAILED 3D SATELLITE MODEL IN TOP-LEFT BACKGROUND */}
          <group position={earthPos}>
            <React.Suspense fallback={<EarthFallback position={[0, 0, 0]} isMobile={isMobile} />}>
              <DetailedEarth position={[0, 0, 0]} isMobile={isMobile} />
            </React.Suspense>
            
            {/* GLTF 3D Satellite Model Orbiting Earth */}
            <React.Suspense fallback={<HighResSatelliteFallback orbitRadius={isMobile ? 7.0 : 11.0} speed={0.15} yOffset={isMobile ? 3.0 : 4.5} isMobile={isMobile} />}>
              <GLTFSatelliteModel orbitRadius={isMobile ? 7.0 : 11.0} speed={0.15} yOffset={isMobile ? 3.0 : 4.5} isMobile={isMobile} />
            </React.Suspense>
          </group>

          {/* MOON IN LOWER-RIGHT BACKGROUND */}
          <React.Suspense fallback={<MoonFallback position={moonPos} isMobile={isMobile} />}>
            <DetailedMoon position={moonPos} isMobile={isMobile} />
          </React.Suspense>

          {/* MARS IN DEEP SPACE TOP-RIGHT BACKGROUND */}
          <React.Suspense fallback={<MarsFallback position={marsPos} isMobile={isMobile} />}>
            <RealisticMars position={marsPos} isMobile={isMobile} />
          </React.Suspense>

          <CameraController />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
