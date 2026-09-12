import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, useTexture, useGLTF } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const CameraController = ({ scrollYProgress }) => {
  const targetZ = useRef(0);

  useFrame(({ camera }) => {
    if (typeof document === 'undefined') return;

    const getElementProgress = (id) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      const totalH = rect.height || windowH;
      const p = (windowH - rect.top) / (totalH + windowH);
      return Math.max(0, Math.min(1, p));
    };

    const homeP = getElementProgress('home');
    const servicesP = getElementProgress('services');
    const aboutP = getElementProgress('about');
    const careersP = getElementProgress('careers');
    const contactP = getElementProgress('contact');

    // Camera Z Depth Profile:
    // Home: 0 to -15 (Normal space scroll)
    // Services: -15 to -15.2 (DRASTICALLY SLOW / 0.2 unit drift over 27000px pin)
    // About: -15.2 to -30 (Normal space scroll)
    // Careers: -30 to -40 (Normal space scroll)
    // Contact: -40 to -55 (Normal space scroll)
    const calcZ = -(homeP * 15) - (servicesP * 0.2) - (aboutP * 15) - (careersP * 10) - (contactP * 15);

    targetZ.current = calcZ;
    camera.position.z += (targetZ.current - camera.position.z) * 0.08;
  });

  return null;
};

