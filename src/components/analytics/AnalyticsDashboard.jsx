import { useEffect, useState } from 'react';
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';

// Register Chart.js components immediately
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
  ArcElement
);

// Icons
const DollarSignIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

const TrendingUpIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="22,7 13.5,15.5 8.5,10.5 2,17"></polyline>
    <polyline points="16,7 22,7 22,13"></polyline>
  </svg>
);

const CreditCardIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
    <line x1="1" y1="10" x2="23" y2="10"></line>
  </svg>
);

const BarChart3Icon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 3v18h18"></path>
    <path d="M18 17V9"></path>
    <path d="M13 17V5"></path>
    <path d="M8 17v-3"></path>
  </svg>
);

// StatCard component
const StatCard = ({ title, value, description, trend, icon }) => {
  return (
    <div className="border border-gray-300 rounded p-4 bg-white">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm text-gray-600">{title}</h3>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="text-xl font-bold">{value}</div>
      <div className="text-xs text-gray-500 mt-1">
        {description}
        {trend && (
          <span className={trend.isPositive ? "text-green-600 ml-2" : "text-red-600 ml-2"}>
            {trend.isPositive ? "↗" : "↘"} {trend.value}%
          </span>
        )}
      </div>
    </div>
  );
};

// Revenue Chart
const RevenueChart = ({ data }) => {
  const sampleData = data || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    xeroRevenue: [12000, 19000, 15000, 25000, 22000, 30000],
    paypalRevenue: [8000, 12000, 18000, 15000, 20000, 25000],
  };

  const lineData = {
    labels: sampleData.labels,
    datasets: [
      {
        label: 'Xero Revenue',
        data: sampleData.xeroRevenue,
        borderColor: '#9ca3af',
        backgroundColor: '#9ca3af20',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#9ca3af',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'PayPal Revenue',
        data: sampleData.paypalRevenue,
        borderColor: '#6b7280',
        backgroundColor: '#6b728020',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#6b7280',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Revenue Trends</CardTitle>
        <CardDescription>
          Monthly revenue comparison between Xero and PayPal
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Line data={lineData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

// Expense Chart
const ExpenseChart = () => {
  const sampleData = {
    categories: ['Office Supplies', 'Marketing', 'Travel', 'Software', 'Utilities'],
    amounts: [3500, 8200, 2100, 4800, 1900],
  };

  const doughnutData = {
    labels: sampleData.categories,
    datasets: [
      {
        data: sampleData.amounts,
        backgroundColor: [
          '#a1a1aa',
          '#71717a',
          '#6b7280',
          '#9ca3af',
          '#52525b',
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Expense Breakdown</CardTitle>
        <CardDescription>
          Distribution of expenses by category
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Doughnut data={doughnutData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

// Cash Flow Chart
const CashFlowChart = ({ data }) => {
  const sampleData = data || {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    income: [20000, 31000, 33000, 40000, 42000, 55000],
    expenses: [15000, 18000, 21000, 25000, 28000, 32000],
  };

  const barData = {
    labels: sampleData.labels,
    datasets: [
      {
        label: 'Income',
        data: sampleData.income,
        backgroundColor: '#71717a',
        borderColor: '#71717a',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Expenses',
        data: sampleData.expenses,
        backgroundColor: '#a1a1aa',
        borderColor: '#a1a1aa',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        type: 'category',
        display: true,
      },
      y: {
        display: true,
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Cash Flow Analysis</CardTitle>
        <CardDescription>
          Monthly income vs expenses comparison
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Bar data={barData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

const AnalyticsDashboard = () => {
  const [timePeriod, setTimePeriod] = useState('Monthly');
  const [selectedPeriod, setSelectedPeriod] = useState('January');
  const [selectedYear, setSelectedYear] = useState('2024');

  // Generate options based on time period
  const getPeriodOptions = () => {
    switch (timePeriod) {
      case 'Monthly':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      case 'Quarterly':
        return ['Q1', 'Q2', 'Q3', 'Q4'];
      case 'Annually':
        return ['2021', '2022', '2023', '2024'];
      default:
        return [];
    }
  };

  // Generate year options
  const getYearOptions = () => {
    return ['2021', '2022', '2023', '2024'];
  };

  // Get chart data based on selections
  const getChartData = () => {
    const key = timePeriod === 'Annually' ? selectedPeriod : `${selectedPeriod}_${selectedYear}`;
    
    if (timePeriod === 'Monthly') {
      const monthData = {
        // 2024 Data
        'January_2024': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [3000, 4750, 3750, 6250],
          paypalRevenue: [2000, 3000, 4500, 3750],
          income: [5000, 7750, 8250, 10000],
          expenses: [3750, 4500, 5250, 6250],
        },
        'February_2024': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [3500, 5250, 4250, 7000],
          paypalRevenue: [2500, 3500, 5000, 4250],
          income: [6000, 8750, 9250, 11250],
          expenses: [4000, 5000, 5750, 6750],
        },
        'March_2024': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [4000, 6000, 5000, 8000],
          paypalRevenue: [3000, 4000, 5500, 5000],
          income: [7000, 10000, 10500, 13000],
          expenses: [4500, 5500, 6250, 7500],
        },
        // 2023 Data
        'January_2023': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [2500, 4000, 3200, 5500],
          paypalRevenue: [1800, 2700, 4000, 3200],
          income: [4300, 6700, 7200, 8700],
          expenses: [3200, 3900, 4700, 5500],
        },
        'February_2023': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [2800, 4200, 3500, 5800],
          paypalRevenue: [2000, 2900, 4200, 3500],
          income: [4800, 7100, 7700, 9300],
          expenses: [3400, 4100, 4900, 5800],
        },
        'March_2023': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [3200, 4800, 4000, 6500],
          paypalRevenue: [2400, 3600, 5000, 4500],
          income: [5600, 8400, 9000, 11000],
          expenses: [3800, 4600, 5400, 6500],
        },
        // 2022 Data
        'January_2022': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [2000, 3200, 2600, 4400],
          paypalRevenue: [1400, 2200, 3200, 2600],
          income: [3400, 5400, 5800, 7000],
          expenses: [2600, 3200, 3800, 4400],
        },
        'February_2022': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [2200, 3600, 2900, 4800],
          paypalRevenue: [1600, 2500, 3600, 2900],
          income: [3800, 6100, 6500, 7700],
          expenses: [2800, 3500, 4100, 4800],
        },
        'March_2022': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [2600, 4000, 3200, 5200],
          paypalRevenue: [1900, 3000, 4000, 3600],
          income: [4500, 7000, 7200, 8800],
          expenses: [3200, 3800, 4400, 5200],
        },
        // 2021 Data
        'January_2021': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [1800, 2800, 2200, 3800],
          paypalRevenue: [1200, 1900, 2800, 2200],
          income: [3000, 4700, 5000, 6000],
          expenses: [2200, 2800, 3200, 3800],
        },
        'February_2021': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [2000, 3200, 2500, 4200],
          paypalRevenue: [1400, 2200, 3200, 2500],
          income: [3400, 5400, 5700, 6700],
          expenses: [2400, 3000, 3500, 4200],
        },
        'March_2021': {
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
          xeroRevenue: [2200, 3600, 2800, 4600],
          paypalRevenue: [1600, 2600, 3600, 3200],
          income: [3800, 6200, 6400, 7800],
          expenses: [2600, 3200, 3600, 4600],
        },
      };
      return monthData[key] || monthData['January_2024'];
    } else if (timePeriod === 'Quarterly') {
      const quarterData = {
        'Q1_2024': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [36000, 57000, 45000],
          paypalRevenue: [24000, 36000, 54000],
          income: [60000, 93000, 99000],
          expenses: [45000, 54000, 63000],
        },
        'Q2_2024': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [42000, 63000, 51000],
          paypalRevenue: [28000, 42000, 60000],
          income: [70000, 105000, 111000],
          expenses: [52000, 61000, 70000],
        },
        'Q3_2024': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [48000, 69000, 57000],
          paypalRevenue: [32000, 48000, 66000],
          income: [80000, 117000, 123000],
          expenses: [58000, 68000, 77000],
        },
        'Q1_2023': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [32000, 51000, 40000],
          paypalRevenue: [21000, 32000, 48000],
          income: [53000, 83000, 88000],
          expenses: [40000, 48000, 56000],
        },
        'Q2_2023': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [36000, 57000, 45000],
          paypalRevenue: [24000, 36000, 54000],
          income: [60000, 93000, 99000],
          expenses: [45000, 54000, 63000],
        },
        'Q3_2023': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [40000, 63000, 50000],
          paypalRevenue: [27000, 40000, 58000],
          income: [67000, 103000, 108000],
          expenses: [50000, 59000, 68000],
        },
        'Q4_2023': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [44000, 69000, 55000],
          paypalRevenue: [30000, 44000, 62000],
          income: [74000, 113000, 117000],
          expenses: [55000, 64000, 73000],
        },
        // 2022 Quarterly Data
        'Q1_2022': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [28000, 44000, 35000],
          paypalRevenue: [18000, 28000, 42000],
          income: [46000, 72000, 77000],
          expenses: [35000, 42000, 49000],
        },
        'Q2_2022': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [32000, 50000, 40000],
          paypalRevenue: [21000, 32000, 47000],
          income: [53000, 82000, 87000],
          expenses: [40000, 47000, 55000],
        },
        'Q3_2022': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [36000, 56000, 45000],
          paypalRevenue: [24000, 36000, 52000],
          income: [60000, 92000, 97000],
          expenses: [45000, 52000, 61000],
        },
        'Q4_2022': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [40000, 62000, 50000],
          paypalRevenue: [27000, 40000, 57000],
          income: [67000, 102000, 107000],
          expenses: [50000, 57000, 67000],
        },
        // 2021 Quarterly Data
        'Q1_2021': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [24000, 38000, 30000],
          paypalRevenue: [16000, 24000, 36000],
          income: [40000, 62000, 66000],
          expenses: [30000, 36000, 42000],
        },
        'Q2_2021': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [28000, 43000, 34000],
          paypalRevenue: [18000, 28000, 41000],
          income: [46000, 71000, 75000],
          expenses: [35000, 41000, 48000],
        },
        'Q3_2021': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [32000, 48000, 38000],
          paypalRevenue: [21000, 32000, 46000],
          income: [53000, 80000, 84000],
          expenses: [40000, 46000, 54000],
        },
        'Q4_2021': {
          labels: ['Month 1', 'Month 2', 'Month 3'],
          xeroRevenue: [36000, 54000, 43000],
          paypalRevenue: [24000, 36000, 51000],
          income: [60000, 90000, 94000],
          expenses: [45000, 51000, 60000],
        }
      };
      return quarterData[key] || quarterData['Q1_2024'];
    } else { // Annually
      const yearData = {
        '2024': {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          xeroRevenue: [36000, 57000, 45000, 42000, 63000, 51000, 48000, 69000, 57000, 54000, 72000, 60000],
          paypalRevenue: [24000, 36000, 54000, 28000, 42000, 60000, 32000, 48000, 66000, 36000, 54000, 75000],
          income: [60000, 93000, 99000, 70000, 105000, 111000, 80000, 117000, 123000, 90000, 126000, 135000],
          expenses: [45000, 54000, 63000, 52000, 61000, 70000, 58000, 68000, 77000, 65000, 73000, 83000],
        },
        '2023': {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          xeroRevenue: [32000, 51000, 40000, 36000, 57000, 45000, 40000, 63000, 50000, 44000, 69000, 55000],
          paypalRevenue: [21000, 32000, 48000, 24000, 36000, 54000, 27000, 40000, 58000, 30000, 44000, 62000],
          income: [53000, 83000, 88000, 60000, 93000, 99000, 67000, 103000, 108000, 74000, 113000, 117000],
          expenses: [40000, 48000, 56000, 45000, 54000, 63000, 50000, 59000, 68000, 55000, 64000, 73000],
        },
        '2022': {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          xeroRevenue: [28000, 44000, 35000, 32000, 50000, 40000, 36000, 56000, 45000, 40000, 62000, 50000],
          paypalRevenue: [18000, 28000, 42000, 21000, 32000, 47000, 24000, 36000, 52000, 27000, 40000, 57000],
          income: [46000, 72000, 77000, 53000, 82000, 87000, 60000, 92000, 97000, 67000, 102000, 107000],
          expenses: [35000, 42000, 49000, 40000, 47000, 55000, 45000, 52000, 61000, 50000, 57000, 67000],
        },
        '2021': {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          xeroRevenue: [24000, 38000, 30000, 28000, 43000, 34000, 32000, 48000, 38000, 36000, 54000, 43000],
          paypalRevenue: [16000, 24000, 36000, 18000, 28000, 41000, 21000, 32000, 46000, 24000, 36000, 51000],
          income: [40000, 62000, 66000, 46000, 71000, 75000, 53000, 80000, 84000, 60000, 90000, 94000],
          expenses: [30000, 36000, 42000, 35000, 41000, 48000, 40000, 46000, 54000, 45000, 51000, 60000],
        }
      };
      return yearData[selectedPeriod] || yearData['2024'];
    }
  };

  // Get stats data based on selections
  const getStatsData = () => {
    const key = timePeriod === 'Annually' ? selectedPeriod : `${selectedPeriod}_${selectedYear}`;
    
    if (timePeriod === 'Monthly') {
      const monthStats = {
        'January_2024': {
          totalRevenue: '₹17,750',
          totalExpense: '₹15,250',
          netProfit: '₹2,500',
          netCashflow: '₹31,000',
          trends: {
            revenue: { value: 12.5, isPositive: true },
            expense: { value: 5.4, isPositive: false },
            profit: { value: 18.7, isPositive: true },
            cashflow: { value: 15.2, isPositive: true }
          }
        },
        'February_2024': {
          totalRevenue: '₹20,250',
          totalExpense: '₹17,500',
          netProfit: '₹2,750',
          netCashflow: '₹35,250',
          trends: {
            revenue: { value: 14.1, isPositive: true },
            expense: { value: 14.8, isPositive: false },
            profit: { value: 10.0, isPositive: true },
            cashflow: { value: 13.7, isPositive: true }
          }
        },
        'March_2024': {
          totalRevenue: '₹23,000',
          totalExpense: '₹19,750',
          netProfit: '₹3,250',
          netCashflow: '₹40,500',
          trends: {
            revenue: { value: 13.6, isPositive: true },
            expense: { value: 12.9, isPositive: false },
            profit: { value: 18.2, isPositive: true },
            cashflow: { value: 14.9, isPositive: true }
          }
        },
        'January_2023': {
          totalRevenue: '₹15,200',
          totalExpense: '₹13,100',
          netProfit: '₹2,100',
          netCashflow: '₹26,900',
          trends: {
            revenue: { value: 8.7, isPositive: true },
            expense: { value: 4.2, isPositive: false },
            profit: { value: 16.8, isPositive: true },
            cashflow: { value: 12.3, isPositive: true }
          }
        },
        'February_2023': {
          totalRevenue: '₹16,400',
          totalExpense: '₹14,200',
          netProfit: '₹2,200',
          netCashflow: '₹30,400',
          trends: {
            revenue: { value: 9.2, isPositive: true },
            expense: { value: 5.1, isPositive: false },
            profit: { value: 17.5, isPositive: true },
            cashflow: { value: 13.8, isPositive: true }
          }
        },
        'March_2023': {
          totalRevenue: '₹18,500',
          totalExpense: '₹15,800',
          netProfit: '₹2,700',
          netCashflow: '₹34,000',
          trends: {
            revenue: { value: 11.8, isPositive: true },
            expense: { value: 7.3, isPositive: false },
            profit: { value: 19.2, isPositive: true },
            cashflow: { value: 15.4, isPositive: true }
          }
        },
        // 2022 Monthly Stats
        'January_2022': {
          totalRevenue: '₹12,200',
          totalExpense: '₹10,000',
          netProfit: '₹2,200',
          netCashflow: '₹21,600',
          trends: {
            revenue: { value: 6.8, isPositive: true },
            expense: { value: 3.2, isPositive: false },
            profit: { value: 14.1, isPositive: true },
            cashflow: { value: 10.8, isPositive: true }
          }
        },
        'February_2022': {
          totalRevenue: '₹13,600',
          totalExpense: '₹11,200',
          netProfit: '₹2,400',
          netCashflow: '₹24,100',
          trends: {
            revenue: { value: 7.5, isPositive: true },
            expense: { value: 4.1, isPositive: false },
            profit: { value: 15.3, isPositive: true },
            cashflow: { value: 12.2, isPositive: true }
          }
        },
        'March_2022': {
          totalRevenue: '₹14,800',
          totalExpense: '₹12,600',
          netProfit: '₹2,200',
          netCashflow: '₹27,500',
          trends: {
            revenue: { value: 8.9, isPositive: true },
            expense: { value: 5.8, isPositive: false },
            profit: { value: 13.7, isPositive: true },
            cashflow: { value: 13.1, isPositive: true }
          }
        },
        // 2021 Monthly Stats
        'January_2021': {
          totalRevenue: '₹10,700',
          totalExpense: '₹8,800',
          netProfit: '₹1,900',
          netCashflow: '₹18,700',
          trends: {
            revenue: { value: 5.2, isPositive: true },
            expense: { value: 2.8, isPositive: false },
            profit: { value: 12.4, isPositive: true },
            cashflow: { value: 9.1, isPositive: true }
          }
        },
        'February_2021': {
          totalRevenue: '₹11,900',
          totalExpense: '₹9,900',
          netProfit: '₹2,000',
          netCashflow: '₹20,500',
          trends: {
            revenue: { value: 6.1, isPositive: true },
            expense: { value: 3.5, isPositive: false },
            profit: { value: 13.2, isPositive: true },
            cashflow: { value: 10.4, isPositive: true }
          }
        },
        'March_2021': {
          totalRevenue: '₹13,200',
          totalExpense: '₹11,000',
          netProfit: '₹2,200',
          netCashflow: '₹24,400',
          trends: {
            revenue: { value: 7.3, isPositive: true },
            expense: { value: 4.2, isPositive: false },
            profit: { value: 14.8, isPositive: true },
            cashflow: { value: 11.7, isPositive: true }
          }
        }
      };
      return monthStats[key] || monthStats['January_2024'];
    } else if (timePeriod === 'Quarterly') {
      const quarterStats = {
        'Q1_2024': {
          totalRevenue: '₹252,000',
          totalExpense: '₹162,000',
          netProfit: '₹90,000',
          netCashflow: '₹252,000',
          trends: {
            revenue: { value: 8.3, isPositive: true },
            expense: { value: 12.1, isPositive: false },
            profit: { value: 15.5, isPositive: true },
            cashflow: { value: 22.8, isPositive: true }
          }
        },
        'Q2_2024': {
          totalRevenue: '₹286,000',
          totalExpense: '₹183,000',
          netProfit: '₹103,000',
          netCashflow: '₹286,000',
          trends: {
            revenue: { value: 13.5, isPositive: true },
            expense: { value: 13.0, isPositive: false },
            profit: { value: 14.4, isPositive: true },
            cashflow: { value: 13.5, isPositive: true }
          }
        },
        'Q3_2024': {
          totalRevenue: '₹320,000',
          totalExpense: '₹203,000',
          netProfit: '₹117,000',
          netCashflow: '₹320,000',
          trends: {
            revenue: { value: 11.9, isPositive: true },
            expense: { value: 10.9, isPositive: false },
            profit: { value: 13.6, isPositive: true },
            cashflow: { value: 11.9, isPositive: true }
          }
        },
        'Q1_2023': {
          totalRevenue: '₹224,000',
          totalExpense: '₹144,000',
          netProfit: '₹80,000',
          netCashflow: '₹224,000',
          trends: {
            revenue: { value: 7.1, isPositive: true },
            expense: { value: 10.8, isPositive: false },
            profit: { value: 12.5, isPositive: true },
            cashflow: { value: 18.9, isPositive: true }
          }
        },
        'Q2_2023': {
          totalRevenue: '₹258,000',
          totalExpense: '₹162,000',
          netProfit: '₹96,000',
          netCashflow: '₹258,000',
          trends: {
            revenue: { value: 8.8, isPositive: true },
            expense: { value: 12.5, isPositive: false },
            profit: { value: 20.0, isPositive: true },
            cashflow: { value: 15.2, isPositive: true }
          }
        },
        'Q3_2023': {
          totalRevenue: '₹278,000',
          totalExpense: '₹177,000',
          netProfit: '₹101,000',
          netCashflow: '₹278,000',
          trends: {
            revenue: { value: 7.8, isPositive: true },
            expense: { value: 9.3, isPositive: false },
            profit: { value: 5.2, isPositive: true },
            cashflow: { value: 7.8, isPositive: true }
          }
        },
        'Q4_2023': {
          totalRevenue: '₹304,000',
          totalExpense: '₹192,000',
          netProfit: '₹112,000',
          netCashflow: '₹304,000',
          trends: {
            revenue: { value: 9.4, isPositive: true },
            expense: { value: 8.5, isPositive: false },
            profit: { value: 10.9, isPositive: true },
            cashflow: { value: 9.4, isPositive: true }
          }
        },
        // 2022 Quarterly Stats
        'Q1_2022': {
          totalRevenue: '₹195,000',
          totalExpense: '₹126,000',
          netProfit: '₹69,000',
          netCashflow: '₹195,000',
          trends: {
            revenue: { value: 6.0, isPositive: true },
            expense: { value: 9.5, isPositive: false },
            profit: { value: 10.2, isPositive: true },
            cashflow: { value: 16.1, isPositive: true }
          }
        },
        'Q2_2022': {
          totalRevenue: '₹222,000',
          totalExpense: '₹142,000',
          netProfit: '₹80,000',
          netCashflow: '₹222,000',
          trends: {
            revenue: { value: 13.8, isPositive: true },
            expense: { value: 12.7, isPositive: false },
            profit: { value: 15.9, isPositive: true },
            cashflow: { value: 13.8, isPositive: true }
          }
        },
        'Q3_2022': {
          totalRevenue: '₹249,000',
          totalExpense: '₹158,000',
          netProfit: '₹91,000',
          netCashflow: '₹249,000',
          trends: {
            revenue: { value: 12.2, isPositive: true },
            expense: { value: 11.3, isPositive: false },
            profit: { value: 13.8, isPositive: true },
            cashflow: { value: 12.2, isPositive: true }
          }
        },
        'Q4_2022': {
          totalRevenue: '₹276,000',
          totalExpense: '₹174,000',
          netProfit: '₹102,000',
          netCashflow: '₹276,000',
          trends: {
            revenue: { value: 10.8, isPositive: true },
            expense: { value: 10.1, isPositive: false },
            profit: { value: 12.1, isPositive: true },
            cashflow: { value: 10.8, isPositive: true }
          }
        },
        // 2021 Quarterly Stats
        'Q1_2021': {
          totalRevenue: '₹168,000',
          totalExpense: '₹108,000',
          netProfit: '₹60,000',
          netCashflow: '₹168,000',
          trends: {
            revenue: { value: 5.0, isPositive: true },
            expense: { value: 8.0, isPositive: false },
            profit: { value: 8.8, isPositive: true },
            cashflow: { value: 13.5, isPositive: true }
          }
        },
        'Q2_2021': {
          totalRevenue: '₹192,000',
          totalExpense: '₹124,000',
          netProfit: '₹68,000',
          netCashflow: '₹192,000',
          trends: {
            revenue: { value: 14.3, isPositive: true },
            expense: { value: 14.8, isPositive: false },
            profit: { value: 13.3, isPositive: true },
            cashflow: { value: 14.3, isPositive: true }
          }
        },
        'Q3_2021': {
          totalRevenue: '₹217,000',
          totalExpense: '₹140,000',
          netProfit: '₹77,000',
          netCashflow: '₹217,000',
          trends: {
            revenue: { value: 13.0, isPositive: true },
            expense: { value: 12.9, isPositive: false },
            profit: { value: 13.2, isPositive: true },
            cashflow: { value: 13.0, isPositive: true }
          }
        },
        'Q4_2021': {
          totalRevenue: '₹244,000',
          totalExpense: '₹156,000',
          netProfit: '₹88,000',
          netCashflow: '₹244,000',
          trends: {
            revenue: { value: 12.4, isPositive: true },
            expense: { value: 11.4, isPositive: false },
            profit: { value: 14.3, isPositive: true },
            cashflow: { value: 12.4, isPositive: true }
          }
        }
      };
      return quarterStats[key] || quarterStats['Q1_2024'];
    } else { // Annually
      const yearStats = {
        '2024': {
          totalRevenue: '₹1,371,000',
          totalExpense: '₹909,000',
          netProfit: '₹462,000',
          netCashflow: '₹1,371,000',
          trends: {
            revenue: { value: 25.4, isPositive: true },
            expense: { value: 18.9, isPositive: false },
            profit: { value: 32.1, isPositive: true },
            cashflow: { value: 28.7, isPositive: true }
          }
        },
        '2023': {
          totalRevenue: '₹1,215,000',
          totalExpense: '₹800,000',
          netProfit: '₹415,000',
          netCashflow: '₹1,215,000',
          trends: {
            revenue: { value: 22.7, isPositive: true },
            expense: { value: 16.2, isPositive: false },
            profit: { value: 29.8, isPositive: true },
            cashflow: { value: 24.3, isPositive: true }
          }
        },
        '2022': {
          totalRevenue: '₹1,035,000',
          totalExpense: '₹695,000',
          netProfit: '₹340,000',
          netCashflow: '₹1,035,000',
          trends: {
            revenue: { value: 18.2, isPositive: true },
            expense: { value: 14.1, isPositive: false },
            profit: { value: 26.3, isPositive: true },
            cashflow: { value: 20.8, isPositive: true }
          }
        }
      };
      return yearStats[selectedPeriod] || yearStats['2024'];
    }
  };

  const chartData = getChartData();
  const statsData = getStatsData();

  return (
    <div className="p-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        </div>

        {/* Time Period Selectors */}
        <div className="mb-6 flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-between">
                {timePeriod}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
              <DropdownMenuItem onClick={() => {
                setTimePeriod('Monthly');
                setSelectedPeriod('January');
              }}>
                Monthly
              </DropdownMenuItem>
               <DropdownMenuItem onClick={() => {
                 setTimePeriod('Quarterly');
                 setSelectedPeriod('Q1');
               }}>
                Quarterly
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => {
                setTimePeriod('Annually');
                setSelectedPeriod('2024');
              }}>
                Annually
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="w-[150px] justify-between">
                {selectedPeriod}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[150px]">
              {getPeriodOptions().map((option) => (
                <DropdownMenuItem key={option} onClick={() => setSelectedPeriod(option)}>
                  {option}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Year Dropdown - Show only for Monthly and Quarterly */}
          {(timePeriod === 'Monthly' || timePeriod === 'Quarterly') && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[150px] justify-between">
                  {selectedYear}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[150px]">
                {getYearOptions().map((year) => (
                  <DropdownMenuItem key={year} onClick={() => setSelectedYear(year)}>
                    {year}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-4 mb-6">
          <StatCard
            title="Total Revenue"
            value={statsData.totalRevenue}
            description={`This ${timePeriod.toLowerCase().slice(0, -2)}`}
            trend={statsData.trends.revenue}
            icon={<DollarSignIcon />}
          />
          <StatCard
            title="Total Expense"
            value={statsData.totalExpense}
            description={`This ${timePeriod.toLowerCase().slice(0, -2)}`}
            trend={statsData.trends.expense}
            icon={<CreditCardIcon />}
          />
          <StatCard
            title="Net Profit"
            value={statsData.netProfit}
            description={`This ${timePeriod.toLowerCase().slice(0, -2)}`}
            trend={statsData.trends.profit}
            icon={<TrendingUpIcon />}
          />
          <StatCard
            title="Net Cashflow"
            value={statsData.netCashflow}
            description={`Net this ${timePeriod.toLowerCase().slice(0, -2)}`}
            trend={statsData.trends.cashflow}
            icon={<BarChart3Icon />}
          />
        </div>

        {/* Charts */}
        <div className="space-y-4">
          <RevenueChart data={chartData} />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <ExpenseChart />
            <CashFlowChart data={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;