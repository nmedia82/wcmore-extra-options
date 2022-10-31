import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import meta from "./data/meta.json";
import { FieldClass } from "./proto/protos";
import useLocalStorage from "./common/useLocalStorage";

// Importing Components
import CreateOption from "./page/create-options";

function App() {
  const [Meta, setMeta] = useState([]);
  const [Fields, setFields] = useLocalStorage("wcmore_fields", []);

  const handleSaveFields = (field) => {
    // const fields = [...Fields, field];
    // setFields(fields);
    // setSelectedField(field);
  };

  useEffect(() => {
    let metaObjs = [];
    for (let field of meta) {
      const Field = new FieldClass(field);
      // Field.init();
      // console.log(Field);
      metaObjs.push(Field);
    }

    setMeta([...metaObjs]);
  }, []);

  return (
    <>
      <ToastContainer />

      <CreateOption
        Meta={Meta}
        SavedFields={Fields}
        onSaveFields={handleSaveFields}
      />
    </>
  );
}

export default App;
