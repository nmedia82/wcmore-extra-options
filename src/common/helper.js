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

export function wcforce_generate_field_id(title) {
  // Convert the title to lowercase
  let fieldId = title.toLowerCase();

  // Replace spaces with underscores (or you could use dashes)
  fieldId = fieldId.replace(/\s+/g, "_");

  // Remove special characters
  fieldId = fieldId.replace(/[^a-z0-9_]/g, "");

  return fieldId;
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

export function wcforce_get_meta_value(meta, key) {
  const f = meta.find((m) => m.name === key);
  if (f.value) return f.value;
  return null;
}

export function wcforce_get_field_header(meta) {
  const title = wcforce_get_meta_value(meta, "title");
  const type = wcforce_get_meta_value(meta, "input"); // Get the type from the meta

  if (title) {
    const id = wcforce_get_meta_value(meta, "field_id");
    if (id && type) {
      return `${title} (${id}) - ${type}`; // Include type in the return string
    } else if (id) {
      return `${title} (${id})`;
    }
    return `${title} - ${type}`; // Handle case where there might not be an id but there is a type
  }
  return "New Field";
}

export const wcforce_generate_fields_meta = (Fields) => {
  return new Promise((resolve) => {
    const frontend_fields = Fields.map((f) => {
      // Reduce the meta array into an object where each item's name becomes a key
      const metaObject = f.meta.reduce((acc, m) => {
        acc[m.name] = m.value;
        acc["options"] = f.options; // Assuming options is directly on f
        acc["conditions"] = f.conditions; // Assuming conditions is directly on f
        return acc;
      }, {});

      // Return a new object merging the base field object with the meta object
      return {
        id: f.id,
        ...metaObject,
      };
    });

    resolve(frontend_fields);
  });
};
