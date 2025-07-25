import { Bar } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chartColors, defaultChartOptions } from '@/lib/chartConfig';

interface CashFlowChartProps {
  data?: {
    labels: string[];
    income: number[];
    expenses: number[];
  };
}

const CashFlowChart = ({ data }: CashFlowChartProps) => {
  // Sample data - replace with real cash flow data
  const sampleData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    income: [20000, 31000, 33000, 40000, 42000, 55000],
    expenses: [15000, 18000, 21000, 25000, 28000, 32000],
  };

  const chartData = data || sampleData;

  const barData = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Income',
        data: chartData.income,
        backgroundColor: chartColors.revenue,
        borderColor: chartColors.revenue,
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
      {
        label: 'Expenses',
        data: chartData.expenses,
        backgroundColor: chartColors.expense,
        borderColor: chartColors.expense,
        borderWidth: 1,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const options = defaultChartOptions;

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

export default CashFlowChart;