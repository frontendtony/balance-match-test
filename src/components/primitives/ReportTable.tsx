import type { Report } from 'types';
import { addThousandSeparator } from 'utils';

interface ReportTableProps {
  reports: Report[];
}

export default function ReportTable(props: ReportTableProps) {
  const { reports } = props;

  return (
    <table className="w-full text-dark">
      <thead>
        <tr className="bg-white">
          <td className="px-5 py-[0.625rem]">Date</td>
          <td className="px-5 py-[0.625rem] text-center">Transaction ID</td>
          <td className="px-5 py-[0.625rem] text-right">Amount</td>
        </tr>
      </thead>
      <tbody>
        {reports.map((report) => (
          <tr key={report.paymentId} className="even:bg-white">
            <td className="px-5 py-[0.625rem]">{new Date(report.created).toLocaleDateString()}</td>
            <td className="px-5 py-[0.625rem] text-center">{report.paymentId}</td>
            <td className="px-5 py-[0.625rem] text-right">
              {addThousandSeparator(report.amount)} USD
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
