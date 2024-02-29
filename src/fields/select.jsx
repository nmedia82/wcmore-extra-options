import React from "react";
import { Form } from "react-bootstrap";

const Select = ({ meta, onMetaChange }) => {
  return (
    <Form.Group className="mb-3 wcforce-field-wrapper">
      <Form.Select
        name={meta.name}
        id={meta.name}
        onChange={onMetaChange}
        value={meta.value || ""} // Ensure controlled component behavior
      >
        {meta.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </Form.Select>
      {meta.detail && (
        <Form.Text className="text-muted">{meta.detail}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Select;
