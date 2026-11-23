import { Routes, Route, Link } from 'react-router-dom'
import Home from './components/Home'
import About from './components/About'
import Projectdetail from './components/Projectdetail'
const App = () => {
  return (
    <>
      <div className="navbar top-3 flex items-center justify-between h-[5vh] w-full fixed left-0 z-[100] px-[3vw]">
        <div className="name">
          <Link to='/'>
            <h3 className='text-[2rem] uppercase font-[500]'> Yash Pratap Singh</h3>
          </Link>
        </div>
        <div className="aboutLink">
          <Link to='/about'>
            <h3 className='text-[2rem] cursor-pointer uppercase font-[500]'>ABOUT</h3>

          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/project/:id" element={<Projectdetail />} />
      </Routes>

      <div className="footer z-[100] relative flex items-center justify-between px-[3vw]] h-[12vh] w-full ">
        <div className="copyright px-[3vw]">
          <h3 className='text-[1.5rem] font-[450] uppercase'>@2026 Yash Pratap Singh</h3>
        </div>
        <div className="contactinfo  flex  items-center justify-between  w-[45%] h-full ">
          <div className="socials flex items-center justify-between flex-col gap-1.5">
            <a className='text-[1.2rem] leading-[0.4] font-[450] ' href=" https://www.instagram.com/thakur__yash_bundela/">Instagram</a>
            <a className='text-[1.2rem]  leading-[0.8] font-[450]' href="https://www.linkedin.com/in/yash-pratap-singh-018a0b32b/">LinkedIn</a>
            <a className='text-[1.2rem] leading-[0.8] font-[450] ' href='https://github.com/Yash-tech63'>Github</a>
          </div>
          <div className="email">
            <h3 className='text-[1.5] font-[450]'>Any Project ? or Collaboration ?</h3>
            <h4 className='text-[1.1] font-[600]'>yashbundela018@gmail.com</h4>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
