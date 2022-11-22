import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
const SelectMaterial = ({ field, FieldObj, onFieldChange }) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${FieldObj.label()}-label`}>
        {FieldObj.label()}
      </InputLabel>
      <Select
        labelId={`${FieldObj.label()}-label`}
        name={FieldObj.name()}
        id={FieldObj.id()}
        label={FieldObj.label()}
        value={FieldObj.default_value()}
        onChange={(e) => onFieldChange(e, field)}
      >
        {FieldObj.options().map((option) => (
          <MenuItem key={option.option_id} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText id="outlined-weight-helper-text">
        {FieldObj.description()}
      </FormHelperText>
    </FormControl>
  );
};

export default SelectMaterial;
