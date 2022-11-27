import { useState, useEffect } from "react";
import "./Render.css";
import settings from "./../data/settings.json";
import { FieldClass } from "./FieldClass";
import Field from "./field";
import FieldMaterial from "./field-material";
import { Grid, Paper, styled } from "@mui/material";

const Item = styled("div")({
  color: "darkslategray",
  // backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
  minHeight: 50,
});

const fields = window.wcforce_saved_fields
  ? JSON.parse(window.wcforce_saved_fields)
  : JSON.parse(localStorage.getItem("wcmore_fields"));

// console.log(settings);
function Render() {
  const [Fields, setFields] = useState([]);
  const [Conditions, setConditions] = useState([]);
  const [ConditionallyBound, setConditionallyBound] = useState([]);
  const [CartData, setCartData] = useState({});

  useEffect(() => {
    // find active conditions

    const filter = fields
      .filter((f) => f.status)
      .map((f) => ({ ...f, is_hidden: is_conditionally_hidden(f) }));
    let conditions = {};
    let conditionally_bound = [];
    // console.log(filter);
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
    console.log(e.target.value, meta);
    let user_data = "";
    let value = meta.input_type === "checkbox" ? [] : "";
    if (meta.input_type === "checkbox") {
      const { value: opt_value, checked } = e.target;
      const { options } = meta;
      let found = options.find((option) => option.option_id === opt_value);
      const index = options.indexOf(found);
      console.log(index, opt_value, found);
      found = { ...found, checked };
      options[index] = found;
      meta.options = [...options];
      const checked_options = options.filter((option) => option.checked);
      value = { value: checked_options };
    } else if (meta.type === "text") {
      value = { value: e.target.value, price: meta.price };
    } else if (meta.type === "options") {
      value = { value: e.target.value };
    }

    //keys to be included in CartData
    const { type, input_type, price, hide_in_cart } = meta;
    user_data = {
      ...CartData,
      [meta.field_id]: { ...value, type, input_type, price, hide_in_cart },
    };

    // updating value of current field
    const fields = [...Fields];
    const found = fields.find((f) => f.field_id === meta.field_id);
    const index = fields.indexOf(found);
    fields[index].value = value.value;

    // console.log(fields[index]);

    // if conditionally bound
    if (ConditionallyBound.includes(meta.field_id)) {
      // console.log(is_conditionally_hidden(meta));
      console.log(Conditions);
      for (let field_id in Conditions) {
        // console.log(field_id);
        const found = fields.find((f) => f.field_id === field_id);
        const index = fields.indexOf(found);
        fields[index].is_hidden = is_conditionally_hidden(found, user_data);
        console.log(fields[index]);
      }
    }

    setFields(fields);
    console.log(user_data);
    setCartData(user_data);
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
      <input
        type="hidden"
        name="wcforce_cart_data"
        value={JSON.stringify(CartData)}
      />
      {settings.ui === "normal" &&
        Fields.map((field) => {
          const FieldObj = new FieldClass(field, ConditionallyBound);
          return (
            <div key={field._id} className={getWrapperClass(field)}>
              <Field
                field={field}
                onFieldChange={handleFieldChange}
                ConditionallyBound={ConditionallyBound}
                FieldObj={FieldObj}
              />
            </div>
          );
        })}

      {settings.ui === "material" && (
        <Grid container spacing={0}>
          {Fields.map((field) => {
            const FieldObj = new FieldClass(field, ConditionallyBound);
            return (
              <Grid key={field._id} item xs={FieldObj.col()}>
                <div className={getWrapperClass(field)}>
                  <Item>
                    <FieldMaterial
                      field={field}
                      onFieldChange={handleFieldChange}
                      ConditionallyBound={ConditionallyBound}
                      FieldObj={FieldObj}
                    />
                  </Item>
                </div>
              </Grid>
            );
          })}
        </Grid>
      )}
    </div>
  );
}

export default Render;
