
const apiData = 'https://data.cityofnewyork.us/resource/gfqj-f768.json' 

async function getData() {
  const response = await axios.get(apiData)
  console.log(response.data[102])
}

getData()