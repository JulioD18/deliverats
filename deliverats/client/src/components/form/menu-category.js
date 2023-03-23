import React, { useEffect } from "react";

import MenuItem from "./menu-item";

export default function MenuCategory({
  formValues,
  setFormValues,
  items,
  formatter,
  setError,
}) {
  useEffect(() => {}, [formValues]);

  /**
   * Changes the quantity of an item in the order
   * @param {Object} item The item whose quantity will change
   * @param {number} change The change in the quantity of the item
   */
  function changeQuantity(item, change) {
    const newFormValues = { ...formValues };
    if (newFormValues.items[item.name] === undefined) {
      const newItem = {
        name: item.name,
        price: item.price,
        quantity: 0,
        options: {},
      };
      newFormValues.items[item.name] = newItem;
    }
    newFormValues.items[item.name].quantity += change;
    if (newFormValues.items[item.name].quantity <= 0)
      delete newFormValues.items[item.name];
    newFormValues.total = calculateTotal(newFormValues.items);
    setError(undefined);
    setFormValues(newFormValues);
  }

  /**
   * Returns the total price of the order
   * @param {Object[]} items
   * @returns The total price of the order
   */
  function calculateTotal(items) {
    let total = 0;
    for (let item in items) {
      total += items[item].price * items[item].quantity;
      for (let option in items[item].options) {
        total += items[item].options[option].price * items[item].quantity;
      }
    }
    return total;
  }

  /**
   * Adds/removes an option in the order
   * @param {Object} option The option object
   * @param {string} itemName The name of the item
   * @param {boolean} selected Wether the option was selected or deselected
   */
  function optionSelect(option, itemName, selected) {
    const newFormValues = { ...formValues };
    if (newFormValues.items[itemName] === undefined) return;
    if (selected) {
      newFormValues.items[itemName].options[option.name] = {
        name: option.name,
        price: option.price,
      };
    } else {
      delete newFormValues.items[itemName].options[option.name];
    }
    newFormValues.total = calculateTotal(newFormValues.items);
    setFormValues(newFormValues);
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item) => (
          <MenuItem
            key={item.name}
            formValues={formValues}
            changeQuantity={changeQuantity}
            optionSelect={optionSelect}
            item={item}
            formatter={formatter}
          ></MenuItem>
        ))}
    </React.Fragment>
  );
}
