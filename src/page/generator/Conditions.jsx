import React, { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { PlusCircle, Trash } from "react-bootstrap-icons";
import { wcforce_get_meta_value } from "../../common/helper";

const Rule = ({ savedFields, rule, onRuleChange, onRemoveRule }) => (
  <Row className="mb-2">
    <Col>
      <Form.Select
        aria-label="Field ID"
        value={rule.field_id}
        onChange={(e) => onRuleChange("field_id", e.target.value)}
      >
        <option value="">Select Field</option>
        {savedFields.map((field) => (
          <option
            key={field.id}
            value={wcforce_get_meta_value(field.meta, "field_id")}
          >
            {wcforce_get_meta_value(field.meta, "title")}
          </option>
        ))}
      </Form.Select>
    </Col>
    <Col>
      <Form.Select
        aria-label="Condition"
        value={rule.condition}
        onChange={(e) => onRuleChange("condition", e.target.value)}
      >
        <option value="is">is</option>
        <option value="not">not</option>
        <option value="less than">less than</option>
        <option value="greater than">greater than</option>
      </Form.Select>
    </Col>
    <Col>
      <Form.Control
        type="text"
        placeholder="Value"
        value={rule.value}
        onChange={(e) => onRuleChange("value", e.target.value)}
      />
    </Col>
    <Col md="auto">
      <Button variant="danger" onClick={onRemoveRule}>
        <Trash /> {/* Use Trash icon for delete */}
      </Button>
    </Col>
  </Row>
);

const FieldConditions = ({ savedFields, onSaveConditions }) => {
  //   console.log(savedFields);
  const [visibility, setVisibility] = useState(true); // true for 'Show', false for 'Hide'
  const [ruleBound, setRuleBound] = useState(true); // true for 'all', false for 'any'
  const [rules, setRules] = useState([]);

  const handleAddRule = () => {
    setRules([...rules, { field_id: "", condition: "is", value: "" }]);
  };

  const handleRuleChange = (index, key, value) => {
    const updatedRules = rules.map((rule, i) =>
      i === index ? { ...rule, [key]: value } : rule
    );
    setRules(updatedRules);
  };

  const handleRemoveRule = (index) => {
    setRules(rules.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    onSaveConditions({
      visibility,
      ruleBound,
      rules,
    });
  };

  const toggleVisibility = (checked) =>
    setVisibility(checked ? "show" : "hide");
  const toggleRuleBound = (checked) => setRuleBound(checked ? "all" : "any");

  return (
    <div>
      <Form>
        <Row className="align-items-center mb-3">
          <Col>
            <Button variant="primary" onClick={handleAddRule} className="mb-3">
              <PlusCircle /> {/* Use PlusCircle icon for add */}
            </Button>
          </Col>
        </Row>

        {/* Convert to switch and use state to interpret hide/show and all/any */}
        <Row className="align-items-center mb-3">
          <Col xs={6}>
            <Form.Check
              type="switch"
              id="visibility-switch"
              label={visibility === "show" ? "Show" : "Hide"}
              checked={visibility === "show"}
              onChange={(e) => toggleVisibility(e.target.checked)}
            />
          </Col>
          <Col xs={6}>
            <Form.Check
              type="switch"
              id="ruleBound-switch"
              label={ruleBound === "all" ? "All" : "Any"}
              checked={ruleBound === "all"}
              onChange={(e) => toggleRuleBound(e.target.checked)}
            />
          </Col>
        </Row>

        <h5>Rules</h5>
        {rules.map((rule, index) => (
          <Rule
            key={index}
            rule={rule}
            onRuleChange={(key, value) => handleRuleChange(index, key, value)}
            onRemoveRule={() => handleRemoveRule(index)}
            savedFields={savedFields}
          />
        ))}

        <div className="mt-3">
          <Button variant="success" onClick={handleSubmit}>
            Save Conditions
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default FieldConditions;
