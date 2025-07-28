import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import Timer from './components/timer.jsx'
import PreFooter from './components/preFooter.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-main-container '>
        <div className='vw-100 text-white bg-custom'>
          <Timer />
        </div>
      </div>
      <PreFooter />
    </>
  )
}

export default App
