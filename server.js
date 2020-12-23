const express = require('express')
const axios = require('axios')
const app = express()

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Methods", "PUT, POST, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});

app.get('/data/:input', async(req, res) => {
    let dataWrapper = []
    const data = await axios.get(`https://test-api.techsee.me/api/ex/${req.params.input}`)
if(data.data === ''){
    res.send('err')
} else{
    if((!data.data.length)) dataWrapper.push(data.data)
     else dataWrapper = [...data.data]
         filterd = dataWrapper
        .map(r => {
            return{
                firstName: r.firstName,
                lastName: r.lastName,
                country: r.country,
                bugs: r.bugs.map(b=>b.title).join(', ')
            }
        })
        .sort(function(a, b) {
            var nameA = a.firstName.toUpperCase()
            var nameB = b.firstName.toUpperCase()
            if (nameA < nameB) {
              return -1
            }
            if (nameA > nameB) {
              return 1
            }
            return 0
          });
        res.send(filterd)
}
})

app.listen(8080, () => console.log("server up and running on port 8080"))

















