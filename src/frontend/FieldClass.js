import { wcforce_get_field_label_class } from "../common/helper";

export class FieldClass {
  constructor(field) {
    this.field = field;
  }

  name() {
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

  class() {
    return `cforce-field ${this.field.id} ${this.field.input_type}`;
  }

  label() {
    if (this.field.title) {
      return (
        <label for={this.id()} className={this.label_class()}>
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
