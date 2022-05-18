import { JobStatuses, JobStatusesContractor } from "../constants/mockup";
import isEmpty from "./is-empty";
class Utils {
  getContractorStatus(status) {
    return isEmpty(
      JobStatusesContractor.filter((item) => item.value == status)[0]
    )
      ? { value: "", label: "" }
      : JobStatuses.filter((item) => item.value == status)[0];
  }
  getOwnerStatus(status) {
  //  console.log(status);
    return isEmpty(JobStatuses.filter((item) => item.value == status)[0])
      ? { value: "", label: "" }
      : JobStatuses.filter((item) => item.value == status)[0];
  }
}

export default new Utils();
