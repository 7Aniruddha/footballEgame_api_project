// https://www.footballtransfers.com/en/transfers/actions/latest-transfers/overview

const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
var hbs = require('hbs')
const path = require('path')


const app = express()
const port = 3000
app.set('view engine', 'hbs')


const football_transfer_url = 'https://www.footballtransfers.com/en/transfers/actions/latest-transfers/overview';


function url_requestOptions(page){ 
	var requestOptions = {
		"headers": {
			"accept": "*/*",
			"accept-language": "en-US,en;q=0.9",
			"content-type": "application/x-www-form-urlencoded; charset=UTF-8",
			"sec-ch-ua": "\"Google Chrome\";v=\"105\", \"Not)A;Brand\";v=\"8\", \"Chromium\";v=\"105\"",
			"sec-ch-ua-mobile": "?0",
			"sec-ch-ua-platform": "\"Windows\"",
			"sec-fetch-dest": "empty",
			"sec-fetch-mode": "cors",
			"sec-fetch-site": "same-origin",
			"x-requested-with": "XMLHttpRequest",
			"cookie": "_gid=GA1.2.802182747.1663138773; FootballTransfers_Language=1; _ga=GA1.2.1076687116.1663138773; _ga_6D1E4VM1TV=GS1.1.1663146354.2.0.1663146354.0.0.0",
			"Referer": "https://www.footballtransfers.com/en/transfers/latest-football-transfers",
			"Referrer-Policy": "strict-origin-when-cross-origin"
		},
	  "body": `orderBy=date_transfer&orderByDescending=1&page=${page}&pages=0&pageItems=25&countryId=all&tournamentId=all&clubFromId=all&clubToId=all&transferFeeFrom=&transferFeeTo=`,
	  "method": "POST"
	};
	return requestOptions
}


app.use('/football', express.static(path.join(__dirname, 'public')))


async function getData(){
	try {
		var all_players=[]
		for(let x=0; x<10; x++){
			const urls = await fetch(football_transfer_url, url_requestOptions(x));
			const urls_json = await urls.json();
			for(let item of urls_json.records){
				all_players.push(item);
			}
		}
		// return urls_json.records;
		return all_players;
	} catch (e) {
		console.log('err', e.message);
		return { msg : e.message };
	}
}


app.get('/hbs', async(req, res)=>{
	const api_data = await getData()
    res.render('football_playerData', {demo : api_data})
})


app.get('/', async(req, res) => {
	const api_data = await getData()
	res.send(api_data);
})


app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})