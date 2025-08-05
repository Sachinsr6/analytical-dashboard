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
        borderColor: '#8b5cf6',
        backgroundColor: '#8b5cf620',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'PayPal Revenue',
        data: sampleData.paypalRevenue,
        borderColor: '#06b6d4',
        backgroundColor: '#06b6d420',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#06b6d4',
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
          '#f97316',
          '#6366f1',
          '#10b981',
          '#8b5cf6',
          '#06b6d4',
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
        backgroundColor: '#6366f1',
        borderColor: '#6366f1',
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Expenses',
        data: sampleData.expenses,
        backgroundColor: '#f97316',
        borderColor: '#f97316',
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

  // Generate options based on time period
  const getPeriodOptions = () => {
    switch (timePeriod) {
      case 'Monthly':
        return ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      case 'Quarterly':
        return ['Q1 2024', 'Q2 2024', 'Q3 2024', 'Q4 2024'];
      case 'Annually':
        return ['2021', '2022', '2023', '2024'];
      default:
        return [];
    }
  };

  // Get chart data based on selections
  const getChartData = () => {
    if (timePeriod === 'Monthly') {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
        xeroRevenue: [3000, 4750, 3750, 6250],
        paypalRevenue: [2000, 3000, 4500, 3750],
        income: [5000, 7750, 8250, 10000],
        expenses: [3750, 4500, 5250, 6250],
      };
    } else if (timePeriod === 'Quarterly') {
      return {
        labels: ['Month 1', 'Month 2', 'Month 3'],
        xeroRevenue: [36000, 57000, 45000],
        paypalRevenue: [24000, 36000, 54000],
        income: [60000, 93000, 99000],
        expenses: [45000, 54000, 63000],
      };
    } else { // Annually
      return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        xeroRevenue: [138000, 171000, 195000, 216000],
        paypalRevenue: [114000, 147000, 183000, 207000],
        income: [252000, 318000, 378000, 423000],
        expenses: [162000, 207000, 252000, 288000],
      };
    }
  };

  // Get stats data based on selections
  const getStatsData = () => {
    if (timePeriod === 'Monthly') {
      return {
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
      };
    } else if (timePeriod === 'Quarterly') {
      return {
        totalRevenue: '₹138,000',
        totalExpense: '₹162,000',
        netProfit: '₹-24,000',
        netCashflow: '₹252,000',
        trends: {
          revenue: { value: 8.3, isPositive: true },
          expense: { value: 12.1, isPositive: false },
          profit: { value: 15.5, isPositive: false },
          cashflow: { value: 22.8, isPositive: true }
        }
      };
    } else { // Annually
      return {
        totalRevenue: '₹720,000',
        totalExpense: '₹909,000',
        netProfit: '₹-189,000',
        netCashflow: '₹1,371,000',
        trends: {
          revenue: { value: 25.4, isPositive: true },
          expense: { value: 18.9, isPositive: false },
          profit: { value: 32.1, isPositive: false },
          cashflow: { value: 28.7, isPositive: true }
        }
      };
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
                setSelectedPeriod('Q1 2024');
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
        </div>

        {/* Stats */}
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mb-6">
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