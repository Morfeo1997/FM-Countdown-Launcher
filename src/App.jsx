import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='bg-primary text-white p-5'  >
        Hola Mundo
      {/* style="background: url('imagen.jpg') center/cover no-repeat; */}
      </div>
    </>
  )
}

export default App
