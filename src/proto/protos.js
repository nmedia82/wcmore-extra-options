export class FieldClass {
  constructor(params) {
    this.label = params.label;
    this.details = params.details;
    this.icon = params.icon;
    this.meta = params.meta.map((m) => (m = { ...m, value: "" })); // init meta value
  }
}
