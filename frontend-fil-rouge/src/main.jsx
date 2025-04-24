import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ModalProvider } from './hooks/useModal.jsx';
import { HandleSibeBarProvider } from './hooks/useSideBar.jsx';
import { AuthContextProvider } from './hooks/useAuth.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';


const clientId = "492694102228-gk7fc1nibd2p3r0f8ihn79i9vmvdilf8.apps.googleusercontent.com"

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={clientId}>
    <AuthContextProvider>
      <HandleSibeBarProvider>
        <ModalProvider>
          <StrictMode>
            <App />
          </StrictMode>
        </ModalProvider>
      </HandleSibeBarProvider>
    </AuthContextProvider>
  </GoogleOAuthProvider>
)
