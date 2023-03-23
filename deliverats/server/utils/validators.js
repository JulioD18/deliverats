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
    } else if (!option.items || option.items.length === 0) {
      return "Option '" + option.name + "' has no items";
    } else if (
      !option.price ||
      option.price === "" ||
      isNaN(parseFloat(option.price)) ||
      parseFloat(option.price) < 0
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

/**
 * Checks that the delivery is valid
 * @param {string[]} categories The categories of the delivery
 * @param {object[]} items The items of the delivery
 * @param {object[]} options The options of the delivery
 * @returns An error message if the delivery is invalid, null otherwise
 */
export function validateDelivery(delivery) {
  const items = delivery.items;

  // Check that there's a name and description
  if (!delivery.name || delivery.name === "") {
    return "Delivery has no name";
  } else if (!delivery.lastName || delivery.lastName === "") {
    return "Delivery has no last name";
  } else if (!delivery.email || delivery.email === "") {
    return "Delivery has no email";
  } else if (!delivery.phone || delivery.phone === "") {
    return "Delivery has no phone";
  } else if (!delivery.address || delivery.address === "") {
    return "Delivery has no address";
  } else if (!delivery.latitude || delivery.latitude === "") {
    return "Delivery has no latitude";
  } else if (!delivery.longitude || delivery.longitude === "") {
    return "Delivery has no longitude";
  }

  // Check phone validity
  if (isNaN(parseInt(delivery.phone)) || parseInt(delivery.phone) <= 0) {
    return "Delivery has an invalid phone";
  }

  // Check that items is an array
  if (!Array.isArray(items)) {
    return "Items must be an array";
  }

  // Check that items is not empty
  if (items.length === 0) {
    return "Items cannot be empty";
  }

  return null;
}
