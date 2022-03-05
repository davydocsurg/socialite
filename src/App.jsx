import React, { useState, useEffect, useDispatch, useContext } from "react";
import IRoutes from "./routes/IRoutes";
import { IndexContext } from "./contexts/IndexContext";

function App() {
  const { getUserData } = useContext(IndexContext);
  // const dispatch = useDispatch;

  useEffect(() => {
    getUserData;
  }, [getUserData]);

  return (
    <>
      <IRoutes />
    </>
  );
}

export default App;
