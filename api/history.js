// Vercel Serverless Function for history API proxy
module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  res.setHeader('Content-Type', 'application/json')

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    const axios = require('axios')
    // Get query string from request - Vercel passes query in req.query
    let queryString = ''
    if (req.query && Object.keys(req.query).length > 0) {
      queryString = new URLSearchParams(req.query).toString()
    } else if (req.url && req.url.includes('?')) {
      queryString = req.url.split('?')[1]
    }
    const apiUrl = `http://rancangrinakit.online/kingkin/api-historytransaksi-uuid.php${queryString ? '?' + queryString : ''}`
    
    const response = await axios.get(apiUrl, {
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
    
    res.status(200).json(response.data)
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch data'
    })
  }
}

