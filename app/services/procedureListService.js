import { ProcedureListAPI } from '@api';

export async function getProcedureList(filter = {}) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await ProcedureListAPI.getProcedureList({
        filter: filter,
      });

      resolve(response);
    } catch (e) {
      console.log('Error retrieving ProcedureList', e);
      reject({ err: e.response });
    }
  });
}
