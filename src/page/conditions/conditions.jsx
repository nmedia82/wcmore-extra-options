import { useState, useEffect } from "react";
import Option from "../options/option";

function ConditionSettings({ SavedFields, field, onConditionUpdate }) {
  const [Condition, setCondition] = useState({ ...field.conditions });
  const [Rules, setRules] = useState([]);
  const condition_schema = {
    field: [],
    operator: ["is", "not", "greater than", "less than"],
    value: "",
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "status" && e.target.checked) value = e.target.checked;
    const condition = { ...Condition, [name]: value };
    console.log(name, value, condition);
    setCondition(condition);
    onConditionUpdate(condition);
  };

  // adding rules
  const addRule = () => {
    const condition = { ...Condition };
    console.log(SavedFields);
    condition.rules = [...condition.rules, { ...condition_schema, fields: [] }];
    // console.log(rules);
    // setRules(rules);
    // console.log(condition);
    setCondition(condition);
    onConditionUpdate(condition);
  };

  const handleOptionMetaChange = (e, setting) => {
    // console.log(e.target.name);
    // const input_value = wcmore_get_input_value(e);
    // setting.value = input_value;
    // const options = [...Options];
    // let found = options.find((o) => o.option_id === setting.row_id);
    // let index = options.indexOf(found);
    // options[index][e.target.name] = input_value;
    // // setOptions(options);
    // onFieldOptionChange(options);
  };

  const { status, visibility, bound, rules } = Condition;

  return (
    <div className="wcforce-conditions-wrapper">
      <div className="wcforce-conditions left">
        <label>
          <input
            type="checkbox"
            value={status}
            onChange={(e) => handleChange(e)}
            name="status"
            checked={status === true}
          />
          Enable
        </label>

        <section>
          <header>Visibility</header>
          <label>
            <input
              type="radio"
              name="visibility"
              value="show"
              onChange={(e) => handleChange(e)}
              checked={visibility === "show"}
            />
            Show
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="hide"
              onChange={(e) => handleChange(e)}
              checked={visibility === "hide"}
            />
            Hide
          </label>
        </section>
        <section>
          <header>Bound</header>
          <label>
            <input
              type="radio"
              name="bound"
              value="all"
              onChange={(e) => handleChange(e)}
              checked={bound === "all"}
            />
            All
          </label>
          <label>
            <input
              type="radio"
              name="bound"
              value="any"
              onChange={(e) => handleChange(e)}
              checked={bound === "any"}
            />
            Any
          </label>
        </section>

        <button onClick={() => addRule()}>Add Rule</button>
      </div>
      <div className="wcforce-conditions right">
        {rules.map((rule, i) => {
          return (
            <Option
              key={i}
              option={rule}
              onOptionMetaChange={handleOptionMetaChange}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ConditionSettings;
