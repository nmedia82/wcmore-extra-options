export function wcmore_get_input_value(input) {
  switch (input.target.type) {
    case "checkbox":
      return input.target.checked;
    default:
      return input.target.value;
  }
}

export function wcmore_get_field_id() {
  var text = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

export function wcmore_create_field_title(field) {
  let title = "New Field";
  const meta_title = field.title;
  if (meta_title) {
    title = `${meta_title}`;
  }
  return (
    <span>
      {title} <small>{`(${field.input_type})`}</small>
    </span>
  );
}

export function wcforce_get_meta_default_value(meta) {
  switch (meta.name) {
    case "options":
      return [];
    default:
      return "";
  }
}

// return option schema based option type
export function wcforce_generate_option_schema(input_type) {
  const option_schema = {
    label: "",
    price: "",
    weight: "",
    discount: "",
    stock: "",
    option_id: "",
    icon_delete: "",
    icon_clone: "",
  };
  switch (input_type) {
    case "image":
      delete option_schema.label;
      return { image: "", ...option_schema };
    default:
      return option_schema;
  }
}

// getting default options for Options and Conditions options
export function wcforce_get_default_options(key, SavedFields) {
  switch (key) {
    // all operators for conditions
    case "operator":
      return ["is", "not", "greater than", "less than"];
    // all field titles for conditions
    case "field":
      return SavedFields.map((value) => value.field_id).filter(
        (v) => v !== undefined
      );

    default:
      return [];
  }
}
