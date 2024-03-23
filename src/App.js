import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import Add from './pages/Add';
import Update from './pages/Update';
import Layout from './pages/Layout';
import { Toaster } from 'react-hot-toast';

function App() {
  let routers = createBrowserRouter([
    {
      path: "",
      element: <Layout/>,
      children: [
        {
          index: true,
          element: (
              <Home />
            
          ),
        },
        {
          path: "add",
          element: (
              <Add />
          ),
        },
        
        {
          path: "edit/:id",
          element: (
            
              <Update />
            
          ),
        },
        
      ],
    },
  ]);
  return (
    <>
    
    <Provider store={store}>
    <Toaster />

              <RouterProvider router={routers}></RouterProvider>
    </Provider>

    
    </>
  );
}

export default App;
