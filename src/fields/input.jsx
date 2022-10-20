import Text from "./text";
import Boolean from "./boolean";

function RenderInput(meta) {
  switch (meta.type) {
    case "text":
      return <Text meta={meta} />;
    case "boolean":
      return <Boolean meta={meta} />;

    default:
      return "";
  }
}

const Input = ({ meta }) => {
  return RenderInput(meta);
};

export default Input;
