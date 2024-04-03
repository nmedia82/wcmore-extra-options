import Text from "./text";
import Boolean from "./boolean";
// import "./fields/input.css";
import Select from "./select";
import Checkbox from "./checkbox";
import Radio from "./radio";
// import AutoComplete from "./fields/material/autocomplete"

const BootstrapFields = ({ field, onFieldChange, FieldObj }) => {
  // console.log(field);

  // FieldObj.input_attributes();
  switch (field.input) {
    case "email":
    case "number":
    case "url":
    case "text":
      return (
        <Text field={field} FieldObj={FieldObj} onFieldChange={onFieldChange} />
      );
    case "boolean":
      return (
        <Boolean
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );
    case "select":
      return (
        <Select
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );
    case "checkbox":
      return (
        <Checkbox
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );

    case "radio":
      return (
        <Radio
          field={field}
          FieldObj={FieldObj}
          onFieldChange={onFieldChange}
        />
      );

    default:
      return "";
  }
};

export default BootstrapFields;
