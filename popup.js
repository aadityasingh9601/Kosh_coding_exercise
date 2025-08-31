const transferButton = document.getElementById("transferBtn");

transferButton.addEventListener("click", async () => {
  //Get the current active tab, as we'll need it while sending the msg to get the data.
  const [tab] = await chrome.tabs.query({
    active: true,
    lastFocusedWindow: true,
  });
  //Send message to contentScript.js to give us the data.
  const response = await chrome.tabs.sendMessage(tab.id, { action: "getData" });

  if (!response) {
    return alert("Data not received!");
  }

  //Now that we've the data, store it locally for a while as we'll be using it on the web page B.
  await chrome.storage.local.set({ transferData: response });

  //Open the second tab here, rest of the work will happen on that page now.
  chrome.tabs.create({
    url: "https://www.w3schools.com/howto/howto_css_contact_form.asp",
  });
});
