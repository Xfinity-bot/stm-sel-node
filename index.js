const { addToDB,test ,deleteAll} = require ("./mongodb");
const { Builder, Browser, By, Key, until } = require("selenium-webdriver");


let links = [];
let about = [];
let stars = [];
let data = [];
// const linksT = [
//   'https://github.com/xiangsx/gpt4free-ts',
//   'https://github.com/intel/intel-one-mono',
//   'https://github.com/facebookresearch/audiocraft',
//   'https://github.com/Licoy/ChatGPT-Midjourney',
//   'https://github.com/Luodian/Otter',
//   'https://github.com/public-apis/public-apis',
//   'https://github.com/apple/sample-backyard-birds',
//   'https://github.com/dessalines/jerboa',
//   'https://github.com/microsoft/AI-For-Beginners',
//   'https://github.com/JushBJJ/Mr.-Ranedeer-AI-Tutor'
// ]
// const aboutT = [
//   'Providing a free OpenAI GPT-4 API ! This is a replication project for the typescript version of xtekky/gpt4free',
//   'Intel One Mono font repository',
//   'Audiocraft is a library for audio processing and generation with deep learning. It features the state-of-the-art EnCodec audio compressor / tokenizer, along with MusicGen, a simple and controllable music generation LM with textual and melodic conditioning.',
//   '🎨 一键拥有你自己的 ChatGPT+Midjourney 网页服务 | Own your own ChatGPT+Midjourney web service with one click',
//   "🦦 Otter, a multi-modal model based on OpenFlamingo (open-sourced version of DeepMind's Flamingo), trained on MIMIC-IT and showcasing improved instruction-following and in-context learning ability.",
//   'A collective list of free APIs',
//   'No description, website, or topics provided.',
//   'A native android app for Lemmy',
//   '12 Weeks, 24 Lessons, AI for All!',
//   'A GPT-4 AI Tutor Prompt for customizable personalized learning experiences.'
// ]
// const starsT = [
//   '427',  '134',
//   '289',  '249',
//   '136',  '27.7k',
//   '11',   '70',
//   '1.7k', '1.1k'
// ]
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
  // links.forEach(async(link) => {
  //   //await driver.switchTo().window(driver.getAllWindowHandles()[1]);
  //   await driver.get(link);
  //   let afterGithub = link.substring(link.indexOf("m/")+2);
  //   title = afterGithub.substring(afterGithub.indexOf("/")+1)
  //   //console.log(title);
  //  // await driver.wait(until.titleContains(title))
  //  driver.findElement(By.id("repo-network-counter")).getText().then((text) => {console.log(text)});
  //  // await driver.sleep(10000);
  // });





  for (let i = 0; i < links.length; i++) {

    // Visit the link
   await  driver.get(links[i]);
  
    // Wait for the page to load
    let afterGithub = await links[i].substring(links[i].indexOf("m/")+2);
     title = await afterGithub.substring(afterGithub.indexOf("/")+1)
   await  driver.wait(until.titleContains(title));
  
    // Fetch the data from the page
   await  driver.findElement(By.id("repo-network-counter")).getText().then((text) => {stars.push(text);});
   await driver.findElement(By.className("f4 my-3")).getText().then((text) => {about.push(text);});
  
   
  }




    // links.map(async(link) =>{
    //   await driver.switchTo().window(driver.getAllWindowHandles[1]);
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
    await sleep (500);
    
  } finally {
 
    await sleep(500);
    let sD = {
      link:"",
      author:"",
      repo:"",
      stars:"",
      about:""
      
    }
     for (let i = 0; i < links.length; i++) {
      sD = {
        link:"",
        author:"",
        repo:"",
        stars:"",
        about:""
        
      }
sD.link = links[i];
sD.author = links[i];
sD.repo = links[i];
sD.stars = stars[i];
sD.about = about[i];
//console.log(sD);
data.push(sD);
await addToDB(sD);

     }
     await driver.sleep(2500);
     await deleteAll();
    await driver.quit();
  }
})();
