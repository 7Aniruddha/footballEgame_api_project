const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const puppeteer = require("puppeteer")

const app = express()
const port = 3001


const player_data_url = 'https://www.soraredata.com/apiv2/players/info/42243852243981559568658281061101490434661865674262322520905569936008292478181';


async function start() {
  console.log('func is called!');
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  const page_info = await page.goto(player_data_url)
	
  // await page.screenshot({path: 'example1.png'});

  page.on("response", async(ress)=>{
  	console.log(await ress)
  	// var out_put = await ress;
  	// console.log('out_put>>',out_put) 
  })

  await browser.close()
} 
start() 

async function getData(){
	try {
		const urls = await fetch(player_data_url, requestOptions);
		// console.log('urls_json>>',urls)

		const urls_json = await urls.json();
		
		return urls;
	} catch (e) {
		console.log('err', e.message);
		return { msg : e.message };
	}
}



app.get('/', async(req, res) => {
	const api_data = await getData()
	res.send(api_data);
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})


