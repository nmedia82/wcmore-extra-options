import React from "react";
import { Form } from "react-bootstrap";
import Text from "../../fields/text";
import Select from "../../fields/select";

const RenderFields = ({ meta, onInputChange, handleOptionRemoval }) => {
  switch (meta.type) {
    case "text":
      return <Text onMetaChange={onInputChange} meta={meta} />;
    case "select":
      return <Select onMetaChange={onInputChange} meta={meta} />;
    case "boolean":
      return <Form.Check type="checkbox" label={meta.title} />;
    default:
      return null;
  }
};

export default RenderFields;
