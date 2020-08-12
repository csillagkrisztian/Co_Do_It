function equal(a, b) {
  console.log(a, b);
  const condition = typeof a === "number" && typeof b === "number";
  const condition2 = typeof a === "string" && typeof b === "string";
  const condition3 = typeof a === "boolean" && typeof b === "boolean";
  const condition4 = typeof a === "undefined" && typeof b === "undefined";
  const condition5 = a === null && b === null;
  const condition6 = Array.isArray(a) && Array.isArray(b);
  const condition7 = a.length !== b.length;
  const condition8 = typeof a === "object" && typeof b === "object";

  if (condition) return a === b;
  if (condition2) return a === b;
  if (condition3) return a === b;
  if (condition4) return true;
  if (condition5) return true;
  if (condition6) {
    if (condition7) {
      return false;
    } else {
      for (let i = 0; i < a.length; i++) {
        if (!equal(a[i], b[i])) return false;
      }
      return true;
    }
  }
  if (condition8) {
    const keys_a = Object.keys(a);
    const keys_b = Object.keys(b);
    for (let key of keys_a) {
      if (!equal(a[key], b[key])) return false;
    }
    for (let key of keys_b) {
      if (!equal(a[key], b[key])) return false;
    }
    return true;
  }
  return false;
}

module.exports = { equal };
