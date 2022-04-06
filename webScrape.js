// Loading the dependencies
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "https://www.amazon.com/Oculus-Quest-Advanced-All-One-Virtual/dp/B099VMT8VZ/ref=sr_1_3?crid=2XOPRGLK0DPJ7&keywords=oculus&qid=1649201433&sprefix=oculus%2Caps%2C75&sr=8-3";

const product = {name: "",image:"",price:"", link:""};

// Scrape function
async function scrape() {
  try {
    // Fetch HTML
    const { data } = await axios.get(url);
    // Load HTML 
    const $ = cheerio.load(data);
    // Select div items
    const item = $("div#dp-container");
    // Populate the product object with the selected elements
    product.name = $(item).find('h1 span#productTitle').text();
    product.image = $(item).find('img#landingImage').attr('src');
    product.price = $(item).find('div span#priceblock_ourprice').text();
    product.link = url
    console.log(product)
    // create product.json file
    fs.writeFile("product.json", JSON.stringify(product, null, 2), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log("completed");
    });
  } catch (err) {
    console.error(err);
  }
}

scrape()