import React from 'react';
import { Amplify } from 'aws-amplify';
import { Authenticator, useAuthenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import awsExports from './aws-exports';
Amplify.configure(awsExports);
import AppRoutes from './routes/AppRoutes';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Dispatches from './components/Dispatches';
// import Home from './components/Home';
// import Login from './components/Login';
// import Navigation from './components/Navigation'
// import Orders from './components/Orders';
// import Products from './components/Products';
// import Users from './components/Users';
// import InventoryItems from './components/InventoryItems';
// import NewDispatch from './components/NewDispatch'; asfdasda 



function App() {

  //function App({user, signOut}) {
  // let component

  // switch (window.location.pathname) {
  //   case "/Home":
  //     component = <Home/>
  //     break;
  //   case "/Orders":
  //     component = <Orders/>
  //     break;
  //   case "/Dispatches":
  //     component = <Dispatches/>
  //     break;
  //   case "/Products":
  //     component = <Products/>
  //     break;
  //   case "/Users":
  //     component = <Users/>
  //     break;
  //   case "/InventoryItems":
  //     component = <InventoryItems/>
  //     break;
  //   case "/NewDispatch":
  //     component = <NewDispatch/>
  //     break;
  // }

  return (
    // <>
    //   <Navigation user={user} signOut={signOut} ></Navigation>
    //   {component}
    // </>
    <>
      <Authenticator.Provider>
            <AppRoutes />
      </Authenticator.Provider>
    </>
  )
}

export default App