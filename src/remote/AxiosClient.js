import axios from "axios";

const baseURL = "https://fifa-dashboard-api.herokuapp.com/graphql";

export default axios.create({
    baseURL
});