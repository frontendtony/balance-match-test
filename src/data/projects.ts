import { useQuery } from 'react-query';
import { Project } from 'types';

export default function useProjects() {
  const query = useQuery('projects', async () => {
    const response = await fetch('http://178.63.13.157:8090/mock-api/api/projects');
    const { data, error }: { code: string; data: Project[]; error: string } = await response.json();

    if (error) throw new Error(error);

    return data;
  });

  return query;
}
