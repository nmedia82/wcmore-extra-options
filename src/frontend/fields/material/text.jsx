import {
  TextField,
  Tooltip,
  InputAdornment,
  FormHelperText,
} from "@mui/material";
const Text = ({ field, FieldObj, onFieldChange }) => {
  return (
    <>
      <Tooltip title={FieldObj.description()}>
        <TextField
          fullWidth
          name={FieldObj.name()}
          id={FieldObj.id()}
          label={FieldObj.label()}
          variant="outlined"
          onChange={(e) => onFieldChange(e, field)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">kg</InputAdornment>
            ),
          }}
        />
      </Tooltip>
      <FormHelperText id="outlined-weight-helper-text">Weight</FormHelperText>
    </>
  );
};

export default Text;
