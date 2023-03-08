/**
 * Checks that the form is valid
 * @param {string[]} categories The categories of the form
 * @param {object[]} items The items of the form
 * @param {object[]} options The options of the form
 * @returns An error message if the form is invalid, null otherwise
 */
export function validateForm(form) {
  const categories = form.categories;
  const items = form.items;
  const options = form.options;

  // Check that there's a name and description
  if (!form.name || form.name === "") {
    return "Form has no name";
  } else if (!form.description || form.description === "") {
    return "Form has no description";
  }

  // Check phone validity if it exists
  if (
    form.phone &&
    form.phone !== "" &&
    (isNaN(parseInt(form.phone)) || parseInt(form.phone) <= 0)
  ) {
    return "Form has an invalid phone";
  }

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

  // Check that all items are valid
  for (const item of items) {
    if (!item.name || item.name === "") {
      return "An item doesn't have a name";
    } else if (!item.description || item.description === "") {
      return "Item '" + item.name + "' has an invalid description";
    } else if (!item.category || item.category.length === 0) {
      return "Item '" + item.name + "' has no categories";
    } else if (!categories.includes(item.category)) {
      return "Item '" + item.name + "' has an invalid category";
    } else if (
      !item.price ||
      item.price === "" ||
      isNaN(parseFloat(item.price)) ||
      parseFloat(item.price) <= 0
    ) {
      return "Item '" + item.name + "' has an invalid price";
    }
  }

  // Check that all options are valid
  const itemNames = items.map((item) => item.name);
  for (const option of options) {
    if (!option.name || option.name === "") {
      return "An option doesn't have a name";
    } else if (!option.description || option.description === "") {
      return "Option '" + option.name + "' has an invalid description";
    } else if (!option.items || option.items.length === 0) {
      return "Option '" + option.name + "' has no items";
    } else if (
      !option.price ||
      option.price === "" ||
      isNaN(parseFloat(option.price)) ||
      parseFloat(option.price) <= 0
    ) {
      return "Option '" + option.name + "' has an invalid price";
    }
    // Check that all items in the option are valid
    for (const item of option.items) {
      if (!itemNames.includes(item)) {
        return "Option '" + option.name + "' has an invalid item";
      }
    }
  }

  return null;
}
