import {
  FormControl,
  InputLabel,
  Autocomplete,
  TextField,
} from "@mui/material";

const AutoComplete = ({ field, FieldObj, onFieldChange }) => {
  let options = FieldObj.options().map((option) => ({
    ...option,
    id: option.option_id,
  }));

  return (
    <FormControl fullWidth>
      <Autocomplete
        disablePortal
        name={FieldObj.name()}
        id={FieldObj.id()}
        onInputChange={(_, newInputValue) => {
          onFieldChange(newInputValue, field);
        }}
        defaultValue={{ label: FieldObj.default_value() }}
        onChange={(e) => onFieldChange(e, field)}
        options={options}
        renderInput={(params) => (
          <TextField {...params} label={FieldObj.label()} />
        )}
      />
    </FormControl>
  );
};
export default AutoComplete;
