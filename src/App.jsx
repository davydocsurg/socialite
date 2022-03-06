import React, { useState, useEffect, useDispatch, useContext } from "react";
import IRoutes from "./routes/IRoutes";
import { IndexContext, IndexContextProvider } from "./contexts/IndexContext";
import { AuthContext, AuthContextProvider } from "./contexts/AuthContext";

function App() {
  // const { getUserData } = useContext(IndexContext);
  // const dispatch = useDispatch;

  // useEffect(() => {
  //   getUserData;
  // }, [getUserData]);

  return (
    <>
      <IndexContextProvider>
        <AuthContextProvider>
          <IRoutes />
        </AuthContextProvider>
      </IndexContextProvider>
    </>
  );
}

export default App;
