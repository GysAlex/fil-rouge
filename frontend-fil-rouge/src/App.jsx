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
		path: "/home",
		element: <Home/>
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
		element: <Owner />,
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
				path:"dashboardadmin",
				element: <DashboardAdmin />
			},
			{
				path:"statistiquelogement",
				element: <StatistiqueLogement />
			}
		]
	}
])

function App() {

	return <RouterProvider router={router}>

	</RouterProvider>
}

export default App
