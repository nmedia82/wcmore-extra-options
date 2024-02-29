import React, { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  wcforce_generate_option_schema,
  wcmore_get_field_id,
} from "../../common/helper";
import Option from "./option";
// Import your icon library here if you're replacing @primer/octicons-react
import { PlusCircleFill, TrashFill, Clipboard } from "react-bootstrap-icons"; // Example with Bootstrap Icons

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
    setOptions(options);
  };

  const onOptionClone = (option) => {
    const new_option = { ...option, option_id: wcmore_get_field_id() };
    const options = [...Options, new_option];
    setOptions(options);
  };

  const onOptionDelete = (option) => {
    const filteredOptions = Options.filter(
      (opt) => opt.option_id !== option.option_id
    );
    setOptions(filteredOptions);
    onFieldOptionChange(filteredOptions);
  };

  function onDragEnd(result) {
    if (!result.destination) return;
    if (result.destination.index === result.source.index) return;

    const options = reorder(
      Options,
      result.source.index,
      result.destination.index
    );
    setOptions(options);
    onFieldOptionChange(options);
  }

  const handleOptionChange = (index, e) => {
    const options = Options.map((option, optionIndex) => {
      if (optionIndex === index) {
        return {
          ...option,
          [e.target.id]: e.target.value,
        };
      }
      return option;
    });

    setOptions(options);
    onFieldOptionChange(options);
  };

  return (
    <div>
      <Button onClick={onAddOption} className="mb-3">
        <PlusCircleFill /> Create Option
      </Button>

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="options-list">
          {(provided) => (
            <ListGroup {...provided.droppableProps} ref={provided.innerRef}>
              {Options.map((option, index) => (
                <Draggable
                  key={option.option_id}
                  draggableId={option.option_id}
                  index={index}
                >
                  {(provided) => (
                    <ListGroup.Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="d-flex justify-content-between align-items-center mb-2"
                    >
                      <div {...provided.dragHandleProps}>
                        <Option
                          option={option}
                          onOptionMetaChange={(e) =>
                            handleOptionChange(index, e)
                          }
                        />
                      </div>
                      <div>
                        <Button
                          variant="info"
                          size="sm"
                          onClick={() => onOptionClone(option)}
                        >
                          <Clipboard />
                        </Button>{" "}
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => onOptionDelete(option)}
                        >
                          <TrashFill />
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ListGroup>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default FieldOption;
