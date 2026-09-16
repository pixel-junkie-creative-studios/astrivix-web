import React, { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Sphere, useTexture, useGLTF } from '@react-three/drei';
import { useScroll } from 'framer-motion';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import * as THREE from 'three';

const CameraController = ({ scrollYProgress }) => {
  useFrame(({ camera }) => {
    const progress = scrollYProgress.get();
    // Gentle camera orbit on scroll while keeping planets at constant size
    const targetX = Math.sin(progress * Math.PI * 0.4) * 2;
    const targetY = -progress * 1.5;
    camera.position.x += (targetX - camera.position.x) * 0.05;
    camera.position.y += (targetY - camera.position.y) * 0.05;
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

  useEffect(() => {
    [colorMap, normalMap, specularMap, cloudsMap].forEach(texture => {
      if (texture) {
        texture.anisotropy = 16;
        texture.needsUpdate = true;
      }
    });
  }, [colorMap, normalMap, specularMap, cloudsMap]);

  useFrame((state, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.25;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.35;
  });

  const radius = isMobile ? 2.8 : 4.8;
  const cloudRadius = isMobile ? 2.84 : 4.85;
  const segments = isMobile ? 80 : 96;

  return (
    <group position={position} rotation={[0.3, 0, 0.15]}>
      {/* High-Resolution Earth Core Sphere */}
      <Sphere ref={earthRef} args={[radius, segments, segments]}>
        <meshStandardMaterial 
          map={colorMap} 
          normalMap={normalMap} 
          normalScale={NORMAL_SCALE_EARTH}
          roughnessMap={specularMap} 
          roughness={0.2} 
          metalness={0.25}
        />
      </Sphere>

      {/* Realistic Volumetric Cloud Layer */}
      <Sphere ref={cloudsRef} args={[cloudRadius, segments, segments]}>
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

const DetailedMoon = ({ position, isMobile }) => {
  const moonRef = useRef();
  const colorMap = useTexture('/assets/planets/moon.jpg');

  useEffect(() => {
    if (colorMap) {
      colorMap.anisotropy = 16;
      colorMap.needsUpdate = true;
    }
  }, [colorMap]);

  useFrame((state, delta) => {
    if (moonRef.current) moonRef.current.rotation.y += delta * 0.3;
  });

  const radius = isMobile ? 1.0 : 1.8;
  const segments = isMobile ? 64 : 80;

  return (
    <group position={position}>
      <Sphere ref={moonRef} args={[radius, segments, segments]}>
        <meshStandardMaterial 
          map={colorMap} 
          bumpMap={colorMap} 
          bumpScale={0.45} 
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

  useEffect(() => {
    if (rockyMap) {
      rockyMap.anisotropy = 16;
      rockyMap.needsUpdate = true;
    }
  }, [rockyMap]);

  useFrame((state, delta) => {
    if (marsRef.current) marsRef.current.rotation.y += delta * 0.25;
  });

  const radius = isMobile ? 2.2 : 3.8;
  const segments = isMobile ? 80 : 96;

  return (
    <group position={position} rotation={[-0.2, 0, 0.2]}>
      {/* High-Contrast Martian Topography Core */}
      <Sphere ref={marsRef} args={[radius, segments, segments]}>
        <meshStandardMaterial 
          map={rockyMap} 
          color="#d64c24" 
          bumpMap={rockyMap} 
          bumpScale={0.4} 
          roughness={0.75} 
          metalness={0.15}
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
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.2;
    if (ringRef.current) ringRef.current.rotation.z -= delta * 0.1;
  });

  return (
    <group position={position} rotation={[0.4, 0, -0.2]}>
      <Sphere ref={planetRef} args={[5, 64, 64]}>
        <meshStandardMaterial map={jupiterMap} roughness={1.0} metalness={0.0} />
      </Sphere>
      <Sphere ref={atmosRef} args={[5.25, 32, 32]}>
        <meshStandardMaterial color="#faedcd" transparent opacity={0.15} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
      </Sphere>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[6.2, 11, 128]} />
        <meshStandardMaterial map={ringMap} transparent opacity={0.9} side={THREE.DoubleSide} alphaTest={0.01} />
      </mesh>
    </group>
  );
};

const GLTFSatelliteModel = ({ orbitRadius = 10.5, speed = 0.18, yOffset = 4.0, isMobile = false }) => {
  const pivotRef = useRef();
  const satRef = useRef();
  const { scene } = useGLTF('/assets/planets/satellite.glb');

  // Clone scene so it can be instantiated safely
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.toneMapped = true;
        child.material.needsUpdate = true;
      }
    });
    return clone;
  }, [scene]);

  useFrame((state, delta) => {
    if (pivotRef.current) {
      pivotRef.current.rotation.y += delta * speed;
    }
  });

  const scale = isMobile ? 0.16 : 0.24;
  const radius = isMobile ? 6.5 : orbitRadius;

  return (
    <group ref={pivotRef} rotation={[0.3, 0, 0.1]}>
      <group 
        ref={satRef} 
        position={[radius, yOffset, 0]} 
        scale={[scale, scale, scale]}
        rotation={[0.5, Math.PI / 2, 0]}
      >
        <primitive object={clonedScene} />
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
  const groupRef = useRef();

  // Clean, elegant planet positions framing the mobile screen perfectly without overlapping text
  const earthPos = isMobile ? [-3.2, 7.8, -28] : [-12, 2, -24];
  const moonPos = isMobile ? [-3.8, -3.2, -22] : [-4, -3, -18];
  const marsPos = isMobile ? [3.5, -7.2, -28] : [11, -1, -24];

  return (
    <group ref={groupRef}>
      <Comet />
      <DetailedEarth position={earthPos} isMobile={isMobile} />
      <DetailedMoon position={moonPos} isMobile={isMobile} />
      <RealisticMars position={marsPos} isMobile={isMobile} />
      
      {/* High Quality Satellite orbiting the Earth */}
      <group position={earthPos}>
        <React.Suspense fallback={null}>
          <GLTFSatelliteModel orbitRadius={isMobile ? 6.5 : 10.5} speed={0.18} yOffset={isMobile ? 2.5 : 4.0} isMobile={isMobile} />
        </React.Suspense>
      </group>
    </group>
  );
};

