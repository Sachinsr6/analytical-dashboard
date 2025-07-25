import { Line } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chartColors, defaultChartOptions } from '@/lib/chartConfig';

interface RevenueChartProps {
  data?: {
    labels: string[];
    xeroRevenue: number[];
    paypalRevenue: number[];
  };
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  // Sample data - replace with real Xero/PayPal data
  const sampleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    xeroRevenue: [12000, 19000, 15000, 25000, 22000, 30000],
    paypalRevenue: [8000, 12000, 18000, 15000, 20000, 25000],
  };

  const chartData = data || sampleData;

  const lineData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Xero Revenue',
        data: chartData.xeroRevenue,
        borderColor: chartColors.xero,
        backgroundColor: `${chartColors.xero}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors.xero,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
      {
        label: 'PayPal Revenue',
        data: chartData.paypalRevenue,
        borderColor: chartColors.paypal,
        backgroundColor: `${chartColors.paypal}20`,
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: chartColors.paypal,
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      title: {
        display: false,
      },
    },
    scales: {
      ...defaultChartOptions.scales,
      y: {
        ...defaultChartOptions.scales?.y,
        beginAtZero: true,
        ticks: {
          ...defaultChartOptions.scales?.y?.ticks,
          callback: function(value: any) {
            return '$' + value.toLocaleString();
          },
        },
      },
    },
  };

  return (
    <Card className="col-span-2">
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

export default RevenueChart;