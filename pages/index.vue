<template>
  <div class="bg-gray-50 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white shadow-sm border-b border-gray-200">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex justify-between h-14 items-center">
          <!-- Logo Section -->
          <div class="flex items-center flex-shrink-0">
            <div class="h-6 w-6 sm:h-7 sm:w-7 rounded-lg gradient-primary flex items-center justify-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span class="header-logo-text ml-1 sm:ml-2 font-bold text-gray-900">Equity Monitor</span>
          </div>
          
          <!-- Right Section -->
          <div class="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            <button @click="refreshData" class="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 shadow-sm text-xs sm:text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 whitespace-nowrap">
              <svg class="-ml-0.5 mr-1 h-2.5 w-2.5 sm:h-3 sm:w-3 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg> 
              <span class="hidden sm:inline">Refresh</span>
              <span class="sm:hidden">R</span>
            </button>
            <span class="inline-flex items-center text-[10px] sm:text-xs font-medium text-green-600 whitespace-nowrap">
              <span class="w-1 h-1 sm:w-1.5 sm:h-1.5 mr-1 rounded-full bg-green-500 animate-pulse"></span>
              Live
            </span>
            <div class="text-gray-500">
              <!-- Mobile: Compact -->
              <div class="sm:hidden flex items-center space-x-1 text-[10px]">
                <span class="font-medium">{{ formatTime(lastUpdate) }}</span>
                <span class="text-gray-400">•</span>
                <span>{{ userTimeZone }}</span>
              </div>
              
              <!-- Desktop: Full -->
              <div class="hidden sm:flex items-center space-x-1 lg:space-x-2 text-xs">
                <span class="whitespace-nowrap">Last: <span class="font-medium">{{ formatTime(lastUpdate) }}</span></span>
                <span class="text-gray-400">•</span>
                <span class="whitespace-nowrap">{{ userTimeZone }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
      <!-- Tor Monitor Ketua CTA -->
      <div class="relative overflow-hidden mb-4 sm:mb-6">
        <div class="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-xl animate-float" style="animation: float 3s ease-in-out infinite;">
          <!-- Shimmer Effect -->
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" 
               style="background-size: 200% 100%; animation: shimmer 3s infinite linear;"></div>
          
          <!-- Background Pattern -->
          <div class="absolute inset-0 opacity-10">
            <div class="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 transform translate-x-8 sm:translate-x-16 -translate-y-4 sm:-translate-y-8">
              <div class="w-full h-full bg-white rounded-full"></div>
            </div>
            <div class="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 transform -translate-x-4 sm:-translate-x-8 translate-y-4 sm:translate-y-8">
              <div class="w-full h-full bg-white rounded-full"></div>
            </div>
          </div>
          
          <div class="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div class="text-white mb-4 md:mb-0">
              <div class="flex items-center space-x-2 mb-1.5">
                <div class="h-5 w-5 sm:h-6 sm:w-6 rounded-full bg-white/20 backdrop-blur-sm"></div>
                <span class="text-[10px] sm:text-xs font-semibold tracking-wider">EXCLUSIVE ACCESS</span>
              </div>
              <h2 class="text-base sm:text-lg md:text-xl font-bold mb-1.5">
                TOR MONITOR <span class="text-yellow-300">KETUA</span>
              </h2>
              <p class="text-white/90 text-[10px] sm:text-xs md:text-sm max-w-2xl">
                Real-time monitoring of equity, balance, and account performance.
              </p>
            </div>
            
            <button @click="scrollToAccounts" 
                    class="relative group px-3 py-1.5 sm:px-4 sm:py-2 bg-white text-indigo-600 font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 animate-pulse-cta"
                    style="animation: pulse-cta 2s infinite;">
              <div class="flex items-center space-x-1.5">
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                </svg>
                <span class="text-[10px] sm:text-xs md:text-sm">To The Moon</span>
              </div>
              <div class="absolute -inset-1 bg-white/30 rounded-lg sm:rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
          
          <!-- Stats Indicator -->
          <div class="relative z-10 mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <div class="flex items-center space-x-1 sm:space-x-2 text-white/80">
              <div class="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-green-400 animate-pulse"></div>
              <span class="text-[10px] sm:text-xs">Live Updates</span>
            </div>
            <div class="h-3 sm:h-4 w-px bg-white/30 hidden xs:block"></div>
            <div class="flex items-center space-x-1 sm:space-x-2 text-white/80">
              <div class="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-400"></div>
              <span class="text-[10px] sm:text-xs">Multi-Account</span>
            </div>
            <div class="h-3 sm:h-4 w-px bg-white/30 hidden xs:block"></div>
            <div class="flex items-center space-x-1 sm:space-x-2 text-white/80">
              <div class="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-purple-400"></div>
              <span class="text-[10px] sm:text-xs">Real-time Alerts</span>
            </div>
          </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-yellow-400/30 animate-bounce" style="animation-delay: 0.2s;"></div>
        <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-blue-400/30 animate-bounce" style="animation-delay: 0.5s;"></div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
        <!-- Total Equity -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2.5 sm:p-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600">Total Equity</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 mt-1">${{ formatNumber(summary.total_equity) }}</p>
              <p class="text-[10px] sm:text-xs text-gray-600 mt-1">Auto-update every 3 hours</p>
            </div>
            <div class="h-8 w-8 sm:h-9 sm:w-9 rounded-lg gradient-primary flex items-center justify-center">
              <svg class="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Profit -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2.5 sm:p-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600">Total Profit</p>
              <p class="text-lg sm:text-xl font-bold mt-1" :class="totalProfit >= 0 ? 'text-green-600' : 'text-red-600'">${{ formatNumber(totalProfit) }}</p>
              <p class="text-[10px] sm:text-xs text-gray-600 mt-1">Auto-update every 3 hours</p>
            </div>
            <div class="h-8 w-8 sm:h-9 sm:w-9 rounded-lg gradient-success flex items-center justify-center">
              <svg class="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Active Accounts -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2.5 sm:p-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600">Active Accounts</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 mt-1">{{ accounts.length }}</p>
              <div class="flex items-center space-x-2 sm:space-x-3 mt-1">
                <div class="flex items-center">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                  <span class="text-[10px] sm:text-xs text-gray-600">{{ onlineAccounts.length }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-300 mr-1"></span>
                  <span class="text-[10px] sm:text-xs text-gray-600">{{ accounts.length - onlineAccounts.length }}</span>
                </div>
              </div>
            </div>
            <div class="h-8 w-8 sm:h-9 sm:w-9 rounded-lg gradient-info flex items-center justify-center">
              <svg class="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Account -->
        <div class="bg-white rounded-lg sm:rounded-xl shadow-sm border border-gray-200 p-2.5 sm:p-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600">Account</p>
              <p class="text-sm font-semibold text-gray-900 mt-1">263221138</p>
              <div class="flex items-center mt-0.5">
                <span class="text-[10px] sm:text-xs text-gray-500 mr-2">USC</span>
                <span class="flex items-center text-[10px] sm:text-xs text-green-600">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span> Online
                </span>
              </div>
            </div>
            <div class="h-8 w-8 sm:h-9 sm:w-9 rounded-lg gradient-warning flex items-center justify-center">
              <svg class="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Account Growth Chart -->
      <AccountGrowthChart />
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      summary: {
        total_equity: 12116.91,
        total_balance: 12096.00,
        total_profit: 1871.81
      },
      totalProfit: 1871.81,
      accounts: [
        {
          id: 1,
          account_number: '263221138',
          updated_at: new Date().toISOString()
        }
      ],
      lastUpdate: new Date(),
      userTimeZone: '',
      initialBalance: 12096.00,
      loadingSummary: false
    }
  },
  async mounted() {
    this.detectTimeZone()
    await this.fetchSummaryData()
  },
  computed: {
    onlineAccounts() {
      return this.accounts.filter(account => {
        const updatedAt = new Date(account.updated_at)
        const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000)
        return updatedAt > fiveMinutesAgo
      })
    }
  },
  methods: {
    formatNumber(num) {
      return num ? num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '0.00'
    },
    formatTime(date) {
      return date.toLocaleTimeString('en-US', {
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    },
    async refreshData() {
      this.lastUpdate = new Date()
      await this.fetchSummaryData()
    },
    async fetchSummaryData() {
      this.loadingSummary = true
      try {
        const accountNumber = '263221138'
        
        // Fetch Total Equity and Balance from latest.json
        let equityApiUrl = '/api/latest'
        let equityResponse = await fetch(equityApiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        
        // Check if response is valid JSON (not HTML)
        const contentType = equityResponse.headers.get('content-type')
        if (!contentType || !contentType.includes('application/json')) {
          // Proxy not working, try direct API
          equityApiUrl = 'https://rancangrinakit.online/kingkin/api/data/latest.json'
          equityResponse = await fetch(equityApiUrl, {
            method: 'GET',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            }
          })
        }
        
        if (equityResponse.ok) {
          const equityText = await equityResponse.text()
          try {
            const equityResult = JSON.parse(equityText)
            if (equityResult && equityResult[accountNumber]) {
              const accountData = equityResult[accountNumber]
              this.summary.total_equity = parseFloat(accountData.equity || 0)
              this.summary.total_balance = parseFloat(accountData.balance || 0)
            }
          } catch (e) {
            // Skip if not JSON
          }
        }
        
        // Fetch Total Profit from history transaksi API (sum all profits)
        const historyApiUrl = `/api/history?uuid=${accountNumber}&limit=10000`
        const historyResponse = await fetch(historyApiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        
        if (historyResponse.ok) {
          const historyText = await historyResponse.text()
          try {
            const historyResult = JSON.parse(historyText)
            if (historyResult.status === 'success' && historyResult.data && Array.isArray(historyResult.data)) {
              // Calculate total profit from all trades
              const calculatedTotalProfit = historyResult.data.reduce((sum, trade) => {
                return sum + parseFloat(trade.profit || 0)
              }, 0)
              
              this.totalProfit = calculatedTotalProfit
              this.summary.total_profit = calculatedTotalProfit
            }
          } catch (e) {
            // Skip if not JSON
          }
        }
        
        // Update last update time
        this.lastUpdate = new Date()
      } catch (error) {
        // Silent error - keep existing values if API fails
      } finally {
        this.loadingSummary = false
      }
    },
    scrollToAccounts() {
      // Scroll to chart section
      const chartElement = document.querySelector('.bg-white.rounded-xl')
      if (chartElement) {
        chartElement.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    },
    detectTimeZone() {
      try {
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
        const now = new Date()
        const offset = -now.getTimezoneOffset() / 60
        
        // Format zona waktu menjadi GMT+X atau GMT-X
        if (timeZone.includes("Asia/Jakarta")) {
          this.userTimeZone = "GMT+7"
        } else if (timeZone.includes("Asia/Makassar")) {
          this.userTimeZone = "GMT+8"
        } else if (timeZone.includes("Asia/Jayapura")) {
          this.userTimeZone = "GMT+9"
        } else {
          // Untuk zona waktu internasional, tampilkan format GMT
          const gmtOffset = offset >= 0 ? `GMT+${offset}` : `GMT${offset}`
          this.userTimeZone = gmtOffset
        }
      } catch (error) {
        const now = new Date()
        const offset = -now.getTimezoneOffset() / 60
        const gmtOffset = offset >= 0 ? `GMT+${offset}` : `GMT${offset}`
        this.userTimeZone = gmtOffset
      }
    }
  }
}
</script>

<style scoped>
/* Styles are in global CSS file */
</style>
