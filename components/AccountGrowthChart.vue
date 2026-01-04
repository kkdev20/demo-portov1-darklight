<template>
  <div>
  <div class="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-3 sm:p-4 mt-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-3 sm:mb-4">
      <div>
        <h3 class="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Account Growth</h3>
        <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">Growth based on trading results</p>
      </div>
      <div class="flex items-center space-x-2">
        <select 
          v-model="selectedPeriod" 
          @change="fetchGrowthData"
            class="text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg px-2 py-1 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="7">Last 7 days</option>
          <option value="30">Last 30 days</option>
          <option value="90">Last 90 days</option>
          <option value="all">All time</option>
        </select>
        <button 
          @click="fetchGrowthData"
            class="p-1.5 sm:p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          :disabled="loading"
        >
          <svg 
            class="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 dark:text-gray-400" 
            :class="{ 'animate-spin': loading }"
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="flex items-center justify-center h-64">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="text-center py-8">
      <p class="text-red-600 dark:text-red-400 text-sm">{{ error }}</p>
      <button 
        @click="fetchGrowthData"
        class="mt-4 px-4 py-2 bg-indigo-600 dark:bg-indigo-700 text-white rounded-lg hover:bg-indigo-700 dark:hover:bg-indigo-600 text-sm"
      >
        Retry
      </button>
    </div>

    <!-- Chart Container -->
    <div v-else-if="chartData.length > 0" class="relative">
      <div class="relative" style="height: 300px;">
        <canvas ref="chartCanvas"></canvas>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="text-center py-12">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
      </svg>
      <p class="mt-4 text-sm text-gray-600 dark:text-gray-400">No trading data available</p>
    </div>
  </div>
  <!-- Watermark -->
  <div class="text-center mt-2">
    <p class="text-xs text-gray-400 dark:text-gray-500 font-medium">wistack.site</p>
  </div>
  </div>
</template>

