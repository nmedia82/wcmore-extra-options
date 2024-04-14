import { useState, useEffect } from "react";
import "./Render.css";
import "react-toastify/dist/ReactToastify.css";
import config from "../services/config.json";
import { FieldClass } from "./FieldClass";
import BootstrapFields from "./bootstrap";
import MaterialFields from "./material-ui";
import { Grid, styled } from "@mui/material";
import { wcforce_get_group_id } from "../common/helper";
import { getProductExtraFields } from "../services/modalService";
import { toast, ToastContainer } from "react-toastify";
import { Col, Row } from "react-bootstrap";
import PriceDisplay from "./price";

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
  const [CartPrices, setCartPrices] = useState([]);

  const group_id = wcforce_get_group_id();

  useEffect(() => {
    // find active conditions

    // setFields(filter);

    const loadData = async () => {
      if (!window.wcforce_product_id) return;
      try {
        let { data: fields } = await getProductExtraFields(
          window.wcforce_product_id
        );
        // console.log(fields);
        fields = fields.map((f) => ({
          ...f,
          is_hidden: is_conditionally_hidden(f),
        }));
        let conditions = {};
        let conditionally_bound = [];
        for (let field of fields) {
          if (!field.conditions) continue;
          // console.log("condition", field, field.conditions);
          conditions = { ...conditions, [field.field_id]: field.conditions };
          conditionally_bound = [
            ...conditionally_bound,
            ...field.conditions.rules.map((r) => r.field_id),
          ];
        }

        // getting uniqe conditionally_bound
        conditionally_bound = conditionally_bound.filter(
          (value, index, self) => self.indexOf(value) === index
        );

        setConditions(conditions);
        setConditionallyBound(conditionally_bound);

        // console.log(fields, conditions, conditionally_bound);

        setFields(fields);
      } catch (error) {
        console.error("Failed to load extra fields:", error);
        toast.error("Failed to load extra fields.");
      }
    };

    loadData();
  }, [group_id]);

  const handleFieldChange = (e, meta) => {
    console.log(e, meta);
    let value = meta.input === "checkbox" ? [] : "";
    if (meta.input === "checkbox") {
      const { id: opt_id, checked } = e.target;
      const { options } = meta;
      let found = options.find((option) => option.option_id === opt_id);
      const index = options.indexOf(found);
      found = { ...found, checked };
      options[index] = found;
      meta.options = [...options];
      value = options.filter((option) => option.checked).map((o) => o.label);
    } else {
      value = e.target.value;
    }

    // setting prices info
    let prices = [];
    if (meta.options.length > 0) {
      if ("checkbox" === meta.input || "radio" === meta.input) {
        prices = [
          ...CartPrices,
          meta.options.filter((option) => option.checked),
        ];
      } else {
        prices = [...CartPrices, meta.options.filter((o) => o.label === value)];
      }

      setCartPrices(prices);
    }

    // updating value of current field
    const fields = [...Fields];
    const found = fields.find((f) => f.field_id === meta.field_id);
    const index = fields.indexOf(found);
    fields[index].value = value;

    // if conditionally bound
    if (ConditionallyBound.includes(meta.field_id)) {
      // console.log(is_conditionally_hidden(meta));
      for (let field_id in Conditions) {
        if (meta.field_id === field_id) continue;
        const found = fields.find((f) => f.field_id === field_id);
        const index = fields.indexOf(found);
        const isHidden = is_conditionally_hidden(found, value);
        fields[index].is_hidden = isHidden;
        fields[index].value = isHidden ? null : fields[index].value;
      }
    }

    // const after_conditions = fields.filter((f) => !f.is_hidden);
    setFields(fields);
  };

  // Determines if a field should be hidden based on its conditions and user input values
  const is_conditionally_hidden = (field, user_values = []) => {
    if (!field.conditions) {
      // If there are no conditions or the conditions are not active, don't hide the field
      return false;
    }

    const { visibility, ruleBound, rules } = field.conditions;
    const shouldHideByDefault = visibility !== "show";
    const ruleMatches = rules.map((rule) =>
      matchRule(rule, user_values, field.field_id)
    );
    console.log(field.field_id, ruleBound, user_values, ruleMatches);

    const anyRuleMatched = ruleMatches.some(Boolean);
    const allRulesMatched = ruleMatches.every(Boolean);

    switch (ruleBound) {
      case "all":
        return shouldHideByDefault ? allRulesMatched : !allRulesMatched;
      case "any":
        return shouldHideByDefault ? anyRuleMatched : !anyRuleMatched;
      default:
        return false;
    }
  };

  // Helper function to check if a specific rule matches user input values
  const matchRule = (rule, userValue, field_id) => {
    if (rule.field_id !== field_id) {
      const field = Fields.find((f) => f.field_id === rule.field_id);
      userValue = field?.value || null;
    }
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

  const getWrapperClass = (field) => {
    let classname = `wcforce-field-wrapper ${field.input} ${field.field_id}`;
    return classname;
  };

  return (
    <div className="wcforce-extra-fields-wrapper">
      <ToastContainer />
      <PriceDisplay CartPrices={CartPrices} Hello={"hi"} />
      {/* <input
        type="hidden"
        name="wcforce_cart_data"
        value={JSON.stringify(CartData)}
      /> */}

      {render_ui === "bootstrap" && (
        <Row>
          {Fields.filter((f) => !f.is_hidden).map((field) => {
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
