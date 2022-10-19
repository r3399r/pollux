import { GetVariableParam, GetVariableResponse } from '@y-celestial/pollux-service';
import http from 'src/util/http';

const getVariable = async (params: GetVariableParam) =>
  await http.authGet<GetVariableResponse, GetVariableParam>('variable', { params });

export default {
  getVariable,
};