<script>
export default {
  name: 'AccountGrowthChart',
  props: {
    equity: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      chart: null,
      Chart: null,
      chartData: [],
      loading: false,
      error: null,
      selectedPeriod: '30',
      totalProfit: 0,
      totalTrades: 0,
      winRate: 0,
      avgProfit: 0
    }
  },
  async mounted() {
    // Load Chart.js only on client-side
    if (process.client) {
      try {
        const chartModule = await import('chart.js')
        this.Chart = chartModule.Chart
        const { registerables } = chartModule
        this.Chart.register(...registerables)
      } catch (error) {
        this.error = 'Failed to load chart library'
      }
    }
    this.fetchGrowthData()
  },
  beforeUnmount() {
    if (this.chart) {
      this.chart.destroy()
    }
  },
  methods: {
    async fetchGrowthData() {
      this.loading = true
      this.error = null
      
      try {
        const accountNumber = '263221138' // Default account, bisa diubah jadi props
        let startDate = null
        
        if (this.selectedPeriod !== 'all') {
          const days = parseInt(this.selectedPeriod)
          const date = new Date()
          date.setDate(date.getDate() - days)
          startDate = date.toISOString().slice(0, 19).replace('T', ' ')
        }
        
        // Build API URL - gunakan proxy server untuk bypass CORS
        let queryParams = `uuid=${accountNumber}&limit=1000`
        if (startDate) {
          queryParams += `&start_date=${startDate}`
        }
        
        // Gunakan proxy endpoint dari Nuxt server
        const apiUrl = `/api/history?${queryParams}`
        
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        
        const result = await response.json()
        
        if (result.status === 'success' && result.data) {
          if (result.data.length === 0) {
            this.error = 'No trading data available for the selected period'
            this.chartData = []
          } else {
            this.processChartData(result.data)
          }
        } else {
          this.error = result.message || 'Failed to fetch data'
          this.chartData = []
        }
      } catch (err) {
        this.error = 'Error loading data: ' + err.message
        this.chartData = []
      } finally {
        this.loading = false
      }
    },
    
    processChartData(data) {
      if (!data || data.length === 0) {
        this.chartData = []
        return
      }
      
      // Sort by position_time
      const sortedData = [...data].sort((a, b) => 
        new Date(a.position_time) - new Date(b.position_time)
      )
      
      // Group by date and calculate cumulative profit
      const dateMap = new Map()
      let cumulativeProfit = 0
      
      sortedData.forEach(trade => {
        const date = trade.position_time.split(' ')[0] // Get date only
        cumulativeProfit += parseFloat(trade.profit || 0)
        
        if (!dateMap.has(date)) {
          dateMap.set(date, {
            date,
            profit: 0,
            cumulative: cumulativeProfit,
            trades: 0,
            wins: 0
          })
        }
        
        const dayData = dateMap.get(date)
        dayData.profit += parseFloat(trade.profit || 0)
        dayData.cumulative = cumulativeProfit
        dayData.trades += 1
        if (parseFloat(trade.profit || 0) > 0) {
          dayData.wins += 1
        }
      })
      
      // Convert to array
      this.chartData = Array.from(dateMap.values())
      
      // Calculate stats
      this.calculateStats(sortedData)
      
      // Render chart - wait a bit untuk ensure canvas is ready
      this.$nextTick(() => {
        setTimeout(() => {
          this.chartCanvas = this.$refs.chartCanvas
          if (this.chartCanvas) {
            this.renderChart()
          } else {
            setTimeout(() => {
              this.chartCanvas = this.$refs.chartCanvas
              if (this.chartCanvas) {
                this.renderChart()
              }
            }, 200)
          }
        }, 150)
      })
    },
    
    calculateStats(data) {
      this.totalTrades = data.length
      this.totalProfit = data.reduce((sum, trade) => sum + parseFloat(trade.profit || 0), 0)
      this.avgProfit = this.totalTrades > 0 ? this.totalProfit / this.totalTrades : 0
      
      const winningTrades = data.filter(trade => parseFloat(trade.profit || 0) > 0).length
      this.winRate = this.totalTrades > 0 ? Math.round((winningTrades / this.totalTrades) * 100) : 0
    },
    
    renderChart() {
      if (!this.chartCanvas || this.chartData.length === 0 || !this.Chart) {
        return
      }
      
      // Destroy existing chart
      if (this.chart) {
        this.chart.destroy()
      }
      
      const ctx = this.chartCanvas.getContext('2d')
      
      if (!ctx) {
        return
      }
      
      const labels = this.chartData.map(d => {
        const date = new Date(d.date)
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      })
      
      const cumulativeData = this.chartData.map(d => d.cumulative)
      
      // Create gradient for border (line) - Vertical gradient (top to bottom)
      const borderGradient = ctx.createLinearGradient(0, 0, 0, 300)
      borderGradient.addColorStop(0, '#3b82f6')      // Blue
      borderGradient.addColorStop(0.2, '#06b6d4')    // Cyan
      borderGradient.addColorStop(0.4, '#10b981')     // Emerald
      borderGradient.addColorStop(0.6, '#8b5cf6')     // Purple
      borderGradient.addColorStop(0.8, '#ec4899')    // Pink
      borderGradient.addColorStop(1, '#f59e0b')       // Amber
      
      // Create gradient for fill area - Vertical gradient (top to bottom)
      const fillGradient = ctx.createLinearGradient(0, 0, 0, 300)
      fillGradient.addColorStop(0, 'rgba(59, 130, 246, 0.35)')     // Blue
      fillGradient.addColorStop(0.2, 'rgba(6, 182, 212, 0.3)')    // Cyan
      fillGradient.addColorStop(0.4, 'rgba(16, 185, 129, 0.25)')  // Emerald
      fillGradient.addColorStop(0.6, 'rgba(139, 92, 246, 0.3)')    // Purple
      fillGradient.addColorStop(0.8, 'rgba(236, 72, 153, 0.2)')    // Pink
      fillGradient.addColorStop(1, 'rgba(245, 158, 11, 0.15)')    // Amber
      
      this.chart = new this.Chart(ctx, {
        type: 'line',
        data: {
          labels,
          datasets: [
            {
              label: 'Cumulative Profit',
              data: cumulativeData,
              borderColor: borderGradient,
              backgroundColor: fillGradient,
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 3,
              pointHoverRadius: 5,
              pointBackgroundColor: '#fff',
              pointBorderColor: borderGradient,
              pointBorderWidth: 1.5,
              pointHoverBackgroundColor: '#fff',
              pointHoverBorderColor: '#3b82f6',
              pointHoverBorderWidth: 3
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          maintainAspectRatio: false,
          aspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              padding: 12,
              titleFont: {
                size: 14,
                weight: 'bold'
              },
              bodyFont: {
                size: 13
              },
              callbacks: {
                label: (context) => {
                  const value = context.parsed.y
                  const index = context.dataIndex
                  const dayData = this.chartData[index]
                  const dailyProfitPercent = this.equity > 0 
                    ? ((dayData.profit / this.equity) * 100).toFixed(2)
                    : '0.00'
                  return [
                    `Cumulative: $${this.formatNumber(value)}`,
                    `Daily Profit: $${this.formatNumber(dayData.profit)}`,
                    `${dailyProfitPercent >= 0 ? '+' : ''}${dailyProfitPercent}% of equity`
                  ]
                }
              }
            }
          },
          scales: {
            x: {
              grid: {
                display: false
              },
              ticks: {
                maxRotation: 45,
                minRotation: 45,
                font: {
                  size: 11
                },
                color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
              }
            },
            y: {
              grid: {
                color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)'
              },
              ticks: {
                callback: (value) => {
                  return '$' + this.formatNumber(value)
                },
                font: {
                  size: 11
                },
                color: document.documentElement.classList.contains('dark') ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)'
              }
            }
          },
          interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          }
        }
      })
    },
    
    formatNumber(num) {
      return num ? num.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '0.00'
    }
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>

