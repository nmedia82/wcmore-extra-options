import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import meta from "./data/meta.json";
import { ExtraField } from "./proto/protos";

// Importing Components
import CreateOption from "./page/create-options";

function App() {
  const [Meta, setMeta] = useState([]);

  useEffect(() => {
    let metaObjs = [];
    for (let field of meta) {
      const Field = ExtraField(field);
      Field.init();
      console.log(Field);
      metaObjs.push(Field);
    }

    setMeta(metaObjs);
  }, []);

  return (
    <>
      <ToastContainer />

      <CreateOption Meta={Meta} />
    </>
  );
}

export default App;
