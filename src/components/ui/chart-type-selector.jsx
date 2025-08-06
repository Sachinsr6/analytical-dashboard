import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { BarChart3, LineChart, PieChart, BarChart2 } from 'lucide-react';

const ChartTypeSelector = ({ value = 'line', onValueChange, className = '' }) => {
  const chartTypes = [
    { value: 'line', label: 'Line Chart', icon: LineChart },
    { value: 'bar', label: 'Bar Chart', icon: BarChart3 },
    { value: 'horizontalBar', label: 'Horizontal Bar', icon: BarChart2 },
    { value: 'pie', label: 'Pie Chart', icon: PieChart },
  ];

  return (
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className={`w-[140px] ${className}`}>
        <SelectValue>
          {chartTypes.find(type => type.value === value)?.label || 'Line Chart'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {chartTypes.map((type) => {
          const Icon = type.icon;
          return (
            <SelectItem key={type.value} value={type.value}>
              <div className="flex items-center gap-2">
                <Icon className="h-4 w-4" />
                {type.label}
              </div>
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default ChartTypeSelector;