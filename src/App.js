import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import meta from "./data/meta.json";
import useLocalStorage from "./common/useLocalStorage";
import { toast } from "react-toastify";
import CreateOption from "./page/create-options";

function App() {
  const [Meta, setMeta] = useState([]);
  const [Fields, setFields] = useLocalStorage("wcmore_fields", []);

  const handleSaveFields = (fields) => {
    console.log(fields);
    const resp = window["wcforce_save_extra_fields"](fields, function (resp) {
      console.log(resp);
      setFields(fields);
      toast.success("Fields saved.");
    });

    // setFields(fields);
    // setSelectedField(field);
  };

  useEffect(() => {
    const wcforce_extra_fields = window.wcforce_saved_fields
      ? JSON.parse(window.wcforce_saved_fields)
      : null;
    if (wcforce_extra_fields) setFields([...wcforce_extra_fields]);
    setMeta([...meta]);
  }, []);

  const handleMediaSelect = () => {
    window.wcforce_call_wp("wcforce_save_extra_fields", function (resp) {
      console.log(resp);
    });
    return;
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
