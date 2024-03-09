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

  const handleSaveMeta = async (title, fields) => {
    if (!title) {
      return toast.error("Group title is required");
    }

    // Get the current URL
    const currentUrl = window.location.href;
    // Create a URLSearchParams object
    const searchParams = new URLSearchParams(new URL(currentUrl).search);
    // Read 'post' query parameter
    const group_id = searchParams.get("post");

    try {
      const post_data = {
        title,
        group_id,
        fields: JSON.stringify(fields),
      };
      const { data: response } = await saveExtraFields(post_data);
      console.log(response);
      if (response.success) {
        setFields(fields);
        toast.success("Fields saved.");
      }
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
