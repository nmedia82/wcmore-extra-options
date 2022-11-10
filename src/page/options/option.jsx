import Text from "./../../fields/text";
import Boolean from "./../../fields/boolean";
import "./../../fields/input.css";
import Select from "./../../fields/select";
import { wcforce_get_default_options } from "../../common/helper";
import { CopyIcon, XCircleFillIcon } from "@primer/octicons-react";

function Option({ option, SavedFields, onOptionMetaChange, onIconClick }) {
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
        const options = wcforce_get_default_options(k, SavedFields);
        return {
          name: k,
          type: "select",
          title: k,
          value: value,
          options: ["Select", ...options],
          row_id: option["option_id"],
        };
      case "icon_delete":
        return {
          type: "icon_delete",
        };
      case "icon_clone":
        return {
          type: "icon_clone",
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
      case "icon_delete":
        return (
          <span
            onClick={() => onIconClick("delete", option)}
            className="wcforce-icon-wrapper delete"
          >
            <XCircleFillIcon size={24} />
          </span>
        );
      case "icon_clone":
        return (
          <span
            onClick={() => onIconClick("clone", option)}
            className="wcforce-icon-wrapper clone"
          >
            <CopyIcon size={24} />
          </span>
        );

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
