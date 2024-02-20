import { getKVOItem, createKVO } from "src/api/kvo";

import { formatCustomDate } from "src/composition/formatCustomDate";

export default {
  namespaced: true,

  actions: {
    async getKVOItem(_, id) {
      try {
        const response = await getKVOItem(id);
        const data = await response.data
        const item = {
          ...data,
          createdAt: formatCustomDate(data.createdAt, true),
          incidentDate: formatCustomDate(data.incidentDate),
        };
        return item;
      } catch (e) {
        throw e;
      }
    },

    async createKVO(_, data) {
      try {
        await createKVO(data);
      } catch (e) {
        throw e;
      }
    },
  },
};
