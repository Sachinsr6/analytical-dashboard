import { useEffect } from 'react';
import RevenueChart from './RevenueChart';
import ExpenseChart from './ExpenseChart';
import CashFlowChart from './CashFlowChart';
import PaymentMethodChart from './PaymentMethodChart';
import StatCard from './StatCard';
import '@/lib/chartConfig';

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

const AnalyticsDashboard = () => {
  useEffect(() => {
    // Initialize chart configurations when component mounts
    import('@/lib/chartConfig');
  }, []);

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive financial insights from Xero and PayPal integrations
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value="$125,430"
            description="This month"
            trend={{ value: 12.5, isPositive: true }}
            icon={<DollarSignIcon />}
          />
          <StatCard
            title="Profit Margin"
            value="32.4%"
            description="Current month"
            trend={{ value: 2.1, isPositive: true }}
            icon={<TrendingUpIcon />}
          />
          <StatCard
            title="Active Transactions"
            value="2,847"
            description="Last 30 days"
            trend={{ value: 8.3, isPositive: true }}
            icon={<CreditCardIcon />}
          />
          <StatCard
            title="Cash Flow"
            value="$87,320"
            description="Net this month"
            trend={{ value: 15.2, isPositive: true }}
            icon={<BarChart3Icon />}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <RevenueChart />
          <ExpenseChart />
          <CashFlowChart />
          <PaymentMethodChart />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;