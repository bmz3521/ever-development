import { MonitoringAPI, MonitoringTypeAPI, UserAPI } from '@api';

export async function getMonitoringData({ userId, typeId, page }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getMonitoringData({
        userId,
        typeId,
        page,
      });

      resolve(response);
    } catch (e) {
      console.log('Error retrieving monitoring data', e);
      reject({ err: e.response });
    }
  });
}

export async function sendMonitoringData(report) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await MonitoringAPI.sendMonitoringData(report);
      // report.appUserId

      resolve(response);
    } catch (e) {
      console.log('Error sending monitoring data', e);
      reject({ err: e.response });
    }
  });
}

export async function deleteMonitoringData({ itemId }) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await MonitoringAPI.deleteMonitoringData({ id: itemId });

      resolve(response);
    } catch (e) {
      console.log('Error deleting monitoring data', e);
      reject({ err: e.response });
    }
  });
}

// export async function sendToMonitoringType(id, data) {
//   return new Promise(async (resolve, reject) => {
//     console.log('id', id);
//     console.log('data', data);

//     const detail = data.detail;
//     const appUserId = data.appUserId;

//     try {
//       const response = await MonitoringTypeAPI.sendRelation({
//         id,
//         detail,
//         appUserId,
//       });

//       resolve(response);
//     } catch (e) {
//       console.log('Error sending monitoring data', e);
//       reject({ err: e.response });
//     }
//   });
// }
