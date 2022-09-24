const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const url = 'https://sorarium-sorare-made-easier.p.rapidapi.com/player_info/kylian-mbappe-lottin';

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Key': '923e56ff0cmsh2d6e628e4e5449ep12e4a2jsn8c07f551e255',
    'X-RapidAPI-Host': 'sorarium-sorare-made-easier.p.rapidapi.com'
  }
};

fetch(url, options)
  .then(res => res.json())
  .then(json => console.log(json))
  .catch(err => console.error('error:' + err));