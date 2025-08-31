//After clicking on the button, we must scrape the data from web page A and then send it to the other web page through
//message passing. So, basically we're writing a contentScript for it.

const getFirstRowData = () => {
  //We knew the id of the table by inspecting on the web page of w3 schools.
  //Selecting the table and extracting the first row of data.
  const row = document.querySelector("#customers tr:nth-child(2)");
  //console.log(row);
  //Selecting all cells of the row.
  const cells = row.querySelectorAll("td");
  //console.log(cells);
  return {
    company: cells[0].innerText,
    contact: cells[1].innerText,
    country: cells[2].innerText,
  };
};

//Now we've to send this data to the other web page.
//To receive the message, set up a runtime.onMessage event listener.

//When user clicks on the transfer data button, a msg will be sent, listen for that message, and as soon as they message
//to get the page data, do the following task.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  console.log(sender);
  console.log(msg);
  if (msg.action === "getData") {
    //If they're asking data, send them.
    const tableData = getFirstRowData();
    sendResponse(tableData);
  }
});
