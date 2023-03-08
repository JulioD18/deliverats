/**
 * Checks that the form is valid
 * @param {string[]} categories The categories of the form
 * @param {object[]} items The items of the form
 * @param {object[]} options The options of the form
 * @returns An error message if the form is invalid, null otherwise
 */
export function validateForm(categories, items, options) {
  // Check that categories, items and options are arrays
  if (!Array.isArray(categories)) {
    return "Categories must be an array";
  } else if (!Array.isArray(items)) {
    return "Items must be an array";
  } else if (!Array.isArray(options)) {
    return "Options must be an array";
  }
  // Check that categories and items are not empty
  if (categories.length === 0) {
    return "Categories cannot be empty";
  } else if (items.length === 0) {
    return "Items cannot be empty";
  }
  // Check that all items have a valid category
  for (const item of items) {
    if (!categories.includes(item.category)) {
      return "Item " + item.name + " has an invalid category";
    }
  }
  // Check that all options are applied to valid items
  const itemNames = items.map((item) => item.name);
  for (const option of options) {
    for (const item of option.items) {
      if (!itemNames.includes(item)) {
        return "Option " + option.name + " has an invalid item";
      }
    }
  }
  return null;
}
