//requires unirest package for api call to return movie/tv show objects
var unirest = require("unirest");
var axios = require("axios");
var term = process.argv[2];


function getGenre(name){
    var show = name;

    var query = "https://api.themoviedb.org/3/search/tv?api_key=c46142c3f1b1cbfb5aa59c22ce677737&language=en-US&query=" + show +"&page=1"

    return axios.get(query);

    //return showInfo.response.data.results[0].genre_ids[0];


}

//function to search for 20 random tv shows based on given genre
function tmdb(term) {
    var genre = term;
    //forms query string for axios.get method
    var query = "https://api.themoviedb.org/3/discover/tv?api_key=c46142c3f1b1cbfb5aa59c22ce677737&language=en-US&sort_by=popularity.desc&page=1&timezone=America%2FNew_York&with_genres=" + genre + "&include_null_first_air_dates=false";
    return axios.get(query);
}

//function to search for movie from term input above
function utelly(term, callback) {

    //utelly search url set for US region, search term
    var url = "https://utelly-tv-shows-and-movies-availability-v1.p.mashape.com/lookup?country=us&term=";

    var search = url + term; //compiles search term for utelly api

    var myResults; //instantiate custom variable for easier manipulation


    unirest.get(search)
        .header("X-Mashape-Key", "Z7ALjmjagsmshZf262HZ87d9JFl4p1VEQkAjsnhlk2ILLsLolu")
        .header("Accept", "application/json")
        .end(function(result) {
            myResults = result.body.results; //pass search results to custom variable
            //console.log(myResults);//-debugging option to return all results from search
            //loop through results array to filter out non-exact matches
            console.log(myResults);
            callback(myResults)

            console.log("*********************************")//-break line
            //console.log(myResults); //log results to screen



        });

}


module.exports = {
    tmdb: tmdb,
    utelly: utelly,
    getGenre: getGenre
}