import { useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber';
import { useEffect, useMemo, useRef } from 'react'
import * as THREE from 'three'
import fragmentShader from '../shaders/fragment.glsl'
import vertexShader from '../shaders/vertexShader.glsl'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1791395026822-93993d997999?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDE%3D',
  'https://images.unsplash.com/photo-1773401864253-c3bc074b3bc3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  'https://plus.unsplash.com/premium_photo-1793901827889-41b6a8cbf354?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  'https://plus.unsplash.com/premium_photo-1792969262699-4b10bd73d804?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  'https://images.unsplash.com/photo-1789700536818-6a4cd2f0ff1c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
  'https://images.unsplash.com/photo-1788927790265-bc20503d4118?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D',
]
const CARD_H = 1.5;
const CARD_W = 2;
const RADIUS = 3;
const TOTAL_CARDS = IMAGE_URLS.length;
const LERP_RATIO = 0.05;

const Card = ({ texture, index, scrollSpeedRef }) => {
  const angle = (index / TOTAL_CARDS) * 2 * Math.PI;

  const position = useMemo(() => {
    const x = RADIUS * Math.sin(angle);
    const z = RADIUS * Math.cos(angle);

    return [x, 0, z];
  }, [angle]);

  const uniforms = {
    uTexture: { value: texture },
    uScrollSpeed: { value: 0 }
  }
  const materialRef = useRef(null);

  useFrame(() => {
    if (!materialRef.current) return;
    materialRef.current.uniforms.uScrollSpeed.value = scrollSpeedRef.current;
  })
  const navigate = useNavigate();
  const handleClick = (index) => {
    navigate(`/project/${index}`)
  }


  return (
    <mesh onPointerEnter={() => document.body.style.cursor = "pointer"}
      onPointerLeave={() => document.body.style.cursor = 'default'}
      onClick={() => handleClick(index)} position={position} rotation={[0, angle, 0]}>
      <planeGeometry args={[CARD_W, CARD_H, 32, 32]} />
      <shaderMaterial
        ref={materialRef}
        side={THREE.DoubleSide}
        fragmentShader={fragmentShader}
        vertexShader={vertexShader}
        uniforms={uniforms}
      />
    </mesh>
  )
}

const Experience = () => {
  const textures = useTexture(IMAGE_URLS)
  const currentRotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const groupRef = useRef(null)
  const { gl } = useThree();
  const scrollSpeedRef = useRef(0);
  const targetSpeedRef = useRef(0);
  const canvas = gl.domElement;
  const mouseRef = useRef({
    x: 0,
    y: 0
  })
  const targetMouseRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = (event) => {
      event.preventDefault();
      targetRotationRef.current += event.deltaY * 0.003;
      targetSpeedRef.current += event.deltaY * 0.003;
    }

    canvas.addEventListener('wheel', handleScroll, { passive: false })

    return () => {
      canvas.removeEventListener('wheel', handleScroll)
    }
  }, [canvas])
  useEffect(() => {
    window.addEventListener('mousemove', (e) => {
      targetMouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    })
  })
  useGSAP(() => {
    gsap.to(mouseRef.current, {
      x: targetMouseRef.current.x * 0.05,
      y: targetMouseRef.current * 0.05,
      duration: 0.6,
      ease: 'power2.out'
    })
  })

  useFrame(() => {
    if (!groupRef.current) return

    currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * LERP_RATIO;
    groupRef.current.rotation.y = currentRotationRef.current;
    scrollSpeedRef.current += (targetSpeedRef.current - scrollSpeedRef.current) * LERP_RATIO;
    targetSpeedRef.current *= 0.8;
    groupRef.current.rotation.x += (-targetMouseRef.current.x * 0.3 - groupRef.current.rotation.x) * 0.5;
    groupRef.current.rotation.z += (targetMouseRef.current.y * 0.3 - groupRef.current.rotation.z) * 0.3;


  })

  useEffect(() => {
    textures.forEach((texture) => {
      texture.minFilter = THREE.LinearFilter
      texture.magFilter = THREE.LinearFilter
      texture.colorSpace = THREE.SRGBColorSpace
    })
  }, [textures])

  return (
    <>
      <ambientLight intensity={1.2} />
      <group ref={groupRef}>
        {textures.map((texture, idx) => (
          <Card scrollSpeedRef={scrollSpeedRef} key={IMAGE_URLS[idx]} texture={texture} index={idx} />
        ))}
      </group>
    </>
  )
}

export default Experience
