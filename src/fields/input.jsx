import Text from "./text";
import Boolean from "./boolean";
import "./input.css";
import Select from "./select";

const Input = ({ meta, onMetaChange }) => {
  switch (meta.type) {
    case "text":
      return <Text meta={meta} onMetaChange={onMetaChange} />;
    case "boolean":
      return <Boolean meta={meta} onMetaChange={onMetaChange} />;
    case "select":
      return <Select meta={meta} onMetaChange={onMetaChange} />;

    default:
      return "";
  }
};

export default Input;
