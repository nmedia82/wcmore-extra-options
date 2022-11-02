import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import meta from "./data/meta.json";
import { FieldClass } from "./proto/protos";
import useLocalStorage from "./common/useLocalStorage";
import { toast } from "react-toastify";

// Importing Components
import CreateOption from "./page/create-options";

function App() {
  const [Meta, setMeta] = useState([]);
  const [Fields, setFields] = useLocalStorage("wcmore_fields", []);

  const handleSaveFields = (fields) => {
    console.log(fields);
    setFields(fields);
    toast.success("Fields saved.");
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

  const handleMediaSelect = () => {
    var wp_media_type = "image";
    // if (field.type == 'audio') {
    //     wp_media_type = 'audio,video';
    // }

    const params = {
      title: "Choose Images",
      library: {
        type: wp_media_type,
      },
      button: {
        text: "Add Image",
      },
      multiple: true,
    };

    var frame = window.wcforce_get_wp_media(params);

    // frame.on("close", function () {
    //   var selection = frame.state().get("selection");
    //   if (!selection.length) {
    //   }
    // });

    frame.on("select", function () {
      var attachment = frame.state().get("selection").toJSON();
      // var selection = state.get('selection');
      console.log("select", attachment);
    });

    frame.open();
  };

  return (
    <>
      <ToastContainer />

      <CreateOption
        Meta={Meta}
        SavedFields={Fields}
        onSaveFields={handleSaveFields}
        onMediaSelect={handleMediaSelect}
      />
    </>
  );
}

export default App;
