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
import { isConditionallyHidden } from "./conditions"; // Import the new conditions logic

const Item = styled("div")({
  color: "darkslategray",
  // backgroundColor: "aliceblue",
  padding: 8,
  borderRadius: 4,
  minHeight: 50,
});

const { render_ui } = config;

function Render() {
  const [Fields, setFields] = useState([]);
  const [Conditions, setConditions] = useState([]);
  const [ConditionallyBound, setConditionallyBound] = useState([]);
  const [CartPrices, setCartPrices] = useState({});

  const group_id = wcforce_get_group_id();

  useEffect(() => {
    const loadData = async () => {
      if (!window.wcforce_product_id) return;
      try {
        let { data: fields } = await getProductExtraFields(
          window.wcforce_product_id
        );
        fields = fields.map((f) => ({
          ...f,
          is_hidden: isConditionallyHidden(f, [], fields),
        }));
        let conditions = {};
        let conditionally_bound = [];
        for (let field of fields) {
          if (!field.conditions || field.conditions.length === 0) {
            continue;
          }
          conditions = { ...conditions, [field.field_id]: field.conditions };
          conditionally_bound = [
            ...conditionally_bound,
            ...field.conditions.rules.map((r) => r.field_id),
          ];
        }
        conditionally_bound = conditionally_bound.filter(
          (value, index, self) => self.indexOf(value) === index
        );
        setConditions(conditions);
        setConditionallyBound(conditionally_bound);
        setFields(fields);
      } catch (error) {
        console.error("Failed to load extra fields:", error);
        toast.error("Failed to load extra fields.");
      }
    };

    loadData();
  }, [group_id]);

  const handleFieldChange = (e, meta) => {
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

    let prices = [];
    if (meta.options.length > 0) {
      if ("checkbox" === meta.input) {
        prices = {
          ...CartPrices,
          [meta.id]: meta.options.filter((option) => option.checked),
        };
      } else {
        prices = {
          ...CartPrices,
          [meta.id]: meta.options.filter((o) => o.label === value),
        };
      }
      setCartPrices(prices);
    }

    const fields = [...Fields];
    const found = fields.find((f) => f.field_id === meta.field_id);
    const index = fields.indexOf(found);
    fields[index].value = value;

    if (ConditionallyBound.includes(meta.field_id)) {
      for (let field_id in Conditions) {
        if (meta.field_id === field_id) continue;
        const found = fields.find((f) => f.field_id === field_id);
        const index = fields.indexOf(found);
        const isHidden = isConditionallyHidden(found, value, fields);
        fields[index].is_hidden = isHidden;
        fields[index].value = isHidden ? null : fields[index].value;
      }
    }

    setFields(fields);
  };

  const getWrapperClass = (field) => {
    let classname = `wcforce-field-wrapper ${field.input} ${field.field_id}`;
    return classname;
  };

  return (
    <div className="wcforce-extra-fields-wrapper">
      <ToastContainer />
      {render_ui === "bootstrap" && (
        <Row>
          {Fields.filter((f) => !f.is_hidden).map((field) => {
            const FieldObj = new FieldClass(field, ConditionallyBound);
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
