import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' 
import { BrowserRouter } from 'react-router-dom'

import Application from './Application.tsx'



createRoot(document.getElementById('root')!).render(

  <StrictMode>  
    
    <BrowserRouter>  

       <Application></Application> 
    
    </BrowserRouter> 
    
  </StrictMode>,
)
