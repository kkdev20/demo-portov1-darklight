const axios = require('axios')

module.exports = function (req, res, next) {
  // Only process /api/latest requests
  if (!req.url.startsWith('/api/latest')) {
    return next()
  }

  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.statusCode = 200
    res.end()
    return
  }

  // Proxy request ke API latest.json
  const apiUrl = 'https://rancangrinakit.online/kingkin/api/data/latest.json'
  
  axios.get(apiUrl, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0'
    },
    timeout: 30000,
    maxRedirects: 5,
    validateStatus: function (status) {
      return status < 500
    }
  })
  .then(response => {
    res.statusCode = 200
    res.end(JSON.stringify(response.data))
  })
  .catch(error => {
    res.statusCode = 500
    res.end(JSON.stringify({
      status: 'error',
      message: 'Failed to fetch data'
    }))
  })
}

