//After clicking on the button, we must scrape the data from web page A and then send it to the other web page through
//message passing. So, basically we're writing a contentScript for it.

const getFirstRowData = () => {
  //Selecting the table and extracting the first row of data.
  const row = document.querySelector("#customers tr:nth-child(2)");

  if (!row) {
    return alert("Data not found!");
  }
  //Selecting all cells of the row.
  const cells = row.querySelectorAll("td");

  return {
    company: cells[0].innerText,
    contact: cells[1].innerText,
    country: cells[2].innerText,
  };
};

//To receive the message, set up a runtime.onMessage event listener.

//When user clicks on the transfer data button, a msg will be sent, listen for that message, and as soon as they message
//to get the page data, do the following task.
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.action === "getData") {
    const tableData = getFirstRowData();
    sendResponse(tableData);
  }
});
