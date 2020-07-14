export const auth = {
  methods: {
    getHeaderConfig() {
      let token = localStorage.api_token;
      let axiosConfig = {
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          Accept: "application/json",
          Authorization: `Bearer ${token}`
        }
      };

      return axiosConfig;
    },

    returnBaseUrl() {
      return `${localStorage.api_url}/api`;
    }

  }
}
