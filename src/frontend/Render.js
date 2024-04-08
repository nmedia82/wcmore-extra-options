import { useState, useEffect } from "react";
import "./Render.css";
import "react-toastify/dist/ReactToastify.css";
import config from "./../services/config.json";
import { FieldClass } from "./FieldClass";
import BootstrapFields from "./bootstrap/";
import MaterialFields from "./material-ui";
import { Grid, styled } from "@mui/material";
import { wcforce_get_group_id } from "../common/helper";
import { getProductExtraFields } from "../services/modalService";
import { toast, ToastContainer } from "react-toastify";
import { Col, Row } from "react-bootstrap";

const Item = styled("div")({
  color: "darkslategray",
  // backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
  minHeight: 50,
});

const { render_ui } = config;

// console.log(settings);
function Render() {
  const [Fields, setFields] = useState([]);
  const [Conditions, setConditions] = useState([]);
  const [ConditionallyBound, setConditionallyBound] = useState([]);
  const [CartData, setCartData] = useState([]);

  const group_id = wcforce_get_group_id();

  useEffect(() => {
    // find active conditions

    // setFields(filter);

    const loadData = async () => {
      if (!window.wcforce_product_id) return;
      try {
        const { data: fields } = await getProductExtraFields(
          window.wcforce_product_id
        );
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

        console.log(filter, conditions, conditionally_bound);

        setFields(fields);
      } catch (error) {
        console.error("Failed to load extra fields:", error);
        toast.error("Failed to load extra fields.");
      }
    };

    loadData();
  }, [group_id]);

  const handleFieldChange = (e, meta) => {
    console.log(e.target.value, meta);
    let value = meta.input_type === "checkbox" ? [] : "";
    if (meta.input_type === "checkbox") {
      const { value: opt_value, checked } = e.target;
      const { options } = meta;
      let found = options.find((option) => option.option_id === opt_value);
      const index = options.indexOf(found);
      found = { ...found, checked };
      options[index] = found;
      meta.options = [...options];
      value = { value: options.filter((option) => option.checked) };
    } else if (meta.type === "text") {
      value = { value: e.target.value, price: meta.price };
    } else if (meta.type === "options") {
      value = { value: e.target.value };
    }

    // set key for multi value
    const data_type = typeof value.value;
    //keys to be included in CartData
    const { field_id, title, type, input_type, price, hide_in_cart } = meta;

    let cart_data = [...CartData];
    const found_in_cart = cart_data.find((d) => d.field_id === meta.field_id);
    if (found_in_cart) {
      const index = cart_data.indexOf(found_in_cart);
      cart_data[index] = {
        ...value,
        field_id,
        type,
        input_type,
        price,
        hide_in_cart,
        title,
        data_type,
      };
    } else {
      cart_data = [
        ...cart_data,
        {
          ...value,
          field_id,
          type,
          input_type,
          price,
          hide_in_cart,
          title,
          data_type,
        },
      ];
    }
    // updating value of current field
    const fields = [...Fields];
    const found = fields.find((f) => f.field_id === meta.field_id);
    const index = fields.indexOf(found);
    fields[index].value = value.value;

    console.log(cart_data);

    // if conditionally bound
    if (ConditionallyBound.includes(meta.field_id)) {
      // console.log(is_conditionally_hidden(meta));
      // console.log(Conditions);
      for (let field_id in Conditions) {
        // console.log(field_id);
        const found = fields.find((f) => f.field_id === field_id);
        const index = fields.indexOf(found);
        fields[index].is_hidden = is_conditionally_hidden(found, cart_data);
        console.log(fields[index]);
      }
    }

    setFields(fields);
    // console.log(cart_data);
    setCartData(cart_data);
  };

  // Determines if a field should be hidden based on its conditions and user input values
  const is_conditionally_hidden = (field, user_values = []) => {
    if (!field.conditions || !field.conditions.status) {
      // If there are no conditions or the conditions are not active, don't hide the field
      return false;
    }

    const { visibility, ruleBound, rules } = field.conditions;
    const shouldHideByDefault = visibility !== "show";
    const ruleMatches = rules.map((rule) => matchRule(rule, user_values));

    const anyRuleMatched = ruleMatches.some(Boolean);
    const allRulesMatched = ruleMatches.every(Boolean);

    switch (ruleBound) {
      case "all":
        return shouldHideByDefault ? !allRulesMatched : allRulesMatched;
      case "any":
        return shouldHideByDefault ? !anyRuleMatched : anyRuleMatched;
      default:
        return false;
    }
  };

  // Helper function to check if a specific rule matches user input values
  const matchRule = (rule, user_values) => {
    const userValue = user_values.find(
      (value) => value.field_id === rule.field_id
    )?.value;

    switch (rule.condition) {
      case "is":
        return Array.isArray(userValue)
          ? userValue.includes(rule.value)
          : userValue === rule.value;
      case "not":
        return Array.isArray(userValue)
          ? !userValue.includes(rule.value)
          : userValue !== rule.value;
      case "greater than":
        return Number(userValue) > Number(rule.value);
      case "less than":
        return Number(userValue) < Number(rule.value);
      default:
        return false;
    }
  };

  // const is_conditionally_hidden = (f, user_values = []) => {
  //   const { ruleBound, rules, status, visibility } = f.conditions;
  //   // if (!status) return false;
  //   const _true = visibility === "show" ? false : true;
  //   // console.log(rules.length === matched_rules(rules, user_values), !_true);
  //   if (
  //     ruleBound === "all" &&
  //     rules.length === matched_rules(rules, user_values)
  //   ) {
  //     return _true;
  //   }
  //   if (ruleBound === "any" && 0 < matched_rules(rules, user_values)) {
  //     return _true;
  //   }
  //   return !_true;
  // };

  // const matched_rules = (rules, user_values) => {
  //   let matched_rules = 0;
  //   for (let rule of rules) {
  //     // console.log(rules);
  //     const { field, operator, value } = rule;
  //     const found = user_values.find((m) => m.field_id === field);
  //     // console.log(found, `${found} === ${value}`);
  //     if (!found) continue;
  //     // array values
  //     if (found.input_type === "checkbox") {
  //       const found_values = found.value.map((v) => v.label);
  //       // console.log(found_values);
  //       if (operator === "is" && found_values.includes(value)) matched_rules++;
  //       if (operator === "not" && !found_values.includes(value))
  //         matched_rules++;
  //     } else if (found.type === "options" && found.input_type !== "checkbox") {
  //       const { label: cart_value } = found.value;
  //       if (operator === "is" && cart_value === value) matched_rules++;
  //       if (operator === "not" && cart_value !== value) matched_rules++;
  //     } else {
  //       if (operator === "is" && found.value === value) matched_rules++;
  //       if (operator === "not" && found.value !== value) matched_rules++;
  //       if (operator === "greater than" && Number(found.value) > Number(value))
  //         matched_rules++;
  //       if (operator === "less than" && Number(found.value) < Number(value))
  //         matched_rules++;
  //     }
  //   }
  //   return matched_rules;
  // };

  const getWrapperClass = (field) => {
    let classname = `wcforce-field-wrapper ${field.input} ${field.field_id}`;
    if (field.is_hidden) {
      classname += " conditionally-hidden";
    }
    return classname;
  };

  return (
    <div className="wcforce-extra-fields-wrapper">
      <ToastContainer />
      {/* <PriceDisplay CartData={CartData} Hello={"hi"} /> */}
      <input
        type="hidden"
        name="wcforce_cart_data"
        value={JSON.stringify(CartData)}
      />

      {render_ui === "bootstrap" && (
        <Row>
          {Fields.map((field) => {
            const FieldObj = new FieldClass(field, ConditionallyBound);
            // console.log(FieldObj);
            return (
              <Col key={field.id} xs={FieldObj.col()}>
                <BootstrapFields
                  field={field}
                  onFieldChange={handleFieldChange}
                  FieldObj={FieldObj}
                />
              </Col>
            );
          })}
        </Row>
      )}

      {render_ui === "material" && (
        <Grid container spacing={0}>
          {Fields.map((field) => {
            const FieldObj = new FieldClass(field, ConditionallyBound);
            return (
              <Grid key={field.id} item xs={FieldObj.col()}>
                <div className={getWrapperClass(field)}>
                  <Item>
                    <MaterialFields
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
