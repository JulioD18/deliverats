export function formatDelivery({ form = undefined, formValues }) {
  console.log(formValues);
  const values = JSON.parse(JSON.stringify(formValues));
  values.items = getValues(values.items);
  for (let item of values.items) {
    item.options = getValues(item.options);
  }
  if (form) values.owner = form.owner;

  return values;
}

function getValues(dictionary) {
  const values = [];
  for (let key in dictionary) values.push(dictionary[key]);
  return values;
}
