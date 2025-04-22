import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './tail.css'
import { Main } from './containers/Main'
import { Detail } from './pages/Detail'
import { Home } from './pages/Home'
import { Renter } from './containers/Renter'
import { Profile } from './pages/renter/Proflle'

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
				path: "/owner",
				element: <div>This is the owner page</div>
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
			}
		]
	}
])

function App() {

	return <RouterProvider router={router}>

	</RouterProvider>
}

export default App
