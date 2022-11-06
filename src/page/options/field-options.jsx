import { useState, useEffect } from "react";
import { wcmore_get_input_value } from "./../../common/helper";
import Option from "./option";
const option_schema = {
  label: "Label",
  price: "Price",
  weight: "Weight",
  discount: "Discount",
  stock: "Stock",
  id: "ID",
};
function FieldOption({ meta }) {
  const [Options, setOptions] = useState([]);

  useEffect(() => {
    const options_meta = meta.find((m) => m.name === "options");
    console.log(options_meta);
    setOptions(options_meta.value);
  }, [meta]);

  const onAddOption = () => {
    const options = [...Options, { ...option_schema }];
    console.log(options);
    setOptions(options);
  };

  const handleOptionMetaChange = (e, setting) => {
    const input_value = wcmore_get_input_value(e);
    setting.value = input_value;
    console.log(e, setting);
    // const selected_field = { ...SelectedField };
    // console.log(selected_field);
    // let found = selected_field.meta.find((m) => m.name === setting.name);
    // let index = selected_field.meta.indexOf(found);
    // selected_field.meta[index] = setting;
  };
  return (
    <div>
      <div className="wcforce-create-option">
        <button onClick={() => onAddOption()}>Create Option</button>
      </div>

      <div>
        {Options.map((option, i) => (
          <Option
            key={option.toString()}
            option={option}
            onOptionMetaChange={handleOptionMetaChange}
          />
        ))}
      </div>
    </div>
  );
}

export default FieldOption;
