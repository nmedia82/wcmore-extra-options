import { Form } from "react-bootstrap";

const Text = ({ field, FieldObj, onFieldChange }) => {
  return (
    <Form.Group controlId={FieldObj.id()}>
      <Form.Label>
        {FieldObj.title()}
        {FieldObj.required() && <span className="text-danger">*</span>}
      </Form.Label>
      <Form.Control
        type={FieldObj.input_type()}
        placeholder={FieldObj.placeholder()}
        name={FieldObj.name()}
        className={FieldObj.class()}
        onChange={(e) => onFieldChange(e, field)}
        value={field.value}
        required={FieldObj.required()}
        {...FieldObj.input_attributes()}
      />
      {FieldObj.description && (
        <Form.Text className="text-muted">{FieldObj.description()}</Form.Text>
      )}
    </Form.Group>
  );
};

export default Text;
