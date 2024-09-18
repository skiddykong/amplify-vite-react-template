import "@aws-amplify/ui-react/styles.css";
import TextToImagePage from "./pages/TextToImage/TextToImagePage";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from "./pages/Home/HomePage.tsx";
import AboutPage from "./pages/About/About";
import AccountManagementPage from "./pages/Account/AccountManagementPage";
import SubscriptionPage from "./pages/Billing/SubsPage";
import AmendImageMainFlowPage from "./pages/AmendImageMainFlowPage/AmendImageMainFlowPage.tsx";
// import AmendAnImageWithMaskPage from "./pages/AmendAnImageWithMask/AmendAnImageWithMaskPage.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage/>,
  },
  {
    path: '/about',
    element: <AboutPage/>,
  },
  {
    path: '/account',
    element: <AccountManagementPage/>,
  },
  {
    path: '/billing',
    element: <SubscriptionPage/>,
  },
  // {
  //   path: '/amend_image_with_mask',
  //   element: <AmendAnImageWithMaskPage/>,
  // },
  {
    path: '/text_to_image',
    element: <TextToImagePage/>,
  },
  {
    path: '/amend_image',
    element: <AmendImageMainFlowPage/>,
  }
])

function App() {
  return <>
    <RouterProvider router={router}></RouterProvider>
  </>
}

export default App;
