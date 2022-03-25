import { SubmissionAPI } from '@api';

export async function createSubmissionOrg(organizationId) {
  return new Promise(async (resolve, reject) => {
    try {
      if (organizationId) {
        const response = await SubmissionAPI.submissionOrg({ organizationId });
        resolve(response);
      } else {
        resolve();
      }
    } catch (e) {
      reject({ err: e.response });
    }
  });
}
