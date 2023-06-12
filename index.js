const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let links = [];
let data=[];
let dataStruct={
  about:"",
  stars:"",
  links:"",


}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
(async function example() {
  9;
  let driver = await new Builder().forBrowser(Browser.CHROME).build();
  try {
    await driver.get("https://github.com/trending");

    await driver.findElements(By.className("Box-row")).then((elements) => {
      elements.map((element) =>
        element.findElement(By.css("h2 > a")).then((element) => {
          element.getAttribute("href").then((text) => {links.push(text);}); })); });
      
    await sleep(1500);
  links =[...links.slice(0,10)]
  links.forEach(async(link) => {
    driver.get(link);
    console.log(driver.title);
    await driver.sleep(10000);
  });

    
    // links.map(async(link) =>{
      
    //   await driver.get(link)
    //   const stars = await driver.findElement(By.id("repo-stars-counter-star"))
    //   stars.getText().then((text) => {console.log(text)});
    //   await sleep(15500);
    //   driver.sleep(5000)
      
      
    // })
    // links.forEach(link => {
    //   driver.get(link);
    //   console.log(driver.title);
    // });
    
  } finally {
    console.log("hello")
    await sleep(3500);
    console.log(links);
    await driver.quit();
  }
})();
