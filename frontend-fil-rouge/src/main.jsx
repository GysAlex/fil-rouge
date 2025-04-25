import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ModalProvider } from './hooks/useModal.jsx';
import { HandleSibeBarProvider } from './hooks/useSideBar.jsx';
import { AuthContextProvider } from './hooks/useAuth.jsx';
import { HandleUserProvider } from './hooks/useUser.jsx';



createRoot(document.getElementById('root')).render(
    <AuthContextProvider>
      
      <HandleUserProvider>
        <HandleSibeBarProvider>
          <ModalProvider>
            <StrictMode>
              <App />
            </StrictMode>
          </ModalProvider>
        </HandleSibeBarProvider>
      </HandleUserProvider>

    </AuthContextProvider>
)
