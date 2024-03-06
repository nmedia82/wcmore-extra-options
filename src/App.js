import React, { useState, useEffect } from "react";
// import { ToastContainer, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify CSS
import "./App.css";
import meta from "./data/meta.json";
import useLocalStorage from "./common/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";
import { saveExtraFields } from "./services/modalService";
import FieldGenerator from "./page/generator/GenerateFields";
import { wcforce_generate_fields_meta } from "./common/helper";

window.WCForce_Data = {
  api_url: "https://code.wcforce.com/wp-json/wcforce/v1",
};

function App() {
  const [Meta, setMeta] = useState([]);
  const [Fields, setFields] = useLocalStorage("wcmore_fields", []);
  const [FrontendFieldsMeta, setFrontendFieldsMeta] = useState([]);

  const handleSaveMeta = async (fields) => {
    try {
      // const post_data = {
      //   title: "Meta One",
      //   meta: fields,
      //   settings: { title: "yes" },
      //   p_attached: [33],
      //   c_attached: null,
      // };
      // const { data: response } = await saveExtraFields(post_data);
      // console.log(response);
      setFields(fields);
      console.log(fields);
      toast.success("Fields saved.");
    } catch (e) {
      toast.error(e.message); // Assuming `e.get_message()` was a typo and should be `e.message`
    }
  };

  useEffect(() => {
    const wcforce_extra_fields = window.wcforce_saved_fields
      ? JSON.parse(window.wcforce_saved_fields)
      : null;
    if (wcforce_extra_fields) setFields([...wcforce_extra_fields]);
    setMeta([...meta]);

    wcforce_generate_fields_meta(Fields)
      .then((frontendFields) => {
        console.log("Transformed Fields:", frontendFields);
        // Perform further actions with the transformed fields
      })
      .catch((error) => {
        console.error("Error transforming fields:", error);
      });
  }, [Fields, setFields]);

  return (
    <>
      <ToastContainer />
      <FieldGenerator
        meta={Meta}
        SavedFields={Fields}
        onSaveMeta={handleSaveMeta}
      />
    </>
  );
}

export default App;
