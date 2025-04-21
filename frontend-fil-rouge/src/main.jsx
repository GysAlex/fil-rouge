import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ModalProvider } from './hooks/useModal.jsx';

createRoot(document.getElementById('root')).render(
  <ModalProvider>
    <StrictMode>
      <App />
    </StrictMode>
  </ModalProvider>

)
