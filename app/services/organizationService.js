import { OrganiztionAPI, UserAPI } from '@api';

export async function getListOrganiztion() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await OrganiztionAPI.getOrganizations();
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}

export function getRequestStatus(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await UserAPI.getOrgSubmission({ userId });
      resolve(response);
    } catch (e) {
      reject({ err: e.response });
    }
  });
}
