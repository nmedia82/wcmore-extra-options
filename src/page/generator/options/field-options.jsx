import React, { useState, useEffect } from "react";
import { Button, Card } from "react-bootstrap";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  wcforce_generate_option_schema,
  wcmore_get_field_id,
} from "./../../../common/helper";
import Option from "./option";
import { PlusCircleFill, TrashFill, Copy } from "react-bootstrap-icons"; // Assuming Bootstrap Icons

const FieldOption = ({ options, input_type, onFieldOptionChange }) => {
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
    onFieldOptionChange(options);
  };

  const onOptionClone = (option) => {
    const new_option = { ...option, option_id: wcmore_get_field_id() };
    const options = [...Options, new_option];
    setOptions(options);
    onFieldOptionChange(options);
  };

  const onOptionDelete = (option_id) => {
    const filteredOptions = Options.filter(
      (opt) => opt.option_id !== option_id
    );
    setOptions(filteredOptions);
    onFieldOptionChange(filteredOptions);
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(Options);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setOptions(items);
    onFieldOptionChange(items);
  };

  const handleOptionChange = (index, e) => {
    const options = Options.map((option, optionIndex) => {
      if (optionIndex === index) {
        return {
          ...option,
          [e.target.name]: e.target.value,
        };
      }
      return option;
    });

    console.log(options);
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
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {Options.map((option, index) => (
                <Draggable
                  key={option.option_id}
                  draggableId={option.option_id}
                  index={index}
                >
                  {(provided) => (
                    <Card
                      className="mb-3"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <Card.Header
                        className="d-flex justify-content-between align-items-center"
                        {...provided.dragHandleProps}
                      >
                        <span>{option.label || "Option"}</span>
                        <div>
                          <Button
                            variant="info"
                            size="sm"
                            onClick={() => onOptionClone(option)}
                            className="me-2"
                          >
                            <Copy />
                          </Button>
                          <Button
                            variant="danger"
                            size="sm"
                            onClick={() => onOptionDelete(option.option_id)}
                          >
                            <TrashFill />
                          </Button>
                        </div>
                      </Card.Header>
                      <Card.Body>
                        <Option
                          option={option}
                          onOptionMetaChange={(e) =>
                            handleOptionChange(index, e)
                          }
                        />
                      </Card.Body>
                    </Card>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default FieldOption;
