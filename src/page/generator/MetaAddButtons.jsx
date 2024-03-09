import React from "react";
import { Button, Container } from "react-bootstrap";
// import "./styles.css"; // Make sure to import your stylesheet

const MetaAddButtons = ({ meta, onAddField }) => {
  return (
    <Container className="d-flex justify-content-center gap-1 align-items-center py-3">
      {meta.map((item, index) => (
        <Button
          key={index}
          variant="primary"
          className="mb-2 no-rounded-corners" // Use the custom class
          onClick={() => onAddField(item)}
        >
          {item.label}
        </Button>
      ))}
    </Container>
  );
};

export default MetaAddButtons;
