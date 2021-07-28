const disasterData
const url = "/api/disasters";
d3.json(url).then(data => disasterData = data);
console.log(data);