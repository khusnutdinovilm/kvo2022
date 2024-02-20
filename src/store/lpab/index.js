import { getLPABItem, createLPAB } from "src/api/lpab";

import { formatCustomDate } from "src/composition/formatCustomDate";

export default {
  namespaced: true,

  actions: {
    async getLPABItem(_, id) {
      try {
        const response = await getLPABItem(id);
        let lpabItem = await response.data;
        lpabItem = {
          id: lpabItem.id,
          name: lpabItem.name,
          department_name: lpabItem.department_id?.name,
          locationName: lpabItem.location,
          date: formatCustomDate(lpabItem.date),
          created_at: formatCustomDate(lpabItem.created_at, true),
          staff: lpabItem.staff,
          auditor_name: lpabItem.auditor_id.name,
          descriptionBd: lpabItem.descriptionBd,
          measuresBd: lpabItem.measuresBd,
          descriptionOd: lpabItem.descriptionOd,
          measuresOd: lpabItem.measuresOd,
          status: lpabItem.status,
          rejection_comment: lpabItem.rejection_comment,
        };
        return lpabItem;
      } catch (e) {
        throw e;
      }
    },

    async createLPAB(_, data) {
      try {
        await createLPAB(data);
      } catch (e) {
        throw e;
      }
    },
  },
};
