import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './tail.css'
import { Main } from './containers/Main'
import { Detail } from './pages/Detail'
import { Resultatrecherche } from './pages/Resultatrecherche'
import { Home } from './pages/Home'
import { Notificationclient } from './pages/Notificationclients'

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
		children: [
			{
				path: "/detail/1",
				element: <Detail/>
			},
			{
				path: "/renter",
				element: <div>This is the renter page</div>
			},

			{
				path: "/owner",
				element: <div>This is the owner page</div>
			},
			{
				path:"/results",
				element: <Resultatrecherche/>
			},
			
		]
	},
	{
		path: "/home",
		element: <Home/>
	},

	{
		path:"/notificationclient",
		element: <Notificationclient/>
	},

	
])

function App() {

	return <RouterProvider router={router}>

	</RouterProvider>
}

export default App;
