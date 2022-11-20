import { useState, useEffect } from "react";
import "./Render.css";
import useLocalStorage from "../common/useLocalStorage";
import Field from "./field";
import { wcmore_get_input_value } from "../common/helper";

const fields = JSON.parse(localStorage.getItem("wcmore_fields"));

function Render() {
  const [Fields, setFields] = useState([]);
  const [Conditions, setConditions] = useState([]);
  const [ConditionallyBound, setConditionallyBound] = useState([]);
  const [UserData, setUserData] = useState({});

  useEffect(() => {
    // find active conditions
    const filter = fields
      .filter((f) => f.status)
      .map((f) => ({ ...f, is_hidden: is_conditionally_hidden(f) }));
    let conditions = [];
    let conditionally_bound = [];
    for (let field of filter) {
      conditions[field.field_id] = field.conditions;
      conditionally_bound = [
        ...conditionally_bound,
        ...field.conditions.rules.map((r) => r.field),
      ];
    }

    // getting unice conditionally_bound
    conditionally_bound = conditionally_bound.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    setConditionallyBound(conditionally_bound);

    // console.log(filter, conditionally_bound);
    setFields(filter);
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

    // if conditionally bound
    if (ConditionallyBound.includes(meta.field_id)) {
      // console.log(is_conditionally_hidden(meta));
      const fields = [...Fields];
      const found = fields.find((f) => f.field_id === meta.field_id);
      const index = fields.indexOf(found);
      fields[index].is_hidden = true;
      setFields(fields);
    }
    user_data = { ...UserData, [e.target.id]: value };

    console.log(user_data);
    setUserData(user_data);
  };

  const is_conditionally_hidden = (field) => {
    const { bound, rules, status, visibility } = field.conditions;
    if (status) {
      if (bound === "all" && rules.length === 1) return true;
    }

    return false;
  };
  const getWrapperClass = (field) => {
    let classname = `wcforce-field-wrapper ${field.type} ${field.field_id}`;
    if (field.is_hidden) {
      classname += " conditionally-hidden";
    }
    return classname;
  };

  return (
    <div className="wcforce-extra-fields-wrapper">
      {Fields.map((field) => (
        <div key={field._id} className={getWrapperClass(field)}>
          <Field
            field={field}
            onFieldChange={handleFieldChange}
            ConditionallyBound={ConditionallyBound}
          />
        </div>
      ))}
    </div>
  );
}

export default Render;
