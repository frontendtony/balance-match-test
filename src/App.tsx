import noReportsImage from 'assets/images/no-reports.jpg';
import AppLayout from 'components/layout';
import DatePicker from 'components/primitives/DatePicker';
import Select from 'components/primitives/Select';
import useGateways from 'data/gateways';
import useProjects from 'data/projects';
import { useState } from 'react';
import './index.css';

function App() {
  const { data: projects = [] } = useProjects();
  const { data: gateways = [] } = useGateways();

  const [selectedProject, setSelectedProject] = useState<Record<'value' | 'label', string>>();
  const [selectedGateway, setSelectedGateway] = useState<Record<'value' | 'label', string>>();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <AppLayout>
      <div className="py-[2.0625rem] px-5 lg:px-0 flex-grow flex flex-col">
        <header className="lg:flex lg:space-x-8 space-y-4 lg:space-y-0 justify-between">
          <div>
            <h1 className="text-2xl text-dark font-bold">Reports</h1>
            <p className="font-bold text-light">Easily generate a report of your transactions</p>
          </div>
          <form
            data-testid="generate-report-form"
            className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3 lg:gap-[1.4375rem] items-start"
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
      </div>
    </AppLayout>
  );
}

export default App;
