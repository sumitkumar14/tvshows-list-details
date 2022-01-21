import axios from "axios";
const headers = { "Content-Type": "application/json" };
class Service{
    seriesList(){
        return axios
        .get("https://api.tvmaze.com/shows?page=1", { headers })
       
    }
    serachList(val){
        return axios.get(`https://api.tvmaze.com/singlesearch/shows?q=${val}`, { headers })
    }

    seriesDetails(showId){
        return axios.get(`https://api.tvmaze.com/shows/${showId}`, { headers });
    }
 }
export default Service;