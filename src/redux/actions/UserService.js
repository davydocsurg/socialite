import API, { Endpoints } from "../../api/axios";

export const GetAuthUserService = async () => {
  return await API.get(Endpoints.authUser);
};
