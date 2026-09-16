import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, useTexture, useGLTF } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const CameraController = ({ scrollYProgress }) => {
  const targetZ = useRef(0);
  const isServicesActive = useRef(false);

  useEffect(() => {
    const el = document.getElementById('services');
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      isServicesActive.current = entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useFrame(({ camera }) => {
    const progress = scrollYProgress.get();
    const dampFactor = isServicesActive.current ? 0.0005 : 0.005;
    const nextTargetZ = -progress * 4;
    targetZ.current += (nextTargetZ - targetZ.current) * dampFactor;
    camera.position.z += (targetZ.current - camera.position.z) * 0.005;
  });

  return null;
};

const NORMAL_SCALE_EARTH = new THREE.Vector2(3.5, 3.5);

const DetailedEarth = ({ position, isMobile }) => {
  const earthRef = useRef();
  const cloudsRef = useRef();

  const [colorMap, normalMap, specularMap, cloudsMap] = useTexture([
    '/assets/planets/earth.jpg',
    '/assets/planets/earth_normal.jpg',
    '/assets/planets/earth_specular.jpg',
    '/assets/planets/earth_clouds.png'
  ]);

  if (colorMap) {
    colorMap.anisotropy = 16;
    colorMap.generateMipmaps = true;
  }

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.08;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.10;
  });

  const segments = isMobile ? 48 : 64;

  return (
    <group position={position} rotation={[0.4, 0, 0.2]}>
      {/* High-Resolution Earth Core Sphere */}
      <Sphere ref={earthRef} args={[5, segments, segments]}>
        <meshStandardMaterial 
          map={colorMap} 
          normalMap={normalMap} 
          normalScale={NORMAL_SCALE_EARTH}
          roughnessMap={specularMap} 
          roughness={0.25} 
          metalness={0.2}
        />
      </Sphere>

      {/* Realistic Volumetric Cloud Layer */}
      <Sphere ref={cloudsRef} args={[5.05, segments, segments]}>
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

const DetailedMoon = ({ position, isMobile }) => {
  const moonRef = useRef();
  const colorMap = useTexture('/assets/planets/moon.jpg');
  
  // Ensure crisp texture sampling
  if (colorMap) {
    colorMap.anisotropy = 16;
    colorMap.generateMipmaps = true;
  }

  useFrame((state, delta) => {
    // Distinct, clearly perceptible continuous rotation
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.12;
  });

  const segments = isMobile ? 48 : 64;
  const radius = isMobile ? 1.8 : 2.4;

  return (
    <group position={position}>
      <Sphere ref={moonRef} args={[radius, segments, segments]}>
        <meshStandardMaterial 
          map={colorMap} 
          bumpMap={colorMap} 
          bumpScale={0.4} 
          roughness={0.8} 
          metalness={0.05} 
        />
      </Sphere>
    </group>
  );
};

const RealisticMars = ({ position, isMobile }) => {
  const marsRef = useRef();
  const rockyMap = useTexture('/assets/planets/venus.jpg');

  if (rockyMap) {
    rockyMap.anisotropy = 16;
    rockyMap.generateMipmaps = true;
  }

  useFrame((state, delta) => {
    // Distinct, clearly perceptible continuous rotation
    if (marsRef.current) marsRef.current.rotation.y += delta * 0.10;
  });

  const segments = isMobile ? 64 : 96;
  const radius = isMobile ? 3.2 : 4.4;

  return (
    <group position={position} rotation={[-0.3, 0, 0.3]}>
      {/* High-Contrast Martian Topography Core */}
      <Sphere ref={marsRef} args={[radius, segments, segments]}>
        <meshStandardMaterial 
          map={rockyMap} 
          color="#e0562e" 
          bumpMap={rockyMap} 
          bumpScale={0.35} 
          roughness={0.75} 
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
    // Ultra slow rotating gas giant
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.01;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.003;
  });

  return (
    <group position={position} rotation={[0.4, 0, -0.2]}>
      <Sphere ref={planetRef} args={[6, 128, 128]}>
        <meshStandardMaterial map={jupiterMap} roughness={1.0} metalness={0.0} />
      </Sphere>
      {/* Outer Atmospheric Glow */}
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
  const { scene: rawScene } = useGLTF('/assets/planets/satellite.glb');

  const scene = React.useMemo(() => {
    const cloned = rawScene.clone(true);
    cloned.traverse((child) => {
      if (child.isMesh && child.material) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat) => {
          mat.emissive = new THREE.Color(0x000000);
          mat.emissiveIntensity = 0;
          mat.metalness = 0.1;
          mat.roughness = 0.6;
          mat.needsUpdate = true;
        });
      }
    });
    return cloned;
  }, [rawScene]);

  useFrame((state, delta) => {
    if (pivotRef.current) pivotRef.current.rotation.y += delta * speed;
  });

  return (
    <group ref={pivotRef}>
      <group position={[orbitRadius, yOffset, 0]}>
        <primitive object={scene} scale={0.24} rotation={[0.5, Math.PI / 2, 0]} />
      </group>
    </group>
  );
};

