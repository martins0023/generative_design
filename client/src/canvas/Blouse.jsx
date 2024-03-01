import { Canvas } from '@react-three/fiber'
import  { easing } from 'maath';
import { useSnapshot } from 'valtio';
import { useFrame } from '@react-three/fiber';
import { Stats, OrbitControls, Environment, useGLTF, Decal, useTexture } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useControls } from 'leva'

import state from '../store';

const Models = [
  //{ title: 'Drill', url: '/trousers.glb' },
  { title: 'Shirt', url: '/shirt_baked.glb' },
  { title: 'Women Blouse', url: '/womens_blouse.glb' },
  //{ title: 'land', url: '/womens_piece.glb' },
]

function Model({ url }) {
  const { scene } = useGLTF(url)
  return <primitive object={scene} />
}

export default function App() {
  const snap = useSnapshot(state);

  const { nodes, materials } = Models

  const logoTexture = useTexture(snap.logoDecal);
  const fullTexture = useTexture(snap.fullDecal);

  const { title } = useControls({
    title: {
      options: Models.map(({ title }) => title),
    },
  })
  
  useFrame((state, delta) => easing.dampC(
        materials.lambert1.color, 
        snap.color, 
        0.25, 
        delta
    ));
  const stateString = JSON.stringify(snap);

  return (
    <>
      {/*<Canvas camera={{ position: [-10, 25, 20], fov: 2,  }}>
        <Environment preset="city" />*/}
        <group
            key={stateString}
        >
          <mesh
            castShadow
            geometry={nodes.T_Shirt_male.geometry}
            material={materials.lambert1}
            material-roughness={1}
            dispose={null}
        >
            {snap.isFullTexture && (
                <Decal 
                    position={[0, 0, 0]}
                    rotation={[0, 0, 0]}
                    scale={1}
                    map={fullTexture}
                />
            )}

            {snap.isLogoTexture && (
                <Decal 
                    position={[0, 0.04, 0.15]}
                    rotation={[0, 0, 0]}
                    scale={0.15}
                    map={logoTexture}
                    anisotropy={20}
                    depthTest={false}
                    depthWrite={true}
                />
            )}
          </mesh>
          <Model
            url={Models[Models.findIndex((m) => m.title === title)].url}
          />
        </group>
        <OrbitControls autoRotate />
      {/*</Canvas>
      <span id="info">The {title} is selected.</span>*/}
    </>
  )
}