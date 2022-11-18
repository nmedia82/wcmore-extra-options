import { useState, useEffect } from "react";
import "./Render.css";
import useLocalStorage from "../common/useLocalStorage";
import Field from "./field";
import { wcmore_get_input_value } from "../common/helper";

function Render() {
  const [Fields, setFields] = useLocalStorage("wcmore_fields", []);
  const [Conditions, setConditions] = useState([]);
  const [UserData, setUserData] = useState({});

  useEffect(() => {
    // find active conditions
    const filter = Fields.filter((f) => f.conditions.status);
    let conditions = [];
    for (let field of filter) {
      conditions[field.field_id] = field.conditions;
    }
    // console.log(conditions);
  }, []);

  const handleFieldChange = (e, meta) => {
    // console.log(e, setting);
    let user_data = "";
    let value = "";
    if (e.target.type === "checkbox") {
      value = [
        ...document.querySelectorAll(`.${meta.field_id}.wcforce-field:checked`),
      ].map((c) => c.value);
      // console.log(checked);
    } else {
      value = e.target.value;
    }

    user_data = { ...UserData, [e.target.id]: value };

    console.log(user_data);
    setUserData(user_data);
  };

  const isFieldVisible = (field) => {
    const conditions = [...Conditions];

    return true;
  };

  return (
    <div className="wcforce-extra-fields-wrapper">
      {Fields.map((field) => (
        <div
          key={field._id}
          className={`wcforce-field-wrapper ${field.type} ${field.field_id}`}
        >
          {isFieldVisible(field) && (
            <Field field={field} onFieldChange={handleFieldChange} />
          )}
        </div>
      ))}
    </div>
  );
}

export default Render;
