/* eslint-disable react/no-unknown-property */
'use client';
import { useEffect, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';

// replace with your own imports, see the usage snippet for details
const cardGLB = "/lanyard/card.glb";
const lanyard = "/lanyard/lanyard.png";

import * as THREE from 'three';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
  return (
    <div className="relative z-0 h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position: position, fov: fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band />
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
function Band({ maxSpeed = 50, minSpeed = 0 }) {
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
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
  const { nodes, materials } = useGLTF(cardGLB);
  const texture = useTexture(lanyard);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);
  const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);

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

  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

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
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/* <group position={[0, 4, 0]}> */}
      <group position={[6, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
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
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isSmall ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-4, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}





// 'use client';
// import { useEffect, useRef, useState } from 'react';
// import { Canvas, extend, useFrame } from '@react-three/fiber';
// import { Html, useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
// import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
// import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
// import * as THREE from 'three';

// extend({ MeshLineGeometry, MeshLineMaterial });

// const cardGLB = "/lanyard/card.glb";
// const lanyard = "/lanyard/lanyard.png";

// export default function Lanyard({ position = [0, 0, 30], gravity = [0, -40, 0], fov = 20, transparent = true }) {
//   return (
//     <div className="relative z-0 h-screen w-full flex justify-center items-center">
//       <Canvas
//         camera={{ position, fov }}
//         gl={{ alpha: transparent }}
//         onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
//       >
//         <ambientLight intensity={Math.PI} />
//         <Physics gravity={gravity} timeStep={1 / 60}>
//           <Band />
//         </Physics>

//         {/* 🧠 Add Text beside the lanyard */}
//         <Html
//           position={[-4, 1.5, 0]} // adjust to move left/right/up/down
//           center
//           className="select-none pointer-events-none"
//         >
//           <div className="text-white text-left font-[Pt_Sans_Narrow] leading-none">
//             <h3 className="text-[1.5em] md:text-[2em]">welcome to my portfolio 🌍</h3>
//             <h1 className="text-[4em] md:text-[6em]">
//               Hi, I AM{' '}
//               <span className="font-bold font-[Bebas_Neue] text-[#FFFFF0]">PRASOON</span>
//             </h1>
//             <h3 className="font-bold opacity-40 text-[1.2em] md:text-[2em]">
//               Developer, Programmer, Problem Solver, Enthusiast
//             </h3>
//             <h3 className="opacity-40 max-w-[400px] md:max-w-[500px]">
//               I am not just a computer guy, I’m the bridge between logic and creativity,
//               shaping ideas into experiences.
//             </h3>
//           </div>
//         </Html>

//         <Environment blur={0.75}>
//           <Lightformer
//             intensity={2}
//             color="white"
//             position={[0, -1, 5]}
//             rotation={[0, 0, Math.PI / 3]}
//             scale={[100, 0.1, 1]}
//           />
//           <Lightformer
//             intensity={10}
//             color="white"
//             position={[-10, 0, 14]}
//             rotation={[0, Math.PI / 2, Math.PI / 3]}
//             scale={[100, 10, 1]}
//           />
//         </Environment>
//       </Canvas>
//     </div>
//   );
// }

// function Band({ maxSpeed = 50, minSpeed = 0 }) {
//   const band = useRef(),
//     fixed = useRef(),
//     j1 = useRef(),
//     j2 = useRef(),
//     j3 = useRef(),
//     card = useRef();
//   const vec = new THREE.Vector3(),
//     ang = new THREE.Vector3(),
//     rot = new THREE.Vector3(),
//     dir = new THREE.Vector3();
//   const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 4, linearDamping: 4 };
//   const { nodes, materials } = useGLTF(cardGLB);
//   const texture = useTexture(lanyard);
//   const [curve] = useState(
//     () =>
//       new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
//   );

//   const [dragged, drag] = useState(false);
//   const [hovered, hover] = useState(false);
//   const [isSmall, setIsSmall] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);

//   useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
//   useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
//   useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
//   useSphericalJoint(j3, card, [
//     [0, 0, 0],
//     [0, 1.5, 0]
//   ]);

//   useEffect(() => {
//     if (hovered) {
//       document.body.style.cursor = dragged ? 'grabbing' : 'grab';
//       return () => void (document.body.style.cursor = 'auto');
//     }
//   }, [hovered, dragged]);

//   useEffect(() => {
//     const handleResize = () => setIsSmall(window.innerWidth < 1024);
//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useFrame((state, delta) => {
//     if (dragged) {
//       vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
//       dir.copy(vec).sub(state.camera.position).normalize();
//       vec.add(dir.multiplyScalar(state.camera.position.length()));
//       [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
//       card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
//     }
//     if (fixed.current) {
//       [j1, j2].forEach(ref => {
//         if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
//         const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
//         ref.current.lerped.lerp(
//           ref.current.translation(),
//           delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
//         );
//       });
//       curve.points[0].copy(j3.current.translation());
//       curve.points[1].copy(j2.current.lerped);
//       curve.points[2].copy(j1.current.lerped);
//       curve.points[3].copy(fixed.current.translation());
//       band.current.geometry.setPoints(curve.getPoints(32));
//       ang.copy(card.current.angvel());
//       rot.copy(card.current.rotation());
//       card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });
//     }
//   });

//   curve.curveType = 'chordal';
//   texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

//   return (
//     <>
//       <group position={[6, 4, 0]}>
//         <RigidBody ref={fixed} {...segmentProps} type="fixed" />
//         <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
//           <BallCollider args={[0.1]} />
//         </RigidBody>
//         <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
//           <CuboidCollider args={[0.8, 1.125, 0.01]} />
//           <group
//             scale={2.25}
//             position={[0, -1.2, -0.05]}
//             onPointerOver={() => hover(true)}
//             onPointerOut={() => hover(false)}
//             onPointerUp={e => (e.target.releasePointerCapture(e.pointerId), drag(false))}
//             onPointerDown={e => (
//               e.target.setPointerCapture(e.pointerId),
//               drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())))
//             )}
//           >
//             <mesh geometry={nodes.card.geometry}>
//               <meshPhysicalMaterial
//                 map={materials.base.map}
//                 map-anisotropy={16}
//                 clearcoat={1}
//                 clearcoatRoughness={0.15}
//                 roughness={0.9}
//                 metalness={0.8}
//               />
//             </mesh>
//             <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
//             <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
//           </group>
//         </RigidBody>
//       </group>

//       <mesh ref={band}>
//         <meshLineGeometry />
//         <meshLineMaterial
//           color="white"
//           depthTest={false}
//           resolution={isSmall ? [1000, 2000] : [1000, 1000]}
//           useMap
//           map={texture}
//           repeat={[-4, 1]}
//           lineWidth={1}
//         />
//       </mesh>
//     </>
//   );
// }
