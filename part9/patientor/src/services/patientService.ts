import axios from 'axios';

import { apiBaseUrl } from '../constants';
import { Patient } from '../types';

const getPatient = async (id: string) => {
  const response = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return response.data;
};

export { getPatient };
