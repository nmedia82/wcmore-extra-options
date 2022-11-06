import Text from "./../../fields/text";
import Boolean from "./../../fields/boolean";
import "./../../fields/input.css";
import Select from "./../../fields/select";
import { wcmore_get_field_id } from "../../common/helper";

function Option({ option, onOptionMetaChange }) {
  const get_option_meta = (k) => {
    switch (k) {
      case "image":
        return {
          name: wcmore_get_field_id(),
          type: "option_image",
          title: option[k],
          value: "",
        };
      default:
        return {
          name: wcmore_get_field_id(),
          type: "text",
          title: option[k],
          value: "",
        };
    }
  };

  const renderInput = (meta) => {
    switch (meta.type) {
      case "text":
        return <Text meta={meta} onMetaChange={onOptionMetaChange} />;
      case "boolean":
        return <Boolean meta={meta} onMetaChange={onOptionMetaChange} />;
      case "select":
        return <Select meta={meta} onMetaChange={onOptionMetaChange} />;

      default:
        return "";
    }
  };
  return (
    <div className="wcforce-meta-option-row">
      {Object.keys(option).map((o, i) => {
        const meta = get_option_meta(o);
        return (
          <div key={i} className={`wcforce-option-single ${o}`}>
            {renderInput(meta)}
          </div>
        );
      })}
    </div>
  );
}

export default Option;
