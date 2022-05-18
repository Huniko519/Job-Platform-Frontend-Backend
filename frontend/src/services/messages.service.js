import axios from "axios";

class MessageService {
  getMessagesByJobId(id) {
    return axios
      .get(`messages/${id}`)
      .then((response) => {
        if (response.status == 200) {
          return response.data;
        }
        return null;
      })
      .catch((err) => {
        return null;
      });
  }
}

export default new MessageService();
