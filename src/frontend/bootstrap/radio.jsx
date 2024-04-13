import Form from "react-bootstrap/Form";
const Radio = ({ field, FieldObj, onFieldChange }) => {
  return (
    <>
      {/* {FieldObj.label()}
      {field.options.map((option) => (
        <label key={option.option_id}>
          <input
            type="radio"
            name={FieldObj.name()}
            id={FieldObj.id()}
            className={FieldObj.class()}
            onChange={(e) => onFieldChange(e, field)}
            value={option.label}
            {...FieldObj.input_attributes()}
          />
          {option.label}
        </label>
      ))}
      <small>{field.description}</small> */}
      <Form.Check // prettier-ignore
        type="radio"
        id={FieldObj.id()}
        label={option.option_id}
        className={FieldObj.class()}
        value={option.label}
        onChange={(e) => onFieldChange(e, field)}
      />
    </>
  );
};

export default Radio;
