/* eslint-disable */

import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function Fridge() {

    const myMesh = React.useRef();

    useFrame(({clock}) => {
        const t = clock.getElapsedTime();
        myMesh.current.rotation.y = t;
        console.log(t);
    })

    return <mesh ref={myMesh}>
        <boxBufferGeometry attach="geometry" args={[3, 3, 3,]}></boxBufferGeometry>
        <meshBasicMaterial attach="material" color="blue"></meshBasicMaterial>
    </mesh>
}
export default Fridge;