import React from "react";
import { Form } from "react-bootstrap";

const Text = ({ meta, onMetaChange }) => {
  return (
    <Form.Group className="mb-1 wcforce-field-wrapper">
      <Form.Control
        type="text"
        name={meta.name}
        placeholder={meta.title}
        onChange={onMetaChange}
        value={meta.value || ""} // Ensure controlled component behavior
      />
      {meta.detail && (
        <Form.Text className="text-muted">{meta.detail}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Text;
