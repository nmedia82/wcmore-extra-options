export function ExtraField(field) {
  return {
    label: field.label,
    details: field.details,
    icon: field.icon,
    meta: field.meta,
    init() {
      // dynamically getter/setter
      for (let p in this) {
        // console.log(p, typeof this[p]);
        if (typeof this[p] === "string") {
          Object.defineProperty(this, `${titleCase(p)}`, {
            get: function () {
              return this[p];
            },
            set: function (a) {
              this[p] = a;
            },
          });
        }
      }

      //
    },
  };
}

export function FieldMeta(meta) {
  return {};
}

function titleCase(string) {
  return string[0].toUpperCase() + string.slice(1).toLowerCase();
}