// Helper function to get global Services section slowdown factor (10x slower during Services)
const getSpeedMultiplier = () => {
  if (typeof document === 'undefined') return 1.0;
  const el = document.getElementById('services');
  if (!el) return 1.0;
  const rect = el.getBoundingClientRect();
  const windowH = window.innerHeight;
  const inServices = rect.top < windowH && rect.bottom > 0;
  return inServices ? 0.08 : 1.0; // Drastically slow down (8% speed) in Services, 100% in other sections
};

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

  const earthRadius = isMobile ? 3.2 : 5;

  return (
    <group position={position} rotation={[0.4, 0, 0.2]}>
      {/* High-Resolution Earth Core Sphere */}
      <Sphere ref={earthRef} args={[earthRadius, 128, 128]}>
        <meshStandardMaterial 
          map={colorMap} 
          normalMap={normalMap} 
          normalScale={new THREE.Vector2(3.5, 3.5)}
          roughnessMap={specularMap} 
          roughness={0.25} 
          metalness={0.2}
        />
      </Sphere>

      {/* Realistic Volumetric Cloud Layer */}
      <Sphere ref={cloudsRef} args={[earthRadius + 0.04, 128, 128]}>
        <meshStandardMaterial 
          map={cloudsMap} 
          transparent={true} 
          opacity={0.82} 
          depthWrite={false} 
          roughness={0.9}
        />
      </Sphere>
    </group>
  );
};

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

  const moonRadius = isMobile ? 1.6 : 2.2;

  return (
    <group position={position}>
      <Sphere ref={moonRef} args={[moonRadius, 128, 128]}>
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

  const marsRadius = isMobile ? 2.6 : 4.2;

  return (
    <group position={position} rotation={[-0.3, 0, 0.3]}>
      {/* High-Contrast Martian Topography Core */}
      <Sphere ref={marsRef} args={[marsRadius, 128, 128]}>
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

const RealisticJupiterRinged = ({ position }) => {
  const planetRef = useRef();
  const ringRef = useRef();
  const atmosRef = useRef();
  
  const jupiterMap = useTexture('/assets/planets/jupiter.jpg');
  const ringMap = useTexture('/assets/planets/saturn_ring.png');

  useFrame((state, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.25;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.1;
  });

  return (
    <group position={position} rotation={[0.4, 0, -0.2]}>
      <Sphere ref={planetRef} args={[6, 128, 128]}>
        <meshStandardMaterial map={jupiterMap} roughness={1.0} metalness={0.0} />
      </Sphere>
      <Sphere ref={atmosRef} args={[6.35, 64, 64]}>
        <meshStandardMaterial color="#faedcd" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </Sphere>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[7.5, 14, 256]} />
        <meshStandardMaterial map={ringMap} transparent opacity={0.9} side={THREE.DoubleSide} alphaTest={0.01} />
      </mesh>
    </group>
  );
};

const HighResSatellite = ({ orbitRadius, speed, yOffset }) => {
  const pivotRef = useRef();

  useFrame((state, delta) => {
    const mult = getSpeedMultiplier();
    if (pivotRef.current) pivotRef.current.rotation.y += delta * speed * mult;
  });

  return (
    <group ref={pivotRef}>
      <group position={[orbitRadius, yOffset, 0]} rotation={[0.4, 0.8, 0]}>
        {/* Central Metallic Satellite Body */}
        <mesh>
          <boxGeometry args={[0.3, 0.3, 0.4]} />
          <meshStandardMaterial color="#dddddd" metalness={0.9} roughness={0.1} />
        </mesh>
        {/* Solar Panel Left */}
        <mesh position={[-0.45, 0, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Solar Panel Right */}
        <mesh position={[0.45, 0, 0]}>
          <boxGeometry args={[0.6, 0.2, 0.02]} />
          <meshStandardMaterial color="#1e3a8a" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Dish Antenna */}
        <mesh position={[0, 0, 0.25]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.15, 0.1, 16, 1, true]} />
          <meshStandardMaterial color="#ffffff" metalness={0.9} roughness={0.1} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

const Comet = () => {
  const cometRef = useRef();
  const [active, setActive] = useState(false);
  const progress = useRef(0);

  const [cometMap, coreMap] = useTexture([
    '/assets/planets/trace_01.png',
    '/assets/planets/circle_05.png'
  ]);

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
        const start = new THREE.Vector3(150, 100, -200);
        const end = new THREE.Vector3(-150, -60, -50);
        cometRef.current.position.lerpVectors(start, end, progress.current);
        cometRef.current.lookAt(end);
      }
    }
  });

  if (!active) return null;

  return (
    <group ref={cometRef}>
      <sprite scale={[6, 6, 1]}>
        <spriteMaterial map={coreMap} color="#ffffff" blending={THREE.AdditiveBlending} transparent={true} depthWrite={false} />
      </sprite>
      <sprite scale={[12, 12, 1]}>
        <spriteMaterial map={coreMap} color="#ffffff" blending={THREE.AdditiveBlending} transparent={true} depthWrite={false} opacity={0.8} />
      </sprite>
      <mesh position={[0, 0, 20]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 0.1, 40, 16, 1, true]} />
        <meshBasicMaterial map={cometMap} color="#ffffff" blending={THREE.AdditiveBlending} transparent={true} depthWrite={false} side={THREE.DoubleSide} opacity={0.6} />
      </mesh>
    </group>
  );
};

const Planets = ({ isMobile }) => {
  const earthPos = isMobile ? [-3.2, 4.0, -18] : [7.2, 3.0, -22];
  const moonPos = isMobile ? [3.8, -3.2, -26] : [-11, -4.2, -32];
  const marsPos = isMobile ? [4.5, 4.5, -40] : [12, 6.5, -48];

  return (
    <>
      <Comet />
      <DetailedEarth position={earthPos} isMobile={isMobile} />
      <DetailedMoon position={moonPos} isMobile={isMobile} />
      <RealisticMars position={marsPos} isMobile={isMobile} />
      
      <group position={earthPos}>
        <HighResSatellite orbitRadius={isMobile ? 4.5 : 8} speed={0.12} yOffset={isMobile ? 2.0 : 4} />
      </group>
    </>
  );
};

