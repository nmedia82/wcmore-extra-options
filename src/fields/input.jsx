import Text from "./text";
import Boolean from "./boolean";
import "./input.css";

const Input = ({ meta, onMetaChange }) => {
  switch (meta.type) {
    case "text":
      return <Text meta={meta} onMetaChange={onMetaChange} />;
    case "boolean":
      return <Boolean meta={meta} onMetaChange={onMetaChange} />;

    default:
      return "";
  }
};

export default Input;
