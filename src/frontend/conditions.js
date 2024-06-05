// conditions.js

export const isConditionallyHidden = (field, userValues = [], fields) => {
  if (!field.conditions || field.conditions.length === 0) {
    return false;
  }

  const { visibility, ruleBound, rules } = field.conditions;
  const shouldHideByDefault = visibility !== "show";
  const ruleMatches = rules.map((rule) =>
    matchRule(rule, userValues, field.field_id, fields)
  );

  const anyRuleMatched = ruleMatches.some(Boolean);
  const allRulesMatched = ruleMatches.every(Boolean);

  switch (ruleBound) {
    case "all":
      return shouldHideByDefault ? allRulesMatched : !allRulesMatched;
    case "any":
      return shouldHideByDefault ? anyRuleMatched : !anyRuleMatched;
    default:
      return false;
  }
};

const matchRule = (rule, userValue, fieldId, fields) => {
  if (rule.field_id !== fieldId) {
    const field = fields.find((f) => f.field_id === rule.field_id);
    userValue = field?.value || null;
  }
  switch (rule.condition) {
    case "is":
      return Array.isArray(userValue)
        ? userValue.includes(rule.value)
        : userValue === rule.value;
    case "not":
      return Array.isArray(userValue)
        ? !userValue.includes(rule.value)
        : userValue !== rule.value;
    case "greater than":
      return Number(userValue) > Number(rule.value);
    case "less than":
      return Number(userValue) < Number(rule.value);
    default:
      return false;
  }
};
