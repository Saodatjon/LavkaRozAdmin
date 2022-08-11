import React, {useContext} from "react";
import Header from '././components/Header/Header'
import Main from '././components/Main/Main'
import LoginRoute from "./components/LoginRoute/LoginRoute";
import { UserContext } from "./context/userContext";

function App() {

  const { user } = useContext(UserContext)
  
  return (
    <>
      <Header/>
      {user ? <Main /> :<LoginRoute/>}
    </>
  );
}

export default App;
