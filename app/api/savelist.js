import Resource from '@utils/resource';

export default new Resource('/Savelists', {
  addItemSavelist: {
    url: `{savelistId}/clinics/rel/{clinicId}`,
    method: `put`,
  },
  deleteItemSavelist: {
    url: `{savelistId}/clinics/rel/{clinicId}`,
    method: `delete`,
  },
});
