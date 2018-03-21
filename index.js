const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const url = require("url");

const sleep = time => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

/**
 * 
 * @param {String} _url 
 * @param {String} name 
 * @param {String} dist 
 */
const generateHTML = async (_url, name, dist) => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(_url);
    let html = await page.$eval("html", e => e.outerHTML);
    let pathname = url.parse(_url).pathname;
    let dist_dir = path.resolve(__dirname, dist || "dist");
    await fs.writeFileSync(
      path.resolve(dist_dir, `${name || "index"}.html`),
      html
    );
    return true;
  } catch (e) {
    return false;
  } finally {
    await browser.close();
  }
};

module.exports = generateHTML;
