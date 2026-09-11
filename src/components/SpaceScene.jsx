import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, useTexture, useGLTF } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const CameraController = ({ scrollYProgress }) => {
  const targetZ = useRef(0);

  useFrame(({ camera }) => {
    const progress = scrollYProgress.get();
    const servicesEl = typeof document !== 'undefined' ? document.getElementById('services') : null;
    let dampFactor = 1;

    if (servicesEl) {
      const rect = servicesEl.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) {
        dampFactor = 0.02; // 98% slowdown during services section
      }
    }

    // Extended Z range so planets remain visible throughout the whole site scroll
    const nextTargetZ = -progress * 65;
    targetZ.current += (nextTargetZ - targetZ.current) * dampFactor;
    camera.position.z += (targetZ.current - camera.position.z) * 0.06;
  });

  return null;
};

const DetailedEarth = ({ position }) => {
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
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.18;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.22;
  });

  return (
    <group position={position} rotation={[0.4, 0, 0.2]}>
      {/* High-Resolution Earth Core Sphere */}
      <Sphere ref={earthRef} args={[5, 128, 128]}>
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
      <Sphere ref={cloudsRef} args={[5.05, 128, 128]}>
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

const DetailedMoon = ({ position }) => {
  const moonRef = useRef();
  const colorMap = useTexture('/assets/planets/moon.jpg');

  useEffect(() => {
    if (colorMap) {
      colorMap.anisotropy = 16;
      colorMap.colorSpace = THREE.SRGBColorSpace;
    }
  }, [colorMap]);

  useFrame((state, delta) => {
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.12;
  });

  return (
    <group position={position}>
      <Sphere ref={moonRef} args={[2.2, 128, 128]}>
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

const RealisticMars = ({ position }) => {
  const marsRef = useRef();
  const rockyMap = useTexture('/assets/planets/venus.jpg');

  useEffect(() => {
    if (rockyMap) {
      rockyMap.anisotropy = 16;
      rockyMap.colorSpace = THREE.SRGBColorSpace;
    }
  }, [rockyMap]);

  useFrame((state, delta) => {
    if (marsRef.current) marsRef.current.rotation.y -= delta * 0.2;
  });

  return (
    <group position={position} rotation={[-0.3, 0, 0.3]}>
      {/* High-Contrast Martian Topography Core */}
      <Sphere ref={marsRef} args={[4.2, 128, 128]}>
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
  const { scene } = useGLTF('/assets/planets/satellite.glb');

  useFrame((state, delta) => {
    if (pivotRef.current) pivotRef.current.rotation.y += delta * speed;
  });

  return (
    <group ref={pivotRef}>
      <group position={[orbitRadius, yOffset, 0]}>
        <primitive object={scene} scale={0.22} rotation={[0.5, Math.PI / 2, 0]} />
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
        <spriteMaterial map={coreMap} color="#a855f7" blending={THREE.AdditiveBlending} transparent={true} depthWrite={false} opacity={0.8} />
      </sprite>
      <mesh position={[0, 0, 20]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 0.1, 40, 16, 1, true]} />
        <meshBasicMaterial map={cometMap} color="#a855f7" blending={THREE.AdditiveBlending} transparent={true} depthWrite={false} side={THREE.DoubleSide} opacity={0.6} />
      </mesh>
    </group>
  );
};

const Planets = ({ isMobile }) => {
  const earthPos = isMobile ? [-4.5, 2.2, -20] : [-15, 5, -30];
  const moonPos = isMobile ? [5.5, -1.8, -42] : [15, -2, -70];
  const marsPos = isMobile ? [9, 8, -62] : [35, 15, -120];

  return (
    <>
      <Comet />
      <DetailedEarth position={earthPos} />
      <DetailedMoon position={moonPos} />
      <RealisticMars position={marsPos} />
      
      <group position={earthPos}>
        <HighResSatellite orbitRadius={isMobile ? 7 : 12} speed={0.1} yOffset={isMobile ? 3.5 : 6} />
      </group>
    </>
  );
};

const InteractiveStars = () => {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });
  const gyroTarget = useRef({ x: 0, y: 0 });
  const gyroCurrent = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        // Silky smooth tilt mapping
        gyroTarget.current.x = Math.max(-1, Math.min(1, e.gamma / 30));
        gyroTarget.current.y = Math.max(-1, Math.min(1, (e.beta - 40) / 30));
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
      // Exponential lerp dampening for liquid-smooth G-sensor VR window tracking
      gyroCurrent.current.x += (gyroTarget.current.x - gyroCurrent.current.x) * 0.03;
      gyroCurrent.current.y += (gyroTarget.current.y - gyroCurrent.current.y) * 0.03;

      const targetX = (mouse.current.y * Math.PI) / 14 + (gyroCurrent.current.y * Math.PI) / 16;
      const targetY = (mouse.current.x * Math.PI) / 14 + (gyroCurrent.current.x * Math.PI) / 16;
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.03;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <Stars radius={100} depth={50} count={4000} factor={4} saturation={0} fade speed={2} />
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
      return <div className="fixed inset-0 w-full h-full z-0 bg-black pointer-events-none" />;
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
        className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black transition-colors duration-500 overflow-hidden"
        style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
      >
        <Canvas 
          camera={{ position: [0, 0, 0], fov: isMobile ? 65 : 60 }} 
          dpr={[1, isMobile ? 1.5 : 2]} 
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          {/* Cinematic High-Contrast Solar Lighting Rig */}
          <ambientLight intensity={0.35} />
          <directionalLight position={[180, 120, 80]} intensity={isMobile ? 5.5 : 6.0} color="#ffffff" castShadow={false} />
          <directionalLight position={[-180, -80, -120]} intensity={2.2} color="#88aaff" />
          
          <InteractiveStars />
          <React.Suspense fallback={null}>
            <Planets isMobile={isMobile} />
          </React.Suspense>
          <CameraController scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
