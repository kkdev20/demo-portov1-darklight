<template>
  <div class="bg-gray-50 dark:bg-gray-900 min-h-screen">
    <!-- Navigation -->
    <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div class="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div class="flex justify-between h-14 items-center">
          <!-- Logo Section -->
          <div class="flex items-center flex-shrink-0">
            <div class="h-6 w-6 sm:h-7 sm:w-7 rounded-lg gradient-primary flex items-center justify-center">
              <svg class="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
            </div>
            <span class="header-logo-text ml-1 sm:ml-2 font-bold text-gray-900 dark:text-white">Portfolio Analytics</span>
          </div>
          
          <!-- Right Section -->
          <div class="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
            <button @click="toggleDarkMode" class="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs sm:text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 whitespace-nowrap">
              <svg v-if="!isDarkMode" class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
              </svg>
              <svg v-else class="h-3 w-3 sm:h-4 sm:w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
              </svg>
            </button>
            <button @click="refreshData" class="inline-flex items-center px-2 py-1 sm:px-3 sm:py-1.5 border border-gray-300 dark:border-gray-600 shadow-sm text-xs sm:text-sm font-medium rounded-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 whitespace-nowrap">
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
            <div class="text-gray-500 dark:text-gray-400">
              <!-- Mobile: Compact -->
              <div class="sm:hidden flex items-center space-x-1 text-[10px]">
                <span class="font-medium">{{ formatTime(lastUpdate) }}</span>
                <span class="text-gray-400 dark:text-gray-500">•</span>
                <span>{{ userTimeZone }}</span>
              </div>
              
              <!-- Desktop: Full -->
              <div class="hidden sm:flex items-center space-x-1 lg:space-x-2 text-xs">
                <span class="whitespace-nowrap">Last: <span class="font-medium">{{ formatTime(lastUpdate) }}</span></span>
                <span class="text-gray-400 dark:text-gray-500">•</span>
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
      <div class="relative overflow-hidden mb-4 sm:mb-6 rounded-xl sm:rounded-2xl">
        <div class="relative bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-800 p-4 sm:p-6 shadow-xl animate-float" style="animation: float 3s ease-in-out infinite;">
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
                <span class="text-[10px] sm:text-xs font-semibold tracking-wider">ENTERPRISE SOLUTION</span>
              </div>
              <h2 class="text-base sm:text-lg md:text-xl font-bold mb-1.5">
                PORTFOLIO MONITORING <span class="text-blue-200">PLATFORM</span>
              </h2>
              <p class="text-white/90 text-[9px] sm:text-[10px] md:text-xs max-w-2xl">
                Advanced real-time portfolio analytics and performance monitoring for institutional investors and fund managers.
              </p>
            </div>
            
            <button @click="scrollToChart" 
                    class="relative group px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-blue-700 font-semibold rounded-lg sm:rounded-xl shadow-lg hover:shadow-xl hover:bg-blue-50 transform hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center space-x-2">
              <svg class="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
              </svg>
              <span class="text-xs sm:text-sm font-bold whitespace-nowrap">View Dashboard</span>
              <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0 transform group-hover:translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 9l-7 7-7-7"/>
              </svg>
            </button>
          </div>
          
          <!-- Stats Indicator -->
          <div class="relative z-10 mt-4 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
            <div class="flex items-center space-x-1 sm:space-x-2 text-white/80">
              <div class="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-emerald-400 animate-pulse"></div>
              <span class="text-[10px] sm:text-xs">Real-Time Analytics</span>
            </div>
            <div class="h-3 sm:h-4 w-px bg-white/30 hidden xs:block"></div>
            <div class="flex items-center space-x-1 sm:space-x-2 text-white/80">
              <div class="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-cyan-400"></div>
              <span class="text-[10px] sm:text-xs">Multi-Portfolio Management</span>
            </div>
            <div class="h-3 sm:h-4 w-px bg-white/30 hidden xs:block"></div>
            <div class="flex items-center space-x-1 sm:space-x-2 text-white/80">
              <div class="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-blue-300"></div>
              <span class="text-[10px] sm:text-xs">Intelligent Alerts</span>
            </div>
          </div>
        </div>
        
        <!-- Floating Elements -->
        <div class="absolute top-3 right-3 sm:top-4 sm:right-4 w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-blue-300/30 animate-bounce" style="animation-delay: 0.2s;"></div>
        <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-indigo-300/30 animate-bounce" style="animation-delay: 0.5s;"></div>
      </div>

      <!-- Stats Grid -->
      <div class="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-4">
        <!-- Total Equity -->
        <div class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2.5 sm:p-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Total Equity</p>
              <p v-if="loadingSummary && summary.total_equity === 0" class="text-lg sm:text-xl font-bold text-gray-400 dark:text-gray-500 mt-1">Loading...</p>
              <p v-else class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-1">${{ formatNumber(summary.total_equity) }}</p>
              <p class="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-1">Auto-update every 3 hours</p>
            </div>
            <div class="h-8 w-8 sm:h-9 sm:w-9 rounded-lg gradient-primary flex items-center justify-center">
              <svg class="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Total Profit -->
        <div class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2.5 sm:p-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Total Profit</p>
              <p v-if="loadingSummary && totalProfit === 0" class="text-lg sm:text-xl font-bold text-gray-400 dark:text-gray-500 mt-1">Loading...</p>
              <p v-else class="text-lg sm:text-xl font-bold mt-1" :class="totalProfit >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'">${{ formatNumber(totalProfit) }}</p>
              <p class="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400 mt-1">Auto-update every 3 hours</p>
            </div>
            <div class="h-8 w-8 sm:h-9 sm:w-9 rounded-lg gradient-success flex items-center justify-center">
              <svg class="h-3 w-3 sm:h-4 sm:w-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
            </div>
          </div>
        </div>

        <!-- Active Accounts -->
        <div class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2.5 sm:p-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Active Accounts</p>
              <p class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white mt-1">{{ accounts.length }}</p>
              <div class="flex items-center space-x-2 sm:space-x-3 mt-1">
                <div class="flex items-center">
                  <span class="w-1.5 h-1.5 rounded-full bg-green-500 mr-1"></span>
                  <span class="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{{ onlineAccounts.length }}</span>
                </div>
                <div class="flex items-center">
                  <span class="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-gray-600 mr-1"></span>
                  <span class="text-[10px] sm:text-xs text-gray-600 dark:text-gray-400">{{ accounts.length - onlineAccounts.length }}</span>
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
        <div class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-2.5 sm:p-3">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-xs font-medium text-gray-600 dark:text-gray-400">Account</p>
              <p class="text-sm font-semibold text-gray-900 dark:text-white mt-1">26322***8</p>
              <div class="flex items-center mt-0.5">
                <span class="text-[10px] sm:text-xs text-gray-500 dark:text-gray-400 mr-2">USC</span>
                <span class="flex items-center text-[10px] sm:text-xs text-green-600 dark:text-green-400">
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
      <div id="dashboard-chart">
        <AccountGrowthChart :equity="summary.total_equity" :is-dark-mode="isDarkMode" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage',
  data() {
    return {
      summary: {
        total_equity: 0,
        total_balance: 0,
        total_profit: 0
      },
      totalProfit: 0,
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
      loadingSummary: false,
      isDarkMode: true
    }
  },
  async mounted() {
    // Load dark mode preference from localStorage (default to dark mode)
    if (process.client) {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'light') {
        this.isDarkMode = false
        document.documentElement.classList.remove('dark')
      } else {
        // Default to dark mode if no preference saved
        this.isDarkMode = true
        document.documentElement.classList.add('dark')
      }
    }
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
    scrollToChart() {
      // Scroll to chart section using ID
      const chartSection = document.getElementById('dashboard-chart')
      
      if (chartSection) {
        const elementPosition = chartSection.getBoundingClientRect().top + window.pageYOffset
        const offsetPosition = elementPosition - 80 // Offset untuk nav bar
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      } else {
        // Fallback: try to find chart by class
        const chartElement = document.querySelector('.bg-white.rounded-lg.shadow-sm.border.border-gray-200')
        if (chartElement) {
          const elementPosition = chartElement.getBoundingClientRect().top + window.pageYOffset
          const offsetPosition = elementPosition - 80
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          })
        }
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
    },
    toggleDarkMode() {
      this.isDarkMode = !this.isDarkMode
      if (process.client) {
        if (this.isDarkMode) {
          document.documentElement.classList.add('dark')
          localStorage.setItem('theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          localStorage.setItem('theme', 'light')
        }
      }
    }
  }
}
</script>

<style scoped>
/* Styles are in global CSS file */
</style>
