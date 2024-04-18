import Form from "react-bootstrap/Form";
import React from "react";
const Checkbox = ({ field, FieldObj, onFieldChange }) => {
  return (
    <>
      <Form.Label>
        {FieldObj.title()}
        {FieldObj.required() && <span className="text-danger">*</span>}
      </Form.Label>
      {field.options.map((option) => (
        <Form.Check
          key={option.option_id}
          type="checkbox"
          name={FieldObj.name()}
          id={option.option_id}
          label={option.label}
          className={FieldObj.class()}
          value={option.label}
          onChange={(e) => onFieldChange(e, field)}
        />
      ))}
    </>
  );
};

export default Checkbox;
