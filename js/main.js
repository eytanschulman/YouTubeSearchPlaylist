var videoIDArray = [];
var currentIndex = 0;
var maxResults = "50";
var searchResults;

var apiKey = "AIzaSyC5lG6cr07lMFM_NjAiL3M8kd0Kgmz92-I";

function reset() {
    $("#video-container").empty();
    $("#search-query")[0].value = "";
    $("#pld-title").html("Make a search");
    $("#pld-description").html("Go ahead, try \"Coldplay Midnight cover\"!")
}

function getPlaylistFromQuery(query,callback) {

    var requestUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults="+maxResults+"&q= "+query+"&key="+apiKey;

    if(callback === undefined && typeof callback !== "function") {
        callback =  function(){};
    }

    $.ajax({
        url: requestUrl,
        success: function(data){
            searchResults = data;
        },
        complete: function(){
            callback(); //Calls searchSuccessful()
        }
    });
}

function searchSuccessful() {
    if(searchResults === undefined) {
        console.error("Search was unsuccessful."); //This line is kind of ironic
    }
    else {

        videoIDArray = [];

        for (var i=0; i<searchResults.items.length;i++) {
            if(searchResults.items[i].id.kind === "youtube#video") {
                videoIDArray.push(searchResults.items[i].id.videoId);
            }
        }
        console.log(videoIDArray)
        if(currentIndex === 0) {
            loadVideoWithIndex(0);
        }
    }
}

function loadVideoWithIndex(index) {

    var container = $("#video-container");

    container.empty();

    var tempDiv = document.createElement('div');
    tempDiv.id = "videoPlayer";
    container.append(tempDiv);

    var player = new YT.Player('videoPlayer', {
        videoId: ""+videoIDArray[index],
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,

        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
    $("#pld-progress").html("Video "+(currentIndex+1)+"/"+videoIDArray.length);
}

function onPlayerStateChange(event) {
    console.log(event);
    if(event.data === 1) {
        //If the video starts playing
        $("#pld-loading").addClass("not-shown");
    }
    if(event.data === 0) {
        if (currentIndex < videoIDArray.length) {
            currentIndex++;
            loadVideoWithIndex(currentIndex);
        } else if(currentIndex === videoIDArray.length-1){
            //If it's the last video in the result list...

            //Reload some more results and append them to the videoIDArray
        }
    }
}
