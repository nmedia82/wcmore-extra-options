import { useState } from "react";
import Input from "../fields/input";

function CreateOption({ Meta }) {
  const [SelectedMeta, setSelectedMeta] = useState([]);
  const [Fields, setFields] = useState([]);
  const loadFieldMeta = (field) => {
    const fields = [...Fields, field];
    setFields(fields);
    setSelectedMeta(field.meta);
  };
  return (
    <div id="wcmore-productoptions">
      <div className="wcmore-panel left">
        <ul className="wcmore-meta-fields">
          {Meta.map((field) => (
            <li onClick={(e) => loadFieldMeta(field)}>{field.Label}</li>
          ))}
        </ul>
      </div>
      <div className="wcmore-panel right">
        <div className="wcmore-field-settingszz">
          {Fields.map((field) => (
            <div>
              <header>{field.label}</header>
              {/* <Input meta={meta} /> */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CreateOption;
