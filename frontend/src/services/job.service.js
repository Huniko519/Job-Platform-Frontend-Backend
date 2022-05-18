import axios from "../axios";

class JobService {
  getJobs() {
    return axios
      .get("jobs/get")
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        return null;
      })
      .catch((error) => {
       console.log(error);
        return null;
      });
  }
  getBoardJobs(tab) {
    return axios
      .get(`jobs/board/get/${tab}`)
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        }
        return null;
      })
      .catch((error) => {
 //       console.log(error);
        return null;
      });
  }
  getJobById(id) {
 //   console.log(id);
    return axios
      .get(`jobs/get/${id}`)
      .then((response) => {
        if (response.status === 200) {
          return response.data[0];
        }
        return [];
      })
      .catch((err) => {
   //     console.log(err);
        return [];
      });
  }

  createJob(formData) {
    return axios
      .post("jobs/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          return response.data;
        }
        return null;
      })
      .catch((error) => {
     //   console.log(error);
        return null;
      });
  }

  getNewJobsContractor(tab) {
    return axios
      .get(`jobs/contractor/${tab}`)
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        }
        return [];
      })
      .catch((err) => {
        return [];
      });
  }
  ApproveTaskByBoard(id) {
 //   console.log("service job id", id);
    return axios.post(`jobs/board/approveTask`, { id: id }).then((response) => {
      if (response.status == 200) {
        return response.data[0];
      }
      return {};
    });
  }
}

export default new JobService();
