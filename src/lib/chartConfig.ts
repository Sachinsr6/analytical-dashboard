import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  Filler,
);

// Default chart options for consistent styling
export const defaultChartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12,
          weight: 'bold' as const,
        },
      },
    },
    tooltip: {
      backgroundColor: 'rgba(15, 23, 42, 0.9)',
      titleColor: '#f8fafc',
      bodyColor: '#f8fafc',
      borderColor: '#e2e8f0',
      borderWidth: 1,
      cornerRadius: 8,
      padding: 12,
    },
  },
  scales: {
    x: {
      grid: {
        color: 'rgba(148, 163, 184, 0.1)',
      },
      ticks: {
        color: '#64748b',
        font: {
          size: 11,
        },
      },
    },
    y: {
      grid: {
        color: 'rgba(148, 163, 184, 0.1)',
      },
      ticks: {
        color: '#64748b',
        font: {
          size: 11,
        },
      },
    },
  },
};

// Color palette for charts
export const chartColors = {
  revenue: '#22c55e',
  expense: '#ef4444',
  profit: '#a855f7',
  xero: '#0d9488',
  paypal: '#0070d2',
  gradient: {
    revenue: ['#22c55e', '#16a34a'],
    expense: ['#ef4444', '#dc2626'],
    profit: ['#a855f7', '#9333ea'],
    xero: ['#0d9488', '#0f766e'],
    paypal: ['#0070d2', '#0066cc'],
  },
};