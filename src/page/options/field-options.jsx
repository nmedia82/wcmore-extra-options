import { CopyIcon, XCircleFillIcon } from "@primer/octicons-react";
import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  wcforce_generate_option_schema,
  wcmore_get_field_id,
  wcmore_get_input_value,
} from "./../../common/helper";
import Option from "./option";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

function FieldOption({ options, input_type, onFieldOptionChange }) {
  const [Options, setOptions] = useState([]);
  const option_schema = wcforce_generate_option_schema(input_type);

  useEffect(() => {
    setOptions(options);
  }, [options]);

  const onAddOption = () => {
    const options = [
      ...Options,
      { ...option_schema, option_id: wcmore_get_field_id() },
    ];
    // console.log(options);
    setOptions(options);
  };

  const onOptionClone = (option) => {
    console.log(option);
    const new_option = { ...option, option_id: wcmore_get_field_id() };
    const options = [...Options, new_option];
    setOptions(options);
  };

  const onOptionDelete = (option) => {
    const exclude = Options.filter((opt) => opt.option_id !== option.option_id);
    onFieldOptionChange(exclude);
  };

  const handleOptionMetaChange = (e, setting) => {
    // console.log(e.target.name);
    const input_value = wcmore_get_input_value(e);
    setting.value = input_value;
    const options = [...Options];
    let found = options.find((o) => o.option_id === setting.row_id);
    let index = options.indexOf(found);
    options[index][e.target.name] = input_value;
    // setOptions(options);
    onFieldOptionChange(options);
  };

  function onDragEnd(result) {
    if (!result.destination) {
      return;
    }

    if (result.destination.index === result.source.index) {
      return;
    }

    const options = reorder(
      Options,
      result.source.index,
      result.destination.index
    );

    onFieldOptionChange(options);
  }

  const handleIconClick = (event, option) => {
    if (event === "delete") {
      onOptionDelete(option);
    } else if (event === "clone") {
      onOptionClone(option);
    }
  };
  return (
    <div>
      <div className="wcforce-create-option">
        <button onClick={() => onAddOption()}>Create Option</button>
      </div>

      <div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="wcmore-field-list">
            {(provided) => (
              <div
                className="wcmore-field-settings"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {Options.map((option, i) => (
                  <Draggable
                    draggableId={option.option_id}
                    index={i}
                    key={option.option_id}
                  >
                    {(provided) => (
                      <div
                        className="wcforce-option-wrapper"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Option
                          option={option}
                          onOptionMetaChange={handleOptionMetaChange}
                          onIconClick={handleIconClick}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default FieldOption;
