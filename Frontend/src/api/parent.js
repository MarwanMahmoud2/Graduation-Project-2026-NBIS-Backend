import client from './client';

export const parentService = {
  getMyChildren: async () => {
    const response = await client.get('/my-children');
    return response.data.data || response.data;
  },

  getChild: async (childId) => {
    const response = await client.get(`/my-children/${childId}`);
    return response.data.data || response.data;
  },

  reportMissing: async (data) => {
    const response = await client.post('/my-children/missing-reports', data);
    return response.data;
  },

  getMyReports: async () => {
    const response = await client.get('/my-reports');
    return response.data.data || response.data;
  },
};
