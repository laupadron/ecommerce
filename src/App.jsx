import Home from './pages/Home'
import Loguin from './pages/Loguin'
import ProductsDetails from './pages/ProductsDetails'
import Purchases from './pages/Purchases'
import { HashRouter, Route, Routes } from 'react-router-dom'
import '../src/styles/App.css'
import '../src/styles/Home.css'

import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import './styles/productDetails.css'
import { Container, Navbar } from 'react-bootstrap'

function App() {
 const isLoading=useSelector((state)=>state.isLoading)

  return (
   <HashRouter>
    
    <div className="App">
     {isLoading && <LoadingScreen/>}
    
    <Navbar/>
    <Container className='my-5'>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/product/:id' element={<ProductsDetails/>}/>
      <Route path='/purchases' element={<Purchases/>}/>
      <Route path='/loguin' element={<Loguin/>}/>
     </Routes>
    </Container>
   
    </div>
  </HashRouter>
  )
}

export default App
