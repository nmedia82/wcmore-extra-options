import { FieldClass } from "./FieldClass";
import Text from "./text";
import Boolean from "./boolean";
// import "./input.css";
import Select from "./select";
import Checkbox from "./checkbox";

const Field = ({ field, onFieldChange }) => {
  const FieldObj = new FieldClass(field);
  // console.log(FieldObj);
  // FieldObj.input_attributes();
  switch (field.input_type) {
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

    default:
      return "";
  }
};

export default Field;
