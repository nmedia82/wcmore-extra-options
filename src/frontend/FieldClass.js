export class FieldClass {
  constructor(field, conditionally_bound = null) {
    this.field = field;
    this.conditionally_bound = conditionally_bound;
  }

  name() {
    if (this.input_type() === "checkbox")
      return `wcforce[${this.field.field_id}][]`;
    return `wcforce[${this.field.field_id}]`;
  }
  id() {
    return this.field.field_id;
  }
  placeholder() {
    let placeholder = "";
    if (this.field.type === "text") placeholder = this.field.title;
    return placeholder;
  }
  title() {
    return this.field.title;
  }
  description() {
    return this.field.description;
  }
  prefix() {
    return this.field.prefix;
  }
  input_type() {
    return this.field.input;
  }
  default_value() {
    if (this.has_multi_values())
      return this.field.value !== undefined ? this.field.value : [];
    else return this.field.value !== undefined ? this.field.value : "";
  }
  options() {
    return this.field.options !== undefined ? this.field.options : [];
  }
  col() {
    return this.field.col ? Number(this.field.col) : 12;
  }
  required() {
    return !this.field.is_required ? false : true;
  }

  class() {
    let classname = `wcforce-field ${this.field.field_id} ${this.field.input}`;
    if (this.conditionally_bound.includes(this.id())) {
      classname += " conditionally-bound";
    }
    return classname;
  }
  has_multi_values() {
    return this.field.has_multi_values || this.input_type() === "checkbox"
      ? true
      : false;
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
    return `wcforce-label ${this.field.field_id} ${this.input_type()}`;
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
