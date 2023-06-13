const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

// Create a new WebDriver instance
let driver =  new Builder().forBrowser(Browser.CHROME).build();

// Get the links to visit
const links = ['https://www.google.com'];

// Loop through the links
for (let i = 0; i < links.length; i++) {

  // Visit the link
  driver.get(links[i]);

  // Wait for the page to load
 // driver.wait(until.titleIs(links[i]));

  // Fetch the data from the page
  //const data = driver.getTitle().then((title)=>console.log(title));

  // Print the data
  //console.log(data);
}

// Quit the WebDriver instance
driver.quit();
