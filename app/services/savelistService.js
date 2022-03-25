import { UserAPI, SavelistAPI } from '@api';

export const createSavelist = payload => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.savelist(payload);
      resolve(response);
    } catch (e) {
      reject({ error: e.response });
    }
  });
};

export const getSavelist = ({ userId, clinicId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getSavelist({
        userId,
        filter: {
          include: {
            relation: 'clinics',
            fields: ['id'],
            scope: {
              where: {
                id: clinicId,
              },
            },
          },
        },
      });
      console.log('clinicId:>>', clinicId, 'response:>>', response);
      resolve(response);
    } catch (e) {
      reject({ error: e.response });
    }
  });
};

export const addItemSavelist = ({ savelistId, clinicId }) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await SavelistAPI.addItemSavelist({
        savelistId,
        clinicId,
      });
      resolve(response);
    } catch (e) {
      reject({ error: e.response });
    }
  });
};

export const deleteItemSavelist = payload => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await SavelistAPI.deleteItemSavelist(payload);
      resolve(response);
    } catch (e) {
      reject({ error: e.response });
    }
  });
};
