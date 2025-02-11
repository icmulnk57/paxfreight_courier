const navigations = [
  { name: "Dashboard", path: "/dashboard/default", icon: "dashboard" },
  {name:"Order", 
    icon:"reorder",
    children:[
      { name: "Create Order", path: "/order/create", iconText: "C" },
      { name: "Draft", path: "/order/draft", iconText: "D" },
      { name: "Manifested", path: "/order/manifested", iconText: "M" },
      { name: "Dispatched", path: "/order/dispatched", iconText: "D" },
      { name: "Received", path: "/order/received", iconText: "R" },
      { name: "Cancelled", path: "/order/cancelled", iconText: "C" },
      {name:"disputes", path:"/order/disputes", iconText:"D"},
    ]
  },
  {
    name: "MultiBox Order", path: "/multibox", icon: "reorder",
    children:[
      {name: "Add MultiBox Order", path:"/multibox", iconText:"C"},
      {name: "Draft", path: "/multibox/draft", iconText: "D" },
      { name: "Manifested", path: "/multibox/manifested", iconText: "M" },
      { name: "Dispatched", path: "/multibox/dispatched", iconText: "D" },
      { name: "Received", path: "/multibox/received", iconText: "R" },
      { name: "Cancelled", path: "/multibox/cancelled", iconText: "C" },
      {name:"disputes", path:"/multibox/disputes", iconText:"D"},
    ]
  },
  { name: "Manifest", path: "/manifest", icon: "content_paste",
    children:[
      {name: "Manifest", path:"/manifest", iconText:"M"}
    ]
   },

   
  { name: "Wallet", path: "/wallet", icon: "account_balance_wallet" },
  { name: "Rate Calculator", path: "/rate-calculator", icon: "calculate" },
  { name: "Bulk", path: "/bulk", icon: "group_work" },
  { name: "Documents", path: "/documents", icon: "folder" },
 
  { name: "Request Heavy Weight", path: "/heavy-weight", icon: "query_builder" },
  { name: "Settings", path: "/settings", icon: "settings" ,
    children:[
      {name: "Profile", path:"/profile", iconText:"P"}
    ]
   },
  // { label: "PAGES", type: "label" },
  

  // {
  //   name: "Session/Auth",
  //   icon: "security",
  //   children: [
  //     { name: "Sign in", iconText: "SI", path: "/session/signin" },
  //     { name: "Sign up", iconText: "SU", path: "/session/signup" },
  //     { name: "Forgot Password", iconText: "FP", path: "/session/forgot-password" },
  //     { name: "Error", iconText: "404", path: "/session/404" }
  //   ]
  // },
  // { label: "Components", type: "label" },
  // {
  //   name: "Components",
  //   icon: "favorite",
  //   badge: { value: "30+", color: "secondary" },
  //   children: [
  //     { name: "Auto Complete", path: "/material/autocomplete", iconText: "A" },
  //     { name: "Buttons", path: "/material/buttons", iconText: "B" },
  //     { name: "Checkbox", path: "/material/checkbox", iconText: "C" },
  //     { name: "Dialog", path: "/material/dialog", iconText: "D" },
  //     { name: "Expansion Panel", path: "/material/expansion-panel", iconText: "E" },
  //     { name: "Form", path: "/material/form", iconText: "F" },
  //     { name: "Icons", path: "/material/icons", iconText: "I" },
  //     { name: "Menu", path: "/material/menu", iconText: "M" },
  //     { name: "Progress", path: "/material/progress", iconText: "P" },
  //     { name: "Radio", path: "/material/radio", iconText: "R" },
  //     { name: "Switch", path: "/material/switch", iconText: "S" },
  //     { name: "Slider", path: "/material/slider", iconText: "S" },
  //     { name: "Snackbar", path: "/material/snackbar", iconText: "S" },
  //     { name: "Table", path: "/material/table", iconText: "T" }
  //   ]
  // },
  // {
  //   name: "Charts",
  //   icon: "trending_up",
  //   children: [{ name: "Echarts", path: "/charts/echarts", iconText: "E" }]
  // },
  // {
  //   name: "Documentation",
  //   icon: "launch",
  //   type: "extLink",
  //   path: "http://demos.ui-lib.com/matx-react-doc/"
  // }
];

export default navigations;
