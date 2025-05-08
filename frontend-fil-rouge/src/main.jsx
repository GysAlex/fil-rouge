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
import { LocationInfoProvider } from './hooks/useLocation.jsx';
import { TagsProvider } from './hooks/useTags.jsx';
import { AssetProvider } from './hooks/useAsset.jsx';
import { PropertyProvider } from './hooks/useProperty.jsx';
import { FilterProvider } from './hooks/useFilter.jsx';



createRoot(document.getElementById('root')).render(

  <LocationInfoProvider>
    <PropertyProvider>

    <FilterProvider>

      <AssetProvider>
        <TagsProvider>
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
        </TagsProvider>
      </AssetProvider>

      </FilterProvider>

    </PropertyProvider>
  </LocationInfoProvider>
)
