import React, { useRef, useEffect, useState } from 'react';
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

      {/* Volumetric Atmosphere Rim Halo */}
      <Sphere args={[radius * 1.05, 64, 64]}>
        <meshStandardMaterial color="#38bdf8" transparent opacity={0.18} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
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

      {/* Martian Dust Atmosphere Rim Halo */}
      <Sphere args={[radius * 1.04, 64, 64]}>
        <meshStandardMaterial color="#f97316" transparent opacity={0.16} blending={THREE.AdditiveBlending} depthWrite={false} side={THREE.BackSide} />
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

const HighResSatellite = ({ orbitRadius, speed, yOffset }) => {
  const pivotRef = useRef();
  const satelliteRef = useRef();
  const beaconRef = useRef();

  useFrame((state, delta) => {
    if (pivotRef.current) pivotRef.current.rotation.y += delta * (speed || 0.4);
    if (satelliteRef.current) satelliteRef.current.rotation.z += delta * 0.2;
    if (beaconRef.current) {
      beaconRef.current.material.opacity = (Math.sin(state.clock.elapsedTime * 6) + 1) / 2;
    }
  });

  return (
    <group ref={pivotRef}>
      <group position={[orbitRadius, yOffset, 0]}>
        <group ref={satelliteRef} scale={0.4} rotation={[0.4, 0.8, 0.2]}>
          
          {/* 1. Main Satellite Bus (Gold Foil Thermal Insulation) */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[1.2, 1.8, 1.2]} />
            <meshStandardMaterial 
              color="#EAB308" 
              metalness={0.9} 
              roughness={0.25} 
            />
          </mesh>

          {/* Core Octagonal Instrumentation Collar */}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.6, 0.6, 0.3, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* 2. High-Gain Parabolic Communications Dish Antenna */}
          <group position={[0, 1.2, 0]} rotation={[-0.5, 0.4, 0]}>
            {/* Dish Boom Arm */}
            <mesh position={[0, 0.3, 0]}>
              <cylinderGeometry args={[0.04, 0.04, 0.6, 8]} />
              <meshStandardMaterial color="#64748B" metalness={0.95} roughness={0.1} />
            </mesh>
            {/* Parabolic Dish (Chrome Silver) */}
            <mesh position={[0, 0.6, 0]} rotation={[Math.PI, 0, 0]}>
              <coneGeometry args={[0.9, 0.35, 32, 1, true]} />
              <meshStandardMaterial color="#F1F5F9" metalness={0.95} roughness={0.15} side={THREE.DoubleSide} />
            </mesh>
            {/* Sub-Reflector Feed Horn */}
            <mesh position={[0, 0.45, 0]}>
              <sphereGeometry args={[0.1, 16, 16]} />
              <meshStandardMaterial color="#38BDF8" metalness={0.8} roughness={0.2} />
            </mesh>
          </group>

          {/* 3. Left Solar Array Wing */}
          <group position={[-2.8, 0, 0]}>
            {/* Solar Panel Connecting Yoke Bar */}
            <mesh position={[1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
              <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Deep Blue Solar Cell Modules */}
            <mesh castShadow>
              <boxGeometry args={[2.8, 1.3, 0.06]} />
              <meshStandardMaterial color="#0A192F" metalness={0.85} roughness={0.15} />
            </mesh>
            {/* Solar Cell Grid Lines / Frame Borders */}
            <mesh position={[0, 0, 0.04]}>
              <planeGeometry args={[2.7, 1.2]} />
              <meshBasicMaterial color="#38BDF8" wireframe opacity={0.35} transparent />
            </mesh>
          </group>

          {/* 4. Right Solar Array Wing */}
          <group position={[2.8, 0, 0]}>
            {/* Solar Panel Connecting Yoke Bar */}
            <mesh position={[-1.5, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.05, 0.05, 1.5, 8]} />
              <meshStandardMaterial color="#475569" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Deep Blue Solar Cell Modules */}
            <mesh castShadow>
              <boxGeometry args={[2.8, 1.3, 0.06]} />
              <meshStandardMaterial color="#0A192F" metalness={0.85} roughness={0.15} />
            </mesh>
            {/* Solar Cell Grid Lines / Frame Borders */}
            <mesh position={[0, 0, 0.04]}>
              <planeGeometry args={[2.7, 1.2]} />
              <meshBasicMaterial color="#38BDF8" wireframe opacity={0.35} transparent />
            </mesh>
          </group>

          {/* 5. Thruster Nozzles & Optical Payload Sensors */}
          <mesh position={[0, -1.0, 0]}>
            <cylinderGeometry args={[0.25, 0.4, 0.4, 16]} />
            <meshStandardMaterial color="#1E293B" metalness={0.9} roughness={0.2} />
          </mesh>

          {/* 6. Active Telemetry Beacon LED */}
          <mesh ref={beaconRef} position={[0, 1.1, 0.6]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshBasicMaterial color="#10B981" transparent opacity={0.9} />
          </mesh>
          <pointLight position={[0, 1.1, 0.6]} color="#10B981" intensity={2} distance={3} />

        </group>
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
          <HighResSatellite orbitRadius={isMobile ? 3.5 : 9} speed={0.4} yOffset={isMobile ? 1.5 : 4} />
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

      // Same Axis Motion: Tilting phone right moves background right, tilting down moves down
      targetRotation.current.y = normGamma * (Math.PI / 18);
      targetRotation.current.x = normBeta * (Math.PI / 18);
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
      groupRef.current.rotation.x += (targetRotation.current.x - groupRef.current.rotation.x) * 0.06;
      groupRef.current.rotation.y += (targetRotation.current.y - groupRef.current.rotation.y) * 0.06;
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
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
  gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(canvas);
})();

const BrightShimmerStars = ({ isMobile }) => {
  const pointsRef = useRef();
  const count = isMobile ? 1000 : 800;

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
        size={isMobile ? 0.45 : 0.75}
        color="#ffffff"
        transparent={true}
        opacity={isMobile ? 0.9 : 0.75}
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
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false, failIfMajorPerformanceCaveat: false }}
          onCreated={({ gl }) => {
            if (gl.domElement) {
              gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                console.warn('SpaceScene WebGL context lost handled smoothly.');
              }, false);
            }
          }}
        >
          {/* Cinematic Solar Lighting Rig */}
          <ambientLight intensity={isMobile ? 0.5 : 0.3} />
          <directionalLight position={[180, 120, 80]} intensity={isMobile ? 6.5 : 6.0} color="#ffffff" castShadow={false} />
          <directionalLight position={[-180, -80, -120]} intensity={2.5} color="#88aaff" />
          
          <InteractiveGyroGroup>
            <Stars 
              radius={100} 
              depth={60} 
              count={isMobile ? 4500 : 6000} 
              factor={isMobile ? 2.5 : 3.0} 
              saturation={0} 
              fade 
              speed={isMobile ? 1.5 : 2} 
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
