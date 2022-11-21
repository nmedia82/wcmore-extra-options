export class FieldClass {
  constructor(field, conditionally_bound = null) {
    this.field = field;
    this.conditionally_bound = conditionally_bound;
  }

  name() {
    if (this.input_type() === "checkbox")
      return `wcforce[][${this.field.field_id}][]`;
    return `wcforce[][${this.field.field_id}]`;
  }
  id() {
    return this.field.field_id;
  }
  placeholder() {
    let placeholder = "";
    if (this.field.type === "text") placeholder = this.field.title;
    return placeholder;
  }
  input_type() {
    return this.field.input_type;
  }

  class() {
    let classname = `wcforce-field ${this.field.field_id} ${this.field.input_type}`;
    if (this.conditionally_bound.includes(this.id())) {
      classname += " conditionally-bound";
    }
    return classname;
  }

  label() {
    if (this.field.title) {
      return (
        <label htmlFor={this.id()} className={this.label_class()}>
          {this.field.title}
        </label>
      );
    }
  }
  label_class() {
    return `wcforce-label ${this.field.field_id} ${this.field.type} ${this.field.input_type}`;
  }

  input_attributes() {
    let attributes = {};
    for (let key in this.field) {
      if (typeof this.field[key] !== "object")
        attributes = { ...attributes, [`data-${key}`]: this.field[key] };
    }
    return attributes;
  }
}