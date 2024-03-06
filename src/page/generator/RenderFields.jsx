import React from "react";
import Text from "./fields/text";
import Select from "./fields/select";
import Boolean from "./fields/boolean";

const RenderFields = ({ meta, onInputChange, handleOptionRemoval }) => {
  switch (meta.type) {
    case "text":
      return <Text onMetaChange={onInputChange} meta={meta} />;
    case "select":
      return <Select onMetaChange={onInputChange} meta={meta} />;
    case "boolean":
      return <Boolean onMetaChange={onInputChange} meta={meta} />;
    default:
      return null;
  }
};

export default RenderFields;
