import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import Text from "./../../fields/text";
import Boolean from "./../../fields/boolean";
import Select from "./../../fields/select";
import { wcforce_get_default_options } from "../../common/helper";

function Option({ option, SavedFields, onOptionMetaChange }) {
  const get_option_meta = (k) => {
    const value = option[k];
    switch (k) {
      case "image":
        return {
          name: k,
          type: "option_image",
          title: k,
          value: value,
        };
      case "field":
      case "operator":
        const options = wcforce_get_default_options(k, SavedFields);
        return {
          name: k,
          type: "select",
          title: k,
          value: value,
          options: ["Select", ...options],
          row_id: option["option_id"],
        };
      default:
        return {
          name: k,
          type: "text",
          title: k,
          value: value,
          row_id: option["option_id"],
        };
    }
  };

  const renderInput = (meta) => {
    switch (meta.type) {
      case "text":
        return <Text meta={meta} onMetaChange={onOptionMetaChange} />;
      case "boolean":
        return <Boolean meta={meta} onMetaChange={onOptionMetaChange} />;
      case "select":
        return <Select meta={meta} onMetaChange={onOptionMetaChange} />;
      case "option_image":
        return <Form.Control type="file" />;
      default:
        return null;
    }
  };

  return (
    <Row>
      {Object.keys(option)
        .filter((key) => key !== "icon_clone" && key !== "icon_delete")
        .map((o, i) => {
          const meta = get_option_meta(o);
          return (
            <Col key={i} md={4} className="mb-3">
              {renderInput(meta)}
            </Col>
          );
        })}
    </Row>
  );
}

export default Option;
