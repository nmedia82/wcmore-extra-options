import { Autocomplete, TextField } from "@mui/material";

const AutoComplete = ({ field, FieldObj, onFieldChange }) => {
  return (
    <Autocomplete
      fullWidth
      disablePortal
      id="combo-box-demo"
      options={field.options}
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Movie" />}
    />
  );
};
export default AutoComplete;
