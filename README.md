# MT5 Equity Tor Monitor

Dashboard untuk monitoring equity, balance, dan account performance dengan grafik pertumbuhan akun.

## Tech Stack

- **Nuxt.js 2** - Vue.js framework
- **Chart.js** - Untuk grafik pertumbuhan akun
- **Tailwind CSS** - Styling
- **PHP API** - Backend API untuk data trading

## Features

- 📊 Real-time monitoring equity dan balance
- 📈 Grafik pertumbuhan akun berdasarkan trading results
- 🎨 Modern UI dengan responsive design
- ⚡ Auto-update setiap 3 jam
- 🔒 Secure API dengan CORS protection

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deploy to Vercel

1. Push code ke GitHub repository
2. Import project di Vercel
3. Vercel akan auto-detect Nuxt.js dan deploy

Atau gunakan Vercel CLI:
```bash
vercel
```

## API Endpoint

- `/api/history` - Proxy endpoint untuk history transaksi (bypass CORS)
- `api-historytransaksi-uuid.php` - API PHP untuk data trading positions

## Environment Variables

Tidak ada environment variables yang diperlukan untuk development.

## License

Private

