
var totalTags = 3;
var tags_dict = new Array();
//Temp seasonal values as for prototyping
var styleEffect = 2;

//example user dict of tags
tags_dict["hoppy"] = 1;
tags_dict["fruit"] = 0;
tags_dict["citrus"] = 2;
var beers = new Array();
//var maxDepth = 6;

/*
If no playlist has been generated, generate a new playlist
If the user dislikes a beer or the end of the playlist has been reached, generate a new playlist
Otherwise, recommend the nth beer in the playlist where n is the index into the playlist. Increment n with
each "next" click or "like".
 */

var calculateQvalue =  function(beer, depth){
    var numTags = beer.tags.length();
    var q;
    q = transfer(beer) * (1 + discount(beer, depth));
    return q;
}

var calculateBestBeer = function(beers, depth){
    var maximum = -Infinity;
    var bestBeer;
    var q;
    for( var i = 0; i < beers.length(); i++){
        q = calculateQvalue(beers[i], depth);
        if( q > maximum ){
            maximum = q;
            bestBeer = beers[i];
        }
        else if( q == maximum ){
            // If two beers have the same q value, select one at random by generating a random number
            // between 0 and 1. If the random number is > 0.5, take the current beer.
            var rando = Math.random();
            if( rando > 0.5 ){
                bestBeer = beers[i];
            }
        }
    }
    return bestBeer;
}

var calculatePlaylist = function(beers, maxDepth){
    var playlist = new Array();
    for( var i = 1; i <= maxDepth; i++){
        playlist.concat(calculateBestBeer(beers, i));
    }
    return playlist;
}
var transfer = function(beer, style){
    var sum = 0;
    var numTags = beer.tags.length();
    for( var i = 0; i < numTags; i++){
        sum += (tags_dict[beer.tags[i]]) * (1/totalTags);
        if(beer.style == style){
           sum *= styleEffect;
        }

    }
    return sum
}

var discount = function(beer, depth){
    return beer.abv*depth;
}

var regex_pattern = function( inputString ){
    var list = inputString.split("\n");
    var regExString = "/w*\s*";
    for(var i = 0; i < list.length(); i++){
        if( i == 0){
            regExString += list[i];
        }
        else {
            regExString += "|" + list[i];
        }
    }
    regExString += "\s+/i";
    return regExString;
}

var extend_tag_list(beer, ){

}