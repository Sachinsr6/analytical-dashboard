import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon?: React.ReactNode;
  className?: string;
}

const StatCard = ({ title, value, description, trend, icon }: StatCardProps) => {
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

export default StatCard;