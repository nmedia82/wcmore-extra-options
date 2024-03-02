import React from "react";
import { Form } from "react-bootstrap";
import { wcmore_get_field_id } from "./../common/helper";

const Boolean = ({ meta, onMetaChange }) => {
  // Ensure meta.value is correctly interpreted as a boolean
  const isChecked = meta.value === true || meta.value === "true";

  return (
    <Form.Group className="wcforce-field-wrapper">
      <Form.Check
        type="switch"
        id={wcmore_get_field_id()}
        name={meta.name}
        label={meta.title}
        onChange={onMetaChange}
        checked={isChecked}
      />
      {meta.detail && (
        <Form.Text className="text-muted">{meta.detail}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Boolean;