const GalaxyDustCloud = ({ isMobile = false }) => {
  const pointsRef = useRef();
  
  const [positions, colors] = useMemo(() => {
    const count = isMobile ? 6000 : 20000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 160 + 10;
      const spinAngle = radius * 0.06;
      const branchAngle = ((i % 4) * Math.PI) / 2 + spinAngle;
      
      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;
      const randomZ = (Math.random() - 0.5) * 20;
      
      pos[i * 3] = Math.cos(branchAngle) * radius + randomX;
      pos[i * 3 + 1] = randomY + (Math.random() - 0.5) * (160 - radius) * 0.25;
      pos[i * 3 + 2] = Math.sin(branchAngle) * radius + randomZ - 50;
      
      const brightness = 0.75 + Math.random() * 0.25;
      col[i * 3] = brightness;
      col[i * 3 + 1] = brightness;
      col[i * 3 + 2] = brightness;
    }
    return [pos, col];
  }, [isMobile]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      const mult = getSpeedMultiplier();
      pointsRef.current.rotation.y += delta * 0.02 * mult;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={isMobile ? 0.4 : 0.3}
        vertexColors={true}
        transparent={true}
        opacity={0.88}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};

const InteractiveStars = ({ isMobile = false }) => {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const gyroTarget = useRef({ x: 0, y: 0, z: 0 });
  const gyroCurrent = useRef({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleOrientation = (e) => {
      if (e.beta !== null && e.gamma !== null) {
        const pitch = (e.beta * Math.PI) / 180;
        const roll = (e.gamma * Math.PI) / 180;
        const yaw = e.alpha !== null ? (e.alpha * Math.PI) / 180 : 0;

        gyroTarget.current.x = -Math.sin(pitch * 0.5);
        gyroTarget.current.y = -Math.sin(roll * 0.5);
        gyroTarget.current.z = -Math.sin(yaw * 0.4);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      if (typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        window.DeviceOrientationEvent.requestPermission().then(res => {
          if (res === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        }).catch(() => {});
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (typeof window !== 'undefined') window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      gyroCurrent.current.x += (gyroTarget.current.x - gyroCurrent.current.x) * 0.05;
      gyroCurrent.current.y += (gyroTarget.current.y - gyroCurrent.current.y) * 0.05;
      gyroCurrent.current.z += (gyroTarget.current.z - gyroCurrent.current.z) * 0.05;

      const targetX = (mouse.current.y * Math.PI) / 14 + gyroCurrent.current.x * 0.9;
      const targetY = (mouse.current.x * Math.PI) / 14 + gyroCurrent.current.y * 0.9;
      const targetZ = gyroCurrent.current.z * 0.6;
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.05;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.z += (targetZ - groupRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <GalaxyDustCloud isMobile={isMobile} />
      <Stars radius={250} depth={100} count={isMobile ? 8000 : 25000} factor={3.5} saturation={0} fade={false} speed={2.0} />
      <Stars radius={120} depth={60} count={isMobile ? 4000 : 12000} factor={2.5} saturation={0} fade={false} speed={1.5} />
    </group>
  );
};

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
  const { scrollYProgress } = useScroll();
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);

  return (
    <WebGLErrorBoundary>
      <div 
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-transparent overflow-hidden touch-none"
        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh' }}
      >
        <Canvas 
          camera={{ position: [0, 0, 0], fov: isMobile ? 65 : 60 }} 
          dpr={[1, isMobile ? 1.25 : 2]} 
          gl={{ alpha: true, antialias: true, powerPreference: "high-performance", precision: isMobile ? "mediump" : "highp" }}
          onCreated={({ gl }) => {
            gl.setClearColor(0x000000, 0);
          }}
        >
          {/* Cinematic High-Contrast Solar Lighting Rig */}
          <ambientLight intensity={0.35} />
          <directionalLight position={[180, 120, 80]} intensity={isMobile ? 5.5 : 6.0} color="#ffffff" castShadow={false} />
          <directionalLight position={[-180, -80, -120]} intensity={2.2} color="#88aaff" />
          
          <InteractiveStars isMobile={isMobile} />
          <React.Suspense fallback={null}>
            <Planets isMobile={isMobile} />
          </React.Suspense>
          <CameraController scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
