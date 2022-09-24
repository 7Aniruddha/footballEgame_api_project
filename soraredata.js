const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const puppeteer = require("puppeteer")

const app = express();
const port = 5001;

const url = 'https://www.soraredata.com/player/89240944596761531134566896149757073034320255261326660001468647382045364465624';

// async function gethtml() {
// 	try {
// 		const scrap_data = await fetch(url);
// 		console.log(scrap_data);

// 	} catch (e) {
// 		console.log('err', e.message);
// 		return { msg : e.message };
// 	}	
// }
// gethtml()

async function start() {
  // console.log('func is called!');
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const page_info = await page.goto(url)
	
  await page.screenshot({path: 'example2.png'});

  // page.on("response", async(ress)=>{
  // 	console.log(await ress)
  // 	// var out_put = await ress;
  // 	// console.log('out_put>>',out_put) 
  // })

  await browser.close()
} 
start() 



app.get('/', async(req, res) => {
	res.send('api_data');
})


// app.listen(port, () => {
//   console.log(`app listening on port ${port}`)
// })









