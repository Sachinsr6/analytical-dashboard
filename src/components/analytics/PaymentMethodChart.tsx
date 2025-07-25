import { Pie } from 'react-chartjs-2';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { chartColors, defaultChartOptions } from '@/lib/chartConfig';

interface PaymentMethodChartProps {
  data?: {
    methods: string[];
    amounts: number[];
  };
}

const PaymentMethodChart = ({ data }: PaymentMethodChartProps) => {
  // Sample data - replace with real payment method data from PayPal
  const sampleData = {
    methods: ['Credit Card', 'Bank Transfer', 'PayPal Balance', 'Debit Card', 'Other'],
    amounts: [45000, 28000, 15000, 12000, 5000],
  };

  const chartData = data || sampleData;

  const pieData = {
    labels: chartData.methods,
    datasets: [
      {
        data: chartData.amounts,
        backgroundColor: [
          chartColors.paypal,
          chartColors.xero,
          chartColors.revenue,
          chartColors.profit,
          chartColors.expense,
        ],
        borderColor: '#ffffff',
        borderWidth: 3,
        hoverBorderWidth: 4,
      },
    ],
  };

  const options = defaultChartOptions;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Payment Methods</CardTitle>
        <CardDescription>
          Revenue breakdown by payment method
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <Pie data={pieData} options={options} />
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentMethodChart;