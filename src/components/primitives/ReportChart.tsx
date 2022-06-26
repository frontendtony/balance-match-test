import { ApexOptions } from 'apexcharts';
import Chart from 'react-apexcharts';
import { addThousandSeparator } from 'utils';

interface ReportChartProps {
  series: { name: string; amount: number }[];
  label: 'GATEWAY' | 'PROJECT';
}

export default function ReportChart(props: ReportChartProps) {
  const colors = Array(props.series.length)
    .fill(0)
    .map(
      (_, idx) =>
        // this generates a random color with a high enough contrast againt the white label
        `hsl(${
          Math.floor(Math.random() * (idx * 180 - (idx + 1) * 180 + 1)) + (idx + 1) * 180
        }, 100%, 30%)`
    );

  const chartOptions: ApexOptions = {
    dataLabels: {
      enabled: true,
      dropShadow: { enabled: false },
      style: { fontFamily: '"Roboto", sans-serif', fontSize: '1rem' },
    },
    legend: { show: false },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '50%',
        },
        customScale: 0.75,
      },
    },
    colors,
    chart: {
      dropShadow: {
        enabled: false,
      },
      animations: {
        enabled: false,
      },
    },
    stroke: { width: 3 },
    tooltip: {
      enabled: false,
    },
  };

  return (
    <div className="flex flex-col space-y-8">
      <div className="bg-brand-light rounded-[0.625rem] p-6 flex items-center space-x-8">
        {props.series.map(({ name }, idx) => (
          <div key={name} className="flex space-x-3 items-center">
            <span
              className="h-4 w-4 rounded-[0.3125rem] inline-block"
              style={{ backgroundColor: colors[idx] }}
            />
            <span className="block">{name}</span>
          </div>
        ))}
      </div>
      <Chart
        options={chartOptions}
        series={props.series.map((s) => s.amount)}
        type="donut"
        height={500}
      />
      <div className="bg-brand-light rounded-[0.625rem] p-6">
        <span className="font-bold text-dark">
          {props.label} TOTAL |{' '}
          {addThousandSeparator(props.series.reduce((a, c) => c.amount + a, 0))} USD
        </span>
      </div>
    </div>
  );
}
