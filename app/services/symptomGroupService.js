import { SymptomGroupAPI } from '@api';

export async function getSymptomGroups() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await SymptomGroupAPI.getSymptomGroups();

      resolve(response);
    } catch (e) {
      console.log('Error retrieving SymptomGroups', e);
      reject({ err: e.response });
    }
  });
}

export async function getMedicationForOrgs(symptomGroupId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await SymptomGroupAPI.getMedicationForOrgs({
        symptomGroupId,
        filter: {
          include: [{ relation: 'medication' }],
        },
      });

      const prescriptions = await response.map(item => {
        const {
          amount,
          drugFrequency,
          drugRoute,
          drugTimeEvent,
          unitPriceCents,
        } = item;
        const {
          activeIngredient,
          createdAt,
          dosageForm,
          drugRoutes,
          strength,
          tpuCode,
          tradeName,
          updatedAt,
        } = item.medication;

        const prescription = {
          activeIngredient,
          amount,
          createdAt,
          dosageForm,
          drugRoute,
          drugRoutes,
          drugTimeEvent,
          drugTimeFrequency: drugFrequency,
          strength,
          tpuCode,
          tradeName,
          unitPriceCents,
          updatedAt,
        };
        return prescription;
      });

      resolve(prescriptions);
    } catch (e) {
      console.log('Error retrieving MedicationForOrgs', e);
      reject({ err: e.response });
    }
  });
}
