import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Homepage from './Components/Homepage/Homepage.jsx'
import Layout from './MainforApp/Layout/Layout.jsx';
function App() {
  const [count, setCount] = useState(0)
 

  return (

<div className='app'>

<Routes>
<Route path='/' element={<Layout/>} >

<Route index element={<Homepage />} />
{/* <Route path='t' element={<T />} /> */}

</Route>
</Routes>




</div>
  )
}

export default App



