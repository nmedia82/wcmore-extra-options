const Radio = ({ field, FieldObj, onFieldChange }) => {
  return (
    <>
      {FieldObj.label()}
      {field.options.map((option) => (
        <label key={option.option_id}>
          <input
            type="radio"
            name={FieldObj.name()}
            id={FieldObj.id()}
            className={FieldObj.class()}
            onChange={(e) => onFieldChange(e, field)}
            value={field.value}
            {...FieldObj.input_attributes()}
          />
          {option.label}
        </label>
      ))}
      <small>{field.description}</small>
    </>
  );
};

export default Radio;
