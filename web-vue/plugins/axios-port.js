import { setClient } from "~/services/axiosClient";

export default ({ app, store }) => {
  setClient(app.$axios);
};
