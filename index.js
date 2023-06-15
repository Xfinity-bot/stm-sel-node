const { addToDB, test, deleteAll } = require("./mongodb");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");

let links = [];
let about = [];
let stars = [];
let data = [];

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
    }

    await sleep(500);
  } finally {
    await sleep(500);
    let sD = {
      link: "",
      author: "",
      repo: "",
      stars: "",
      about: "",
    };
    for (let i = 0; i < links.length; i++) {
      sD = {
        link: "",
        author: "",
        repo: "",
        stars: "",
        about: "",
      };
      sD.link = links[i];

      sD.author = links[i].split("/")[3];
      sD.repo = links[i].split("/")[4];
      sD.stars = stars[i];
      sD.about = about[i];
      //console.log(sD);
      data.push(sD);
      await addToDB(sD);
    }
    await driver.sleep(2500);
    //await deleteAll();
    await driver.quit();
  }
})();
