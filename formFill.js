//We've to fill the form with the data, so first of all let's get the data that we've initially stored locally.

chrome.storage.local.get("transferData", ({ transferData }) => {
  console.log(transferData);
  if (!transferData) return;

  document.querySelector("#fname").value = transferData.company;
  document.querySelector("#lname").value = transferData.contact;

  const select = document.querySelector("select[name='country']");

  //Selecting the option with the value transferData.country.
  let option = select.querySelector(`option[value="${transferData.country}"]`);

  //If the country that we're trying to set isn't present in the options,then we'll create a new option with the country
  //name, then we'll set it.
  if (!option) {
    // Create a new option if country doesn’t exist & append it.
    option = new Option(transferData.country, transferData.country);
    select.add(option);
  }

  //set the value of the select element
  select.value = transferData.country;
});
