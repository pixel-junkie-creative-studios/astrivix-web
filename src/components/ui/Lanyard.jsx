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

import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

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
  canvas.width = 512;
  canvas.height = 768; 
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.fillStyle = '#fff';
  ctx.beginPath();
  ctx.moveTo(256, 240);
  ctx.quadraticCurveTo(256, 320, 336, 320);
  ctx.quadraticCurveTo(256, 320, 256, 400);
  ctx.quadraticCurveTo(256, 320, 176, 320);
  ctx.quadraticCurveTo(256, 320, 256, 240);
  ctx.fill();

  ctx.fillStyle = '#fff';
  ctx.font = '900 65px sans-serif';
  ctx.textAlign = 'center';
  ctx.letterSpacing = '2px';
  ctx.fillText('ASTRIVIX', 256, 520);
  ctx.font = '300 45px sans-serif';
  ctx.fillText('CORP.', 256, 590);
  
  return canvas.toDataURL('image/png');
}

function createAstrivixBack() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 768; 
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 12;
  ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

  ctx.fillStyle = '#fff';
  ctx.font = '900 50px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '2px';
  ctx.fillText('CREATIVE', 256, 320);
  ctx.fillText('MINDS AT', 256, 400);
  ctx.fillText('ASTRIVIX', 256, 480);
  
  return canvas.toDataURL('image/png');
}function createAstrivixBandTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024; 
  canvas.height = 128; 
  const ctx = canvas.getContext('2d');
  
  // Premium Matte Black Fabric Weave Base
  ctx.fillStyle = '#08080a';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Subtle Fabric Border Accents
  ctx.fillStyle = '#22222a';
  ctx.fillRect(0, 0, canvas.width, 4);
  ctx.fillRect(0, 124, canvas.width, 4);
  
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 40px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.letterSpacing = '10px';
  
  // Flip context to counteract MeshLine's reversed UV mapping
  ctx.save();
  ctx.translate(canvas.width, 0);
  ctx.scale(-1, 1);
  ctx.fillText('★   ASTRIVIX   ★', 512, 64);
  ctx.restore();
  
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(1.5, 1);
  return tex;
}

const defaultBackImg = createAstrivixBack();

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  frontImage = '/assets/lanyard-logo.png',
  backImage = defaultBackImg,
  imageFit = 'contain',
  lanyardWidth = 2
}) {
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="lanyard-wrapper">
      <Canvas
        camera={{ position: [0, 0.2, isMobile ? 22 : 18], fov: isMobile ? 20 : 18 }}
        dpr={[1, isMobile ? 1.5 : 2]}
        gl={{ alpha: transparent, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={isMobile ? 1 / 60 : 1 / 120} interpolate={true}>
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
  maxSpeed = 50,
  minSpeed = 0,
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
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 6.0, linearDamping: 6.0, ccd: true };
  const { nodes, materials } = useGLTF(cardGLB);
  
  const bandTexture = useMemo(() => createAstrivixBandTexture(), []);
  
  // useTexture must be called unconditionally; use a blank pixel when an image
  // isn't supplied for a given face, then skip compositing it below.
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite the front/back images into the card's texture atlas (front = left
  // half, back = right half). Each image is drawn aspect-preserving (no stretch).
  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const baseImg = baseMap.image;
    const W = baseImg.width;
    const H = baseImg.height;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;
    // Keep the original baked atlas for the card edges and any untouched face.
    ctx.drawImage(baseImg, 0, 0, W, H);

    // Matte Black Overlay for the front and back faces!
    ctx.fillStyle = '#111111';
    ctx.fillRect(FRONT_UV_RECT.x * W, FRONT_UV_RECT.y * H, FRONT_UV_RECT.w * W, FRONT_UV_RECT.h * H);
    ctx.fillRect(BACK_UV_RECT.x * W, BACK_UV_RECT.y * H, BACK_UV_RECT.w * W, BACK_UV_RECT.h * H);

    const drawFitted = (img, rect) => {
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

    if (frontImage && frontTex.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials.base.map]);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  // Rope joints (0.65 segment distance)
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 0.65]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 0.65]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 0.65]);
  // Anchor j3 EXACTLY at the top metal clip ring of the card (Y = 1.45)
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
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
      // Offset curve endpoint 0.42 units UPWARD so black fabric stops cleanly above metal clip
      curve.points[0].copy(j3.current.translation()).add(new THREE.Vector3(0, 0.42, 0));
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      
      // Automatic smooth continuous Y-axis rotation (spin) so user automatically sees front & back of card
      if (!dragged && card.current) {
        const time = state.clock.getElapsedTime();
        card.current.setAngvel({ 
          x: ang.x, 
          y: Math.sin(time * 0.9) * 1.8, 
          z: ang.z 
        }, true);
      }
    }
  });
  curve.curveType = 'chordal';

  return (
    <>
      <group position={[0, isMobile ? 2.2 : 2.5, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0, -0.65, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0, -1.3, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0, -1.95, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.08]} />
        </RigidBody>
        <RigidBody position={[0, -3.4, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.6, 0.8, 0.01]} />
          <group
            scale={1.35}
            position={[0, 0, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              e.target.setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={cardMap}
                color="#ffffff"
                roughness={0.3}
                metalness={0.5}
                clearcoat={1.0}
                clearcoatRoughness={0.1}
                envMapIntensity={2.5}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry}>
              <meshPhysicalMaterial
                color="#ffffff"
                metalness={0.98}
                roughness={0.05}
                clearcoat={1.0}
                clearcoatRoughness={0.05}
                envMapIntensity={4}
              />
            </mesh>
            <mesh geometry={nodes.clamp.geometry}>
              <meshPhysicalMaterial
                color="#ffffff"
                metalness={0.98}
                roughness={0.05}
                clearcoat={1.0}
                clearcoatRoughness={0.05}
                envMapIntensity={4}
              />
            </mesh>
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={true}
          depthWrite={true}
          transparent={true}
          resolution={[width, height]}
          useMap={1}
          map={bandTexture}
          lineWidth={lanyardWidth * 0.85}
        />
      </mesh>
    </>
  );
}
