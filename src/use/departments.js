import { computed, ref } from "vue";
import { useStore } from "vuex";

export default function () {
  const store = useStore();

  const departmentsOptions = computed(() => store.getters["departments/departments"]);
  const getDepartments = async () => {
    try {
      await store.dispatch("departments/getDepartments");
    } catch (e) {
      throw e;
    }
  };

  const auditorsOptions = ref([]);
  const getAuditors = async (departmentId) => {
    try {
      const auditors = await store.dispatch("departments/getAuditors", departmentId);
      auditorsOptions.value = auditors.map((auditor) => ({
        id: auditor.id,
        name: auditor.name,
        deaprtment_id: auditor.deaprtment_id,
      }));
    } catch (e) {
      throw e;
    }
  };

  return {
    departmentsOptions,
    getDepartments,
    auditorsOptions,
    getAuditors,
  };
}
