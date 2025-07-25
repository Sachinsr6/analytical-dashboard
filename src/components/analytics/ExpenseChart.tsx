import { Doughnut } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chartColors, defaultChartOptions } from '@/lib/chartConfig';

interface ExpenseChartProps {
  data?: {
    categories: string[];
    amounts: number[];
  };
}

const ExpenseChart = ({ data }: ExpenseChartProps) => {
  // Sample data - replace with real expense data from Xero
  const sampleData = {
    categories: ['Office Supplies', 'Marketing', 'Travel', 'Software', 'Utilities'],
    amounts: [3500, 8200, 2100, 4800, 1900],
  };

  const chartData = data || sampleData;

  const doughnutData = {
    labels: chartData.categories,
    datasets: [
      {
        data: chartData.amounts,
        backgroundColor: [
          chartColors.expense,
          chartColors.revenue,
          chartColors.profit,
          chartColors.xero,
          chartColors.paypal,
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 4,
      },
    ],
  };

  const options = {
    ...defaultChartOptions,
    plugins: {
      ...defaultChartOptions.plugins,
      legend: {
        ...defaultChartOptions.plugins?.legend,
        position: 'bottom' as const,
      },
      tooltip: {
        ...defaultChartOptions.plugins?.tooltip,
        callbacks: {
          label: function(context: any) {
            const label = context.label || '';
            const value = context.parsed;
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
          },
        },
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

export default ExpenseChart;