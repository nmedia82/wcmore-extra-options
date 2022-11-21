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
    let conditions = {};
    let conditionally_bound = [];
    for (let field of filter) {
      if (!field.conditions.status) continue;
      conditions = { ...conditions, [field.field_id]: field.conditions };
      conditionally_bound = [
        ...conditionally_bound,
        ...field.conditions.rules.map((r) => r.field),
      ];
    }

    // getting uniqe conditionally_bound
    conditionally_bound = conditionally_bound.filter(
      (value, index, self) => self.indexOf(value) === index
    );

    setConditions(conditions);
    setConditionallyBound(conditionally_bound);

    // console.log(filter, conditions, conditionally_bound);
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

    user_data = { ...UserData, [e.target.id]: value };

    // if conditionally bound
    if (ConditionallyBound.includes(meta.field_id)) {
      // console.log(is_conditionally_hidden(meta));
      const fields = [...Fields];
      console.log(Conditions);
      for (let field_id in Conditions) {
        // console.log(field_id);
        const found = fields.find((f) => f.field_id === field_id);
        const index = fields.indexOf(found);
        fields[index].is_hidden = is_conditionally_hidden(found, user_data);
        console.log(fields[index]);
        setFields(fields);
      }
    }
    console.log(user_data);
    setUserData(user_data);
  };

  const is_conditionally_hidden = (f, user_values = {}) => {
    const { bound, rules, status, visibility } = f.conditions;
    if (!status) return false;
    const _true = visibility === "show" ? false : true;
    // console.log(rules.length === matched_rules(rules, user_values), !_true);
    if (bound === "all" && rules.length === matched_rules(rules, user_values)) {
      return _true;
    }
    if (bound === "any" && 0 < matched_rules(rules, user_values)) {
      return _true;
    }
    return !_true;
  };

  const matched_rules = (rules, user_values) => {
    let matched_rules = 0;
    for (let rule of rules) {
      // console.log(rules);
      const { field, operator, value } = rule;
      // console.log(`${user_values[field]} === ${value}`);
      // array values
      if (typeof user_values[field] === "object") {
        if (operator === "is" && user_values[field].includes(value))
          matched_rules++;
        if (operator === "not" && !user_values[field].includes(value))
          matched_rules++;
      } else {
        if (operator === "is" && user_values[field] === value) matched_rules++;
        if (operator === "not" && user_values[field] !== value) matched_rules++;
        if (
          operator === "greater than" &&
          Number(user_values[field]) > Number(value)
        )
          matched_rules++;
        if (
          operator === "less than" &&
          Number(user_values[field]) < Number(value)
        )
          matched_rules++;
      }
    }
    return matched_rules;
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
