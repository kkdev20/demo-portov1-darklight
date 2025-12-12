const axios = require('axios')

module.exports = function (req, res, next) {
  // Only process /api/history requests
  if (!req.url.startsWith('/api/history')) {
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

  // Get query params dari request
  const queryString = req.url.includes('?') ? req.url.split('?')[1] : ''
  
  // Proxy request ke API asli
  const apiUrl = `http://rancangrinakit.online/kingkin/api-historytransaksi-uuid.php?${queryString}`
  
  axios.get(apiUrl, {
    headers: {
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0'
    },
    timeout: 30000,
    maxRedirects: 5,
    validateStatus: function (status) {
      return status < 500 // Resolve only if status code is less than 500
    }
  })
  .then(response => {
    res.statusCode = 200
    res.end(JSON.stringify(response.data))
  })
  .catch(error => {
    // Silently handle errors without logging to console
    
    res.statusCode = 500
    res.end(JSON.stringify({
      status: 'error',
      message: 'Failed to fetch data'
    }))
  })
}

