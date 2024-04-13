import Form from "react-bootstrap/Form";

const Select = ({ field, onFieldChange, FieldObj }) => {
  // console.log(field);
  return (
    <Form.Group controlId={FieldObj.id()}>
      <Form.Label>
        {FieldObj.title()}
        {FieldObj.required() && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Select
        name={FieldObj.name()}
        placeholder={FieldObj.placeholder()}
        onChange={(e) => onFieldChange(e, field)}
        value={field.value}
        aria-label="Default select example">
        {field.options.map((option) => (
          <option key={option.option_id} value={option.label}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );
};

export default Select;
