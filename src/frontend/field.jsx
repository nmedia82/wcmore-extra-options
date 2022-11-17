import { FieldClass } from "./FieldClass";
import Text from "./fields/text";
import Boolean from "./fields/boolean";
// import "./fields/input.css";
import Select from "./fields/select";
import Checkbox from "./fields/checkbox";
import Radio from "./fields/radio";

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

export default Field;
