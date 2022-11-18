import { XCircleFillIcon } from "@primer/octicons-react";
import { useState, useEffect } from "react";
import {
  wcmore_get_field_id,
  wcmore_get_input_value,
} from "../../common/helper";
import Option from "../options/option";

function ConditionSettings({ SavedFields, field, onConditionUpdate }) {
  const [Condition, setCondition] = useState({ ...field.conditions });
  const condition_schema = {
    field: "",
    operator: "",
    value: "",
    option_id: "",
    icon_delete: "",
  };

  const handleChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;
    if (name === "status") value = e.target.checked;
    const condition = { ...Condition, [name]: value };
    // console.log(name, value, condition);
    setCondition(condition);
    onConditionUpdate(condition);
  };

  // adding rules
  const addRule = () => {
    const condition = { ...Condition };
    // console.log(SavedFields.map((value) => value.title));

    condition.rules = [
      ...condition.rules,
      {
        ...condition_schema,
        option_id: wcmore_get_field_id(),
      },
    ];
    // console.log(rules);
    // setRules(rules);
    console.log(condition);
    setCondition(condition);
    onConditionUpdate(condition);
  };

  const handleOptionMetaChange = (e, setting) => {
    const input_value = wcmore_get_input_value(e);
    const condition = { ...Condition };
    const rules = [...condition.rules];
    let found = rules.find((o) => o.option_id === setting.row_id);
    let index = rules.indexOf(found);
    rules[index][e.target.name] = input_value;
    setCondition(condition);
    onConditionUpdate(condition);
  };

  const handleIconClick = (event, rule) => {
    if (event === "delete") {
      onOptionDelete(rule);
    } else if (event === "clone") {
      //   no clone
    }
  };

  const onOptionDelete = (rule) => {
    const condition = { ...Condition };
    const rules = [...condition.rules];
    const exclude = rules.filter((opt) => opt.option_id !== rule.option_id);
    condition.rules = [...exclude];
    setCondition(condition);
    onConditionUpdate(condition);
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
              SavedFields={SavedFields}
              onOptionMetaChange={handleOptionMetaChange}
              onIconClick={handleIconClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default ConditionSettings;
