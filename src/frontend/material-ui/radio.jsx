import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
const RadioMaterial = ({ field, FieldObj, onFieldChange }) => {
  return (
    <FormControl fullWidth>
      <FormLabel id={`${FieldObj.label()}-label`}>{FieldObj.label()}</FormLabel>

      <RadioGroup
        row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name={FieldObj.name()}
        id={FieldObj.id()}
        onChange={(e) => onFieldChange(e, field)}
      >
        {FieldObj.options().map((option) => (
          <FormControlLabel
            key={option.option_id}
            value={option.label}
            control={<Radio />}
            label={option.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default RadioMaterial;
