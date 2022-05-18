import axios from "axios";
import isEmpty from "../utils/is-empty";

class OfferService {
  addOffers(formData) {
    return axios
      .post("offers/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
        return null;
      })
      .catch((err) => {
        return null;
      });
  }

  getOffersByJobId(jobid) {
    return axios
      .get(`offers/${jobid}`)
      .then((res) => {
        if (res.status == 200) {
          return res.data;
        }
        return [];
      })
      .catch((err) => {
        return [];
      });
  }
  getOfferDetailByJobId(jobid) {
    return axios
      .get(`offers/detail/${jobid}`)
      .then((res) => {
        if (res.status == 200) {
    //("getOfferDetailBYJobId", res.data);
          return res.data;
        }
      })
      .catch((err) => {
  //      console.log("error", err);
        return null;
      });
  }
  approveOfferByJobId(data) {
    return axios
      .post("offers/approve", data)
      .then((res) => {
        if (res.status == 200) {
       //   console.log(res.data);
          return res.data;
        }
      })
      .catch((err) => {
   //     console.log(err);
        return null;
      });
  }
}

export default new OfferService();
