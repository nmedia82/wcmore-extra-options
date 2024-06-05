import Form from "react-bootstrap/Form";
import Select from "react-select";

export default function AutoComplete({ field, onFieldChange, FieldObj }) {
  const options = field.options.map((o) => ({
    ["label"]: o.label,
    ["value"]: o.label,
  }));

  return (
    <Form.Group controlId={FieldObj.id()}>
      <Form.Label>
        {FieldObj.title()}
        {FieldObj.required() && <span className="text-danger">*</span>}
      </Form.Label>

      <Select
        options={options}
        isMulti
        onFieldChange={(e) => onFieldChange(e, field)}
      />
    </Form.Group>
  );
}
