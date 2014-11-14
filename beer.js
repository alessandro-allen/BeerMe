/**
 * Created by dromagnum on 11/12/14.
 */
var totalTags = 3;
var tags_dict = new Array();
tags_dict["hoppy"] = 1;
tags_dict["fruit"] = 0;
tags_dict["citrus"] = 2;

var calculateQvalue =  function(beer){
    var numTags = beer.tags.length();
    var sum = 0;
    for( var i = 0; i < numTags; i++){
        sum += (tags_dict[beer.tags[i]])*(1/numTags);

    }
}

var discount = function(beer, depth){
    return beer.abv*depth;
}

var beer = { name:"Ale", tags:[ "hoppy","fruit","citrus"], abv:0.08};