import {
  FormGroup,
  FormControl,
  FormControlLabel,
  FormLabel,
  Checkbox,
  FormHelperText,
} from "@mui/material";
import { useState } from "react";

const CheckboxMaterial = ({ field, FieldObj, onFieldChange }) => {
  const [checked, setChecked] = useState([]);
  const handleChecked = (id) => (e) => {
    const { checked } = e.target;
    setChecked((values) => [...values, id]);
  };
  //   console.log(checked);
  return (
    <FormControl fullWidth>
      <FormLabel id={`${FieldObj.label()}-label`}>{FieldObj.label()}</FormLabel>
      <FormGroup row={true} name={FieldObj.name()} id={FieldObj.id()}>
        {FieldObj.options().map((option) => (
          <FormControlLabel
            control={
              <Checkbox
                // checked={true}
                value={option.option_id}
                onChange={(e) => onFieldChange(e, field)}
              />
            }
            key={option.option_id}
            label={option.label}
          />
        ))}
      </FormGroup>
      <FormHelperText id={`outlined-helper-${FieldObj.id()}`}>
        {FieldObj.description()}
      </FormHelperText>
    </FormControl>
  );
};

export default CheckboxMaterial;