const InteractiveGyroGroup = ({ children }) => {
  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // 1. Mouse movement (Desktop)
    const handleMouseMove = (e) => {
      const mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
      targetRotation.current.x = mouseY * (Math.PI / 24);
      targetRotation.current.y = mouseX * (Math.PI / 24);
    };

    // 2. Mobile Gyroscope Tracking (iOS + Android)
    const handleOrientation = (e) => {
      const gamma = e.gamma ?? 0;
      const beta = e.beta ?? 0;

      // Handle screen orientation (portrait vs landscape)
      const screenAngle = window.screen?.orientation?.angle ?? window.orientation ?? 0;
      let rawGamma = gamma;
      let rawBeta = beta;

      if (screenAngle === 90) {
        const tmp = rawGamma;
        rawGamma = rawBeta;
        rawBeta = -tmp;
      } else if (screenAngle === -90 || screenAngle === 270) {
        const tmp = rawGamma;
        rawGamma = -rawBeta;
        rawBeta = tmp;
      }

      // Normalized tilt relative to natural 45-degree mobile holding angle
      const normGamma = Math.max(-1, Math.min(1, rawGamma / 35));
      const normBeta = Math.max(-1, Math.min(1, (rawBeta - 40) / 35));

      // High-sensitivity Same Axis Motion for mobile: Tilting phone right moves background right, tilting down moves down
      targetRotation.current.y = normGamma * (Math.PI / 8);
      targetRotation.current.x = normBeta * (Math.PI / 8);
    };

    // Request iOS 13+ permission & attach listeners
    const enableGyro = () => {
      if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
          .then(permissionState => {
            if (permissionState === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation, true);
              window.addEventListener('deviceorientationabsolute', handleOrientation, true);
            }
          })
          .catch(() => {});
      } else {
        window.addEventListener('deviceorientation', handleOrientation, true);
        window.addEventListener('deviceorientationabsolute', handleOrientation, true);
      }
    };

    enableGyro();
    window.addEventListener('touchstart', enableGyro, { passive: true });
    window.addEventListener('click', enableGyro, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('deviceorientationabsolute', handleOrientation);
      window.removeEventListener('touchstart', enableGyro);
      window.removeEventListener('click', enableGyro);
    };
  }, []);

  useFrame(() => {
    if (groupRef.current) {
      // Smooth lerp rotation without jumping or glitching
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.08;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.08;
    }
  });

  return <group ref={groupRef}>{children}</group>;
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

const starCircleTexture = (() => {
  if (typeof document === 'undefined') return null;
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.15, 'rgba(255, 255, 255, 0.7)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 32, 32);
  return new THREE.CanvasTexture(canvas);
})();

const BrightShimmerStars = ({ isMobile }) => {
  const pointsRef = useRef();
  const count = isMobile ? 2500 : 1500;

  const [positions] = React.useMemo(() => {
    const posArr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const radius = 25 + Math.random() * 95;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArr[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      posArr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArr[i * 3 + 2] = radius * Math.cos(phi);
    }

    return [posArr];
  }, [count]);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.02;
      pointsRef.current.rotation.x += delta * 0.01;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        map={starCircleTexture}
        size={isMobile ? 0.65 : 0.75}
        color="#ffffff"
        transparent={true}
        opacity={0.85}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation={true}
      />
    </points>
  );
};

export default function SpaceScene() {
  const { scrollYProgress } = useScroll();
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
  const canvasDpr = typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio || 2, 2)] : [1, 2];

  return (
    <WebGLErrorBoundary>
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none bg-black overflow-hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
        <Canvas 
          camera={{ position: [0, 0, 0], fov: isMobile ? 65 : 60 }} 
          dpr={canvasDpr} 
          performance={{ min: 0.5 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false, depth: true, precision: "highp" }}
          onCreated={({ gl }) => {
            if (gl.domElement) {
              gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                console.warn('SpaceScene WebGL context lost handled smoothly.');
              }, false);
            }
          }}
        >
          {/* Balanced Cinematic Space Lighting Rig */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[120, 80, 60]} intensity={1.8} color="#fff5ea" castShadow={false} />
          <directionalLight position={[-120, -60, -80]} intensity={0.6} color="#6688cc" />
          
          <InteractiveGyroGroup>
            <Stars 
              radius={100} 
              depth={60} 
              count={isMobile ? 12000 : 9000} 
              factor={isMobile ? 3.6 : 3.6} 
              saturation={0} 
              fade 
              speed={isMobile ? 2.0 : 2} 
            />
            <BrightShimmerStars isMobile={isMobile} />
          </InteractiveGyroGroup>

          <React.Suspense fallback={null}>
            <Planets isMobile={isMobile} />
          </React.Suspense>
          
          <CameraController scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>
    </WebGLErrorBoundary>
  );
}
