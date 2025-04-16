import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './tail.css'
import { Main } from './containers/Main'
import { Detail } from './pages/Detail'

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
		]
	}
])

function App() {

	return <RouterProvider router={router}>

	</RouterProvider>
}

export default App
