import { TextField } from "@mui/material";

const Text = ({ field, FieldObj, onFieldChange }) => {
  return (
    <>
      {FieldObj.label()}
      <input
        type={FieldObj.input_type()}
        name={FieldObj.name()}
        id={FieldObj.id()}
        placeholder={FieldObj.placeholder()}
        className={FieldObj.class()}
        onChange={(e) => onFieldChange(e, field)}
        value={field.value}
        {...FieldObj.input_attributes()}
      />
      <br />
      <small>{field.description}</small>
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />

    </>
  );
};

export default Text;
