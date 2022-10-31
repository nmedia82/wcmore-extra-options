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
