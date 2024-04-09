import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import useLocalStorage from "./common/useLocalStorage";
import { toast, ToastContainer } from "react-toastify";
import {
  getExtraFields,
  getMeta,
  saveExtraFields,
} from "./services/modalService";
import FieldGenerator from "./page/generator/GenerateFields";
import { wcforce_get_group_id } from "./common/helper";

const App = () => {
  const [Meta, setMeta] = useState([]);
  const [Fields, setFields] = useLocalStorage("wcforce_fields", []);

  const group_id = wcforce_get_group_id();
  // console.log(group_id);

  const handleSaveMeta = async (fields) => {
    if (fields.length === 0) {
      toast.error("At least one field is required");
      return;
    }

    try {
      const post_data = {
        group_id,
        fields: JSON.stringify(fields),
      };
      const { data: response } = await saveExtraFields(post_data);
      if (response.success) {
        setFields(fields);
        toast.success("Fields saved successfully.");
      } else {
        toast.error("Failed to save fields.");
      }
    } catch (error) {
      toast.error(error.message || "An error occurred while saving fields.");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      if (!group_id) return;
      try {
        const { data: savedFields } = await getExtraFields(group_id);
        if (savedFields && savedFields.length > 0) {
          setFields(savedFields);
        }

        const { data: meta } = await getMeta();
        setMeta(meta);
      } catch (error) {
        console.error("Failed to load extra fields:", error);
        toast.error("Failed to load extra fields.");
      }
    };

    loadData();
  }, [group_id, setFields]);

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
};

export default App;
