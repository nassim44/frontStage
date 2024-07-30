import "./App.css";

import Footer from "./views/FrontOffice/components/Footer/index.jsx";
import Header from "./views/FrontOffice/components/Header/index.jsx";
import { Providers } from "./providers.jsx";
import RoutesPath from "./routesPath.jsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FournisseurRoutesPath from "./fournisseurRoutesPath.jsx";

function App() {
  const dispatch = useDispatch();
  const [shouldDisplayHeader, setShouldDisplayHeader] = useState(0);
  const userInfo = useSelector((state) => state.userInfo.user);
  useEffect(() => {
    if (userInfo && Array.isArray(userInfo.roles)) {
      const roleSet = new Set(userInfo.roles);
      const targetRole = "ROLE_FOURNISSEUR";
      if (roleSet.has(targetRole)) {
        setShouldDisplayHeader(1);
      } else {
        setShouldDisplayHeader(0);
      }
    }
  }, [userInfo]);
  return (
    <>
      {/*shouldDisplayHeader === 1 && (
        <Providers>
          <Header />
          <FournisseurRoutesPath />
          <Footer />
        </Providers>
      )*/}
        <Providers>
          <Header />
          <RoutesPath />
          <Footer />
        </Providers>
      
    </>
  );
}

export default App;
