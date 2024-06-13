import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { App } from './App.jsx';
import { BidsByNumbers } from './routers/BidsByNumbers.jsx';
import { ShowGraphs } from './routers/ShowGraphs.jsx';
import { ErrorPage } from './routers/ErrorPage.jsx';
import { Home } from './routers/Home.jsx';
import { BidsByDate } from './routers/BidsByDate.jsx';
import { UploadForm } from './routers/UploadForm.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'home',
        element: <Home />,
      },{
        path: 'bidsbynumbers',
        element: <BidsByNumbers />,
      },
      {
        path: 'bidsbydate',
        element: <BidsByDate />,
      },
      {
        path: 'graphics',
        element: <ShowGraphs />,
      },
      {
        path: 'uploadform',
        element: <UploadForm />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
