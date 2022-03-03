import axios from "axios";

export default axios.create({
  baseURL: "https://api.unsplash.com",
  params: {
    client_id: "E6P9-gqIWNHL8_pIurIHSApv86WV_b7i7LyP7OVJbqc",
  },
});
