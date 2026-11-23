import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

const Three = () => {
  return (
    <div className='fixed top-0 pointer-events-none left-0 z-[60] h-screen w-full'>
      <Canvas>
        <Experience />
      </Canvas>
    </div>
  )
}

export default Three
