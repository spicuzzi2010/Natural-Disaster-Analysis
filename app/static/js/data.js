const disasterData = []
const url = "/api/disasters";
d3.json(url).then(data => data.forEach(record => disasterData.push(record)));