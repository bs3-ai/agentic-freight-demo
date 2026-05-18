export function parseRequiredString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0 ? value : null;
}

export function parsePositiveNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value > 0 ? value : null;
}
