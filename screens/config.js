import axios from "axios";

export default axios.create({
  baseURL: "https://api.yelp.com/v3/businesses",
  headers: {
    Authorization: 
        "Bearer 4920r19IvbobRJbesn12dtbIscO9w1WogrcDdPPiwCGlqkTjAz7sV9tVG1cXtXwjvnTCPc05R_Edn9s6GkaYjICvDhAgpVtlfpHbCQvueZXMCwl4Aca3iIjLuiYyZnYx",
  },
});