const Comet = () => {
  const cometRef = useRef();
  const [active, setActive] = useState(false);
  const progress = useRef(0);

  // Load the real, high-quality particle textures we just downloaded
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
      {/* Genuine Particle Core (Billboarded Sprite) */}
      <sprite scale={[6, 6, 1]}>
        <spriteMaterial map={coreMap} color="#ffffff" blending={THREE.AdditiveBlending} transparent={true} depthWrite={false} />
      </sprite>
      
      {/* Genuine Particle Core Glow (Billboarded Sprite) */}
      <sprite scale={[12, 12, 1]}>
        <spriteMaterial map={coreMap} color="#a855f7" blending={THREE.AdditiveBlending} transparent={true} depthWrite={false} opacity={0.8} />
      </sprite>

      {/* Tapered Volumetric Tail (Perfect 3D shape, strictly behind the core) */}
      <mesh position={[0, 0, 20]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[2.5, 0.1, 40, 16, 1, true]} />
        <meshBasicMaterial map={cometMap} color="#a855f7" blending={THREE.AdditiveBlending} transparent={true} depthWrite={false} side={THREE.DoubleSide} opacity={0.6} />
      </mesh>
    </group>
  );
};

const Planets = ({ isMobile }) => {
  const earthPos = isMobile ? [-5, 3, -25] : [-13, 4, -28];
  const moonPos = isMobile ? [5.5, -2.5, -42] : [14, -2.5, -55];
  const marsPos = isMobile ? [10, 8, -60] : [26, 11, -85];

  return (
    <>
      <Comet />
      <DetailedEarth position={earthPos} isMobile={isMobile} />
      <DetailedMoon position={moonPos} isMobile={isMobile} />
      <RealisticMars position={marsPos} isMobile={isMobile} />
      
      {/* High Quality Satellite orbiting tight and close to Earth */}
      <group position={earthPos}>
        <HighResSatellite orbitRadius={isMobile ? 5.2 : 6.4} speed={0.18} yOffset={isMobile ? 2.0 : 2.6} />
      </group>
    </>
  );
};

const InteractiveStars = () => {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleOrientation = (e) => {
      if (e.gamma !== null && e.beta !== null) {
        mouse.current.x = Math.max(-1, Math.min(1, e.gamma / 25));
        mouse.current.y = Math.max(-1, Math.min(1, (e.beta - 45) / 25));
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation, { passive: true });
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (typeof window !== 'undefined') window.removeEventListener('deviceorientation', handleOrientation);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      const targetX = (mouse.current.y * Math.PI) / 12;
      const targetY = (mouse.current.x * Math.PI) / 12;
      
      groupRef.current.rotation.x += (targetX - groupRef.current.rotation.x) * 0.04;
      groupRef.current.rotation.y += (targetY - groupRef.current.rotation.y) * 0.04;
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
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black overflow-hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Canvas 
          camera={{ position: [0, 0, 0], fov: isMobile ? 70 : 60 }} 
          dpr={isMobile ? [1, 1.5] : [1, 2]} 
          gl={{ antialias: true, powerPreference: "high-performance" }}
        >
          {/* Soft multi-angle lighting — emissive texture provides the colors */}
          <ambientLight intensity={0.25} />
          <directionalLight position={[180, 120, 80]}  intensity={isMobile ? 0.8 : 1.0} color="#ffffff" castShadow={false} />
          <directionalLight position={[-180, -80, -120]} intensity={0.5} color="#88aaff" />
          <directionalLight position={[0, -100, 100]}   intensity={0.3} color="#aaccff" />
          <directionalLight position={[-100, 100, -80]}  intensity={0.25} color="#ffffff" />
          
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

useGLTF.preload('/assets/planets/satellite.glb');
