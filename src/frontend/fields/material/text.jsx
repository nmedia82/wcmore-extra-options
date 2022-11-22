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
          name={FieldObj.name()}
          id={FieldObj.id()}
          label={FieldObj.label()}
          value={field.value}
          onChange={(e) => onFieldChange(e, field)}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">kg</InputAdornment>
            ),
          }}
        />
      </Tooltip>
      <FormHelperText id="outlined-weight-helper-text">
        {FieldObj.description()}
      </FormHelperText>
    </FormControl>
  );
};

export default Text;
