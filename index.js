const { addToDB, test, deleteAll } = require("./mongodb");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let links = [];
let about = [];
let stars = [];
let data = [];
let imgSrc = [];

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
          element.getAttribute("href").then((text) => {
            links.push(text);
          });
        })
      );
    });

    await sleep(1500);
    links = [...links.slice(0, 10)];

    for (let i = 0; i < links.length; i++) {
      // Visit the link
      await driver.get(links[i]);
      //await driver.findElements(By.css(" a > span")).then((data)=>data.forEach(element => {element.getText().then((text)=>console.log(text))}))
      
      // Wait for the page to load
      let afterGithub = await links[i].substring(links[i].indexOf("m/") + 2);
      title = await afterGithub.substring(afterGithub.indexOf("/") + 1);
      await driver.wait(until.titleContains(title));

      // Fetch the data from the page
      await driver
        .findElement(By.id("repo-network-counter"))
        .getText()
        .then((text) => {
          stars.push(text);
        });
      await driver
        .findElement(By.className("f4 my-3"))
        .getText()
        .then((text) => {
          about.push(text);
        });

        await driver.findElement(By.className("url fn")).click();
        //await driver.wait(until.titleContains('Github'));

        await driver.sleep(2000)
       await driver.findElement(By.css('[itemprop="image')).getAttribute('src').then(async(text)=>{
          if (text===null){
           await driver.findElement(By.css('[itemprop="image')).getAttribute('href').then((text)=>{imgSrc.push(text)})
           await driver.sleep(1000)
          }else{
            imgSrc.push(text)
          }
        });
        await driver.sleep(5000)
      
        
   
    }

    await sleep(500);
  } finally {
    await deleteAll();
    await sleep(500);
    let sD = {
      link: "",
      author: "",
      repo: "",
      stars: "",
      about: "",
      imgSrc:"",
    };
    for (let i = 0; i < links.length; i++) {
      sD = {
        link: "",
        author: "",
        repo: "",
        stars: "",
        about: "",
        imgSrc:"",
      };
      sD.link = links[i];

      sD.author = links[i].split("/")[3];
      sD.repo = links[i].split("/")[4];
      sD.stars = stars[i];
      sD.about = about[i];
      sD.imgSrc = imgSrc[i];
      //console.log(sD);
      data.push(sD);
      await addToDB(sD);
    }
    await driver.sleep(2500);
    
    await driver.quit();
  }
})();
