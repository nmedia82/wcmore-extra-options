import Text from "./../../fields/text";
import Boolean from "./../../fields/boolean";
import "./../../fields/input.css";
import Select from "./../../fields/select";

function Option({ option, onOptionMetaChange }) {
  const get_option_meta = (k) => {
    const value = option[k];
    switch (k) {
      case "image":
        return {
          name: k,
          type: "option_image",
          title: k,
          value: value,
        };
      // these two is for conditions rules options
      case "field":
      case "operator":
        return {
          name: k,
          type: "select",
          title: k,
          options: value,
        };
      default:
        return {
          name: k,
          type: "text",
          title: k,
          value: value,
          row_id: option["option_id"],
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
      case "option_image":
        return <span className="wcforce-img-placeholder">M</span>;

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
