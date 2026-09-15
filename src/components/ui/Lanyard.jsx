/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details
import cardGLB from '../../assets/lanyard/card.glb';
import lanyard from '../../assets/lanyard/lanyard.png';
import astrivixLogoFront from '../../assets/lanyard/astrivix_logo_actual.jpg';

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });
try {
  useGLTF.preload(cardGLB);
} catch (e) {}

// 1x1 transparent pixel — lets useTexture be called unconditionally when a
// front/back image isn't supplied.
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

// The card model's front face is UV-mapped to the LEFT half of the texture
// atlas and the back face to the RIGHT half (measured from card.glb). Each
// custom image is composited into its own half so the two faces render
// independently, aspect-preserving (no stretching).
const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

function createAstrivixCard() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 3072; 
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#08080a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 24;
  ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 210px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('A S T R I V I X', 1024, 1350);

  ctx.fillStyle = 'rgba(255,255,255,0.75)';
  ctx.font = '500 140px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.fillText('C O R P .', 1024, 1680);
  
  return canvas.toDataURL('image/png');
}

function createAstrivixBack() {
  const canvas = document.createElement('canvas');
  canvas.width = 2048;
  canvas.height = 3072; 
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#08080a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 24;
  ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 160px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('C R E A T I V E', 1024, 1200);
  ctx.fillText('M I N D S   @', 1024, 1500);
  ctx.fillText('A S T R I V I X', 1024, 1800);
  
  return canvas.toDataURL('image/png');
}

function createAstrivixBandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 4096; 
  canvas.height = 256; 
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#050508';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 68px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  
  // Flip context to counteract the MeshLine's reversed UV mapping
  ctx.save();
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  const text = 'A S T R I V I X   C O R P .          A S T R I V I X   C O R P .          A S T R I V I X   C O R P .          A S T R I V I X   C O R P .';
  ctx.fillText(text, 2048, 128);
  ctx.restore();
  
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 1);
  tex.anisotropy = 16;
  tex.generateMipmaps = true;
  tex.minFilter = THREE.LinearMipmapLinearFilter;
  tex.magFilter = THREE.LinearFilter;
  return tex;
}

const defaultFrontImg = astrivixLogoFront;
const defaultBackImg = createAstrivixBack();

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -90, 0],
  fov = 20,
  transparent = true,
  frontImage = defaultFrontImg,
  backImage = defaultBackImg,
  imageFit = 'contain',
  lanyardWidth = 2
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  const [isVisible, setIsVisible] = useState(true);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    observer.observe(wrapper);
    return () => observer.disconnect();
  }, []);

  const dpr = typeof window !== 'undefined' ? [1, Math.min(window.devicePixelRatio || 2, 2)] : [1, 2];

  return (
    <div ref={wrapperRef} className="lanyard-wrapper">
      <Canvas
        camera={{ position: [0, 0, isMobile ? 36 : 28], fov: isMobile ? 26 : fov }}
        dpr={dpr}
        gl={{ alpha: transparent, antialias: true, powerPreference: "high-performance", precision: "highp" }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
          <ambientLight intensity={Math.PI} />
          <Physics gravity={gravity} timeStep={1 / 120} interpolate={true}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardWidth={lanyardWidth}
            />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
    </div>
  );
}

function Band({
  maxSpeed = 80,
  minSpeed = 10,
  isMobile = false,
  frontImage = null,
  backImage = null,
  imageFit = 'contain',
  lanyardWidth = 2
}) {
  const band = useRef(),
    fixed = useRef(),
    j1 = useRef(),
    j2 = useRef(),
    j3 = useRef(),
    card = useRef();
  const vec = new THREE.Vector3(),
    ang = new THREE.Vector3(),
    rot = new THREE.Vector3(),
    dir = new THREE.Vector3();
  const { width, height } = useThree((state) => state.size);
  const segmentProps = { type: 'dynamic', canSleep: false, colliders: false, angularDamping: 1.5, linearDamping: 1.5, ccd: true };
  const { nodes, materials } = useGLTF(cardGLB);
  
  const bandTexture = useMemo(() => createAstrivixBandTexture(), []);
  
  const defaultFront = useMemo(() => createAstrivixCard(), []);
  const defaultBack = useMemo(() => createAstrivixBack(), []);
  const actualFront = frontImage || defaultFront;
  const actualBack = backImage || defaultBack;

  const frontTex = useTexture(actualFront);
  const backTex = useTexture(actualBack);

  const cardMap = useMemo(() => {
    const baseMap = materials?.base?.map;
    const W = 2048;
    const H = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap || null;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Base background fallback: always dark obsidian #08080a
    ctx.fillStyle = '#08080a';
    ctx.fillRect(0, 0, W, H);

    const baseImg = baseMap?.image;
    if (baseImg && baseImg.width) {
      try {
        ctx.drawImage(baseImg, 0, 0, W, H);
      } catch (e) {}
    }

    ctx.fillStyle = '#08080a';
    ctx.fillRect(FRONT_UV_RECT.x * W, FRONT_UV_RECT.y * H, FRONT_UV_RECT.w * W, FRONT_UV_RECT.h * H);
    ctx.fillRect(BACK_UV_RECT.x * W, BACK_UV_RECT.y * H, BACK_UV_RECT.w * W, BACK_UV_RECT.h * H);

    const drawFitted = (img, rect) => {
      if (!img || !img.width) return;
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontTex && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backTex && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = false;
    composite.anisotropy = 16;
    composite.minFilter = THREE.LinearFilter;
    composite.magFilter = THREE.LinearFilter;
    composite.needsUpdate = true;
    return composite;
  }, [actualFront, actualBack, imageFit, frontTex, backTex, frontTex?.image, backTex?.image, materials?.base?.map, materials?.base?.map?.image]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.5, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        const alpha = delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed));
        ref.current.lerped.lerp(
          ref.current.translation(),
          Math.min(1, alpha)
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 24 : 48));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
      
      if (!dragged && card.current) {
        const time = state.clock.getElapsedTime();
        card.current.applyImpulse({ 
          x: Math.sin(time * 1.2) * 0.012, 
          y: 0, 
          z: Math.cos(time * 0.8) * 0.006 
        }, true);
      }
    }
  });
  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, isMobile ? 2.6 : 3.6, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -0.4, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -0.8, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -1.2, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[0, -1.6, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshStandardMaterial
                map={cardMap}
                color="#ffffff"
                roughness={0.25}
                metalness={0.1}
                envMapIntensity={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.2} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap={1}
          map={bandTexture}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}
