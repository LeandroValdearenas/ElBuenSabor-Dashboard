import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { AtributosContextProvider } from './context/AtributosContext'
import NavBar from './componentes/navbar/NavBar'
import Sidebar from './componentes/sidebar/Sidebar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Insumos from './screens/insumos/Insumos'
import Manufacturados from './screens/manufacturados/Manufacturados'
import Empleados from './screens/empleados/Empleados'
import Clientes from './screens/clientes/Clientes'
import Categorias from './screens/categorias/Categorias'
import Promociones from './screens/promociones/Promociones'
import Empresas from './screens/empresas/Empresas'
import Sucursales from './screens/sucursales/Sucursales'

ReactDOM.createRoot(document.getElementById('root')!).render(

  <React.StrictMode>
  <AtributosContextProvider>
    <BrowserRouter>
    <Sidebar />
    <div className="h-100 w-100 flex-grow-1 "  >
          <NavBar/>
          <div className='content'>
          <Routes>
            <Route index element={<Insumos />} />
            <Route path="/insumos" element={<Insumos />} />
            <Route path="/manufacturados" element={<Manufacturados />} />
            <Route path="/empleados" element={<Empleados />} />
            <Route path="/clientes" element={<Clientes />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/promociones" element={<Promociones />} />
            <Route path="/empresas" element={<Empresas />} />
            <Route path="/sucursales" element={<Sucursales />} />
            <Route path="*" element={<Insumos />} />
          </Routes>
          </div>
    </div>
    </BrowserRouter>
    </AtributosContextProvider>
  </React.StrictMode>,
)
