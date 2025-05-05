import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './tail.css'
import { Main } from './containers/Main'
import { Detail } from './pages/Detail'
import { Home } from './pages/Home'
import { Renter } from './containers/Renter'
import { Profile } from './pages/renter/Proflle'
import { Owner } from './containers/Owner'
import { NewHome } from './pages/owner/NewHome'
import { NotificationClient } from './pages/renter/NotificationClient'
import { Favoris } from './pages/renter/Favoris'
import { DashboardAdmin } from './pages/owner/DashboardAdmin'
import { StatistiqueLogement } from './pages/owner/StatistiqueLogement'
import { DashboardProvider } from './hooks/useDashboard'
import VerificationPage from './pages/VerificationPage'
import { OwnerRegister } from './pages/OwnerRegister'
import { OwnerProvider } from './hooks/useOwner'
import { EditProperty } from './pages/owner/EditProperty'
import { PropertyDetails } from './pages/owner/PropertyDetails'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/detail/1",
				element: <Detail/>
			},

		]
	},

	{
		path: "/confirmer",
		element: <VerificationPage />
	}, 
	
	{
		path: "/owner/register",
		element: <OwnerProvider> <OwnerRegister/>  </OwnerProvider>
	},

	{
		path: "/home",
		element:<OwnerProvider>  <Home/>  </OwnerProvider>
	},

	{
		path: "/renter",
		element: <Renter />,
		children:[
			{
				path:"profile",
				element: <Profile />
			},

			{
				path:"notificationclient",
				element: <NotificationClient />
			},
			{
				path:"favoris",
				element: <Favoris />
			},
			
		]
	},
	{
		path: "/owner",
		element: <DashboardProvider> <Owner /> </DashboardProvider> ,
		children:[
			{
				path:"profile",
				element: <Profile />
			},
			
			{
				path:"new-home",
				element: <NewHome />
			},

			{
				path:"dashboard",
				element: <DashboardAdmin />
			},
			{
				path:"edit-property/:id",
				element: <EditProperty />
			},
			{
				path:"statistiquelogement",
				element: <StatistiqueLogement />
			},
			{
				path: "detail-property/:id",
				element: <PropertyDetails />
			}
		]
	}
])

function App() {

	return <RouterProvider router={router}>

	</RouterProvider>
}

export default App
