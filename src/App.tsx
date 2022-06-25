import { Disclosure } from '@headlessui/react';
import noReportsImage from 'assets/images/no-reports.jpg';
import AppLayout from 'components/layout';
import DatePicker from 'components/primitives/DatePicker';
import ReportTable from 'components/primitives/ReportTable';
import Select from 'components/primitives/Select';
import useGateways from 'data/gateways';
import useProjects from 'data/projects';
import { FormEventHandler, useState } from 'react';
import type { ApiResponse, Report, SelectOption } from 'types';
import { addThousandSeparator, groupReportsByGateway, groupReportsByProject } from 'utils';
import './index.css';

function App() {
  const { data: projects = [] } = useProjects();
  const { data: gateways = [] } = useGateways();

  const [selectedProject, setSelectedProject] = useState<SelectOption>();
  const [selectedGateway, setSelectedGateway] = useState<SelectOption>();
  const [startDate, setStartDate] = useState('2021-01-01');
  const [endDate, setEndDate] = useState('2021-12-31');

  const [reportsData, setReportsData] = useState<{
    reports: Report[];
    project: SelectOption;
    gateway: SelectOption;
  }>();

  const [isSubmitting, setSubmitting] = useState(false);
  const [reportError, setReportError] = useState('');

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      setSubmitting(true);
      setReportError('');
      const reponse = await fetch('http://178.63.13.157:8090/mock-api/api/report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: startDate,
          to: endDate,
          ...(selectedProject &&
            selectedProject.value !== 'all' && { projectId: selectedProject.value }),
          ...(selectedGateway &&
            selectedGateway.value !== 'all' && { gatewayId: selectedGateway.value }),
        }),
      });
      const { data, error }: ApiResponse<Report[]> = await reponse.json();

      if (error) throw new Error(error);

      setReportsData({
        reports: data,
        project: selectedProject ?? { value: 'all', label: 'All projects' },
        gateway: selectedGateway ?? { value: 'all', label: 'All gateways' },
      });
    } catch (e: any) {
      setReportError(e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppLayout>
      <div className="py-[2.0625rem] px-5 lg:px-0 flex-grow flex flex-col">
        <header className="lg:flex lg:space-x-8 space-y-4 lg:space-y-0 justify-between">
          <div>
            <h1 className="text-2xl text-dark font-bold">Reports</h1>
            <p className="font-bold text-light">Easily generate a report of your transactions</p>
          </div>
          <form
            onSubmit={handleSubmit}
            data-testid="generate-report-form"
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-x-[1.4375rem] items-start"
          >
            <Select
              value={selectedProject}
              onChange={setSelectedProject}
              options={[{ value: 'all', label: 'All projects' }].concat(
                projects?.map(({ name, projectId }) => ({ value: projectId, label: name }))
              )}
              placeholder="Select project"
            />
            <Select
              value={selectedGateway}
              onChange={setSelectedGateway}
              options={[{ value: 'all', label: 'All gateways' }].concat(
                gateways?.map(({ name, gatewayId }) => ({ value: gatewayId, label: name }))
              )}
              placeholder="Select gateway"
            />
            <DatePicker value={startDate} onChange={setStartDate} label="Choose a start date" />
            <DatePicker value={endDate} onChange={setEndDate} label="Choose an end date" />
            <button
              className="bg-brand text-white rounded-[0.3125rem] h-8 col-span-2 md:col-span-1"
              type="submit"
            >
              Generate Report
            </button>
          </form>
        </header>
        {reportsData ? (
          <div className="space-y-7">
            <div className="mt-7 bg-brand-light rounded-[0.625rem] p-6">
              <p className="text-dark font-bold mb-8">
                <span>{reportsData.project?.label || 'All projects'}</span>
                &nbsp;|&nbsp;
                <span>{reportsData.gateway?.label || 'All gateways'}</span>
              </p>
              {reportsData.gateway.value === 'all' && reportsData.project.value === 'all' ? (
                <ReportTable reports={reportsData.reports} />
              ) : reportsData.project.value === 'all' ? (
                Object.values(groupReportsByProject(reportsData.reports, projects)).map(
                  ({ name, reports: r }) => (
                    <Disclosure key={name}>
                      <Disclosure.Button className="flex justify-between items-center bg-white rounded-[0.625rem] p-6 w-full mt-[0.3125rem]">
                        <span className="font-bold text-dark">{name}</span>
                        <span className="font-bold text-dark">
                          TOTAL: {addThousandSeparator(r.reduce((a, c) => a + c.amount, 0))} USD{' '}
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-[0.875rem] pl-3">
                        <ReportTable reports={r} />
                      </Disclosure.Panel>
                    </Disclosure>
                  )
                )
              ) : (
                Object.values(groupReportsByGateway(reportsData.reports, gateways)).map(
                  ({ name, reports: r }) => (
                    <Disclosure key={name}>
                      <Disclosure.Button className="flex justify-between items-center bg-white rounded-[0.625rem] p-6 w-full mt-[0.3125rem]">
                        <span className="font-bold text-dark">{name}</span>
                        <span className="font-bold text-dark">
                          TOTAL: {addThousandSeparator(r.reduce((a, c) => a + c.amount, 0))} USD{' '}
                        </span>
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-[0.875rem] pl-3">
                        <ReportTable reports={r} />
                      </Disclosure.Panel>
                    </Disclosure>
                  )
                )
              )}
            </div>
            <div className="mt-7 bg-brand-light rounded-[0.625rem] p-6">
              <span className="font-bold text-dark">
                TOTAL |{' '}
                {addThousandSeparator(reportsData.reports.reduce((a, c) => c.amount + a, 0))} USD
              </span>
            </div>
          </div>
        ) : (
          <div className="flex-grow text-center flex flex-col items-center justify-center max-w-lg mx-auto">
            <p className="font-bold text-dark text-2xl">No reports</p>
            <p className="text-light font-bold">
              Currently you have no data for the reports to be generated. Once you start generating
              traffic through the Balance application the reports will be shown.
            </p>
            <img
              src={noReportsImage}
              role="presentation"
              className="mt-12"
              width={402.5}
              height={171.38}
            />
          </div>
        )}
      </div>
    </AppLayout>
  );
}

export default App;
