import {
  FormControl,
  TextField,
  Tooltip,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
const Text = ({ field, FieldObj, onFieldChange }) => {
  return (
    <FormControl fullWidth>
      <Tooltip title={FieldObj.description()}>
        <TextField
          // error={true}
          name={FieldObj.name()}
          id={FieldObj.id()}
          type={FieldObj.input_type()}
          label={FieldObj.label()}
          value={FieldObj.default_value()}
          // defaultValue={FieldObj.default_value()}
          onChange={(e) => onFieldChange(e, field)}
          variant="outlined"
          InputProps={getInputProps(FieldObj)}
        />
      </Tooltip>
      <FormHelperText id={`outlined-helper-${FieldObj.id()}`}>
        {FieldObj.description()}
      </FormHelperText>
    </FormControl>
  );
};

const getInputProps = (FieldObj) => {
  switch (FieldObj.input_type()) {
    case "text":
      return {
        startAdornment: (
          FieldObj.prefix() && <InputAdornment position="start">{FieldObj.prefix()}</InputAdornment>
        ),
      };

    case "number":
      return {
        inputProps: { max: 5, min: 3 },
        startAdornment: (
          FieldObj.prefix() && <InputAdornment position="start">{FieldObj.prefix()}</InputAdornment>
        ),
      };
    default:
      break;
  }
};

export default Text;
