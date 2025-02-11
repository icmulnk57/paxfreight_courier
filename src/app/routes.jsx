import { lazy } from "react";
import { Navigate } from "react-router-dom";

import AuthGuard from "./auth/AuthGuard";
import { authRoles } from "./auth/authRoles";

import Loadable from "./components/Loadable";
import MatxLayout from "./components/MatxLayout/MatxLayout";
import sessionRoutes from "./views/sessions/session-routes";
import materialRoutes from "app/views/material-kit/MaterialRoutes";
import RechargeWallet from "./views/wallet/RechargeWallet";
import Manifest from "./views/order/manifest";
import Cancelled from "./views/order/Cancelled";
import Disputes from "./views/order/disputes";
import Received from "./views/order/Received";
import Dispatched from "./views/order/dispatch";
import Draft from "./views/order/draft";
import RateCalculator from "./views/rateCalculator/RateCalculator";
import ProfilePage from "./views/accounts/ProfilePage";
import KYCForm from "./views/accounts/kycform";
import KYCModal from "./components/KYCModal";
import RequestHeavyWeight from "./views/heavyWeight/RequestHeavyWeight";
import MultiBoxOrder from "./views/multiOrder/MultiBoxOrder";






// E-CHART PAGE
const AppEchart = Loadable(lazy(() => import("app/views/charts/echarts/AppEchart")));
// DASHBOARD PAGE
const Analytics = Loadable(lazy(() => import("app/views/dashboard/Analytics")));
const CreateOrderForm = Loadable(lazy(() => import("app/views/order/createOrder")));


const routes = [
  { path: "/", element: <Navigate to="dashboard/default" /> },
  {
    element: (
      <AuthGuard authentication >
        <KYCModal />
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...materialRoutes,
      // dashboard route
      { path: "/dashboard/default", element: <Analytics />, auth: authRoles.admin },
      // e-chart route
      { path: "/charts/echarts", element: <AppEchart />, auth: authRoles.editor },
      // create order route
      { path: "/order/create", element:<AuthGuard authentication kycRequired> <CreateOrderForm /> </AuthGuard>, auth: authRoles.editor },

      {path : "/order/draft", element: <Draft/>, auth: authRoles.editor },
      {path:"/order/manifested", element: <Manifest/>, auth: authRoles.editor },
      {path:"/order/dispatched", element: <Dispatched/>, auth: authRoles.editor },
      {path:"/order/received", element: <Received/>, auth: authRoles.editor },
      {path:"/order/cancelled", element: <Cancelled/>, auth: authRoles.editor },
      {path:"/order/disputes", element: <Disputes/>, auth: authRoles.editor },

     

      {path:"/wallet" ,element:<RechargeWallet/> , auth: authRoles.editor },

      {path:"/rate-calculator" ,element:<RateCalculator/> , auth: authRoles.editor },
      {path:"/profile" ,element:<ProfilePage/> , auth: authRoles.editor },
      {path:"/kyc" ,element:<KYCForm/> , auth: authRoles.editor },
      {path:"/heavy-weight" ,element:<RequestHeavyWeight/> , auth: authRoles.editor },
      //multi box order
      
      {path:"/multibox" ,element:<AuthGuard authentication kycRequired> <MultiBoxOrder/> </AuthGuard>, auth: authRoles.editor },

     
      
    ]
  },

 

  // session pages route
  ...sessionRoutes

  //wallet route


 
];


export default routes;
