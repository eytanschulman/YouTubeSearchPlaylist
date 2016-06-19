
var playlist = [];
var currentIndex = 0;
var maxResults = "50";
var searchResults;
var player;
var muteAlways = false;

var apiKey = "AIzaSyAkUMakzGsceYSdRLix6jWNFZDbogt5rXY";

//Important URLs:
//https://www.googleapis.com/youtube/v3/videos?part=snippet&id=SK3NbwUrzwY&key=AIzaSyC5lG6cr07lMFM_NjAiL3M8kd0Kgmz92-I
//https://www.googleapis.com/youtube/v3/channels?part=snippet&id=UCmWxBj64pEUXnM_AVgaRaMQ&key=AIzaSyC5lG6cr07lMFM_NjAiL3M8kd0Kgmz92-I

function isMobile() {
    var mobileWidths = [
        320, //iPhone 5 and below, portrait
        480, //iPhone 4s and below, landscape
        568, //iPhone 5, landscape
        375, //iPhone 6, portrait
        667, //iPhone 6, landscape
        414, //iPhone 6+, portrait
        736, //iPhone 6+, landscape
        384, //Nexus 4 and others, portait
        640, //Standard Android, landscape
        360, //Standard Android
        533, //Nokia Lumia 520, landscape
        1024, //iPad landscape
        768, //iPad portrait
    ];
    for (var i in mobileWidths) {
        if(document.body.clientWidth === mobileWidths[i]) {
            return true;
        }
    }

    return false;
}

function reset() {
    $("#video-container").empty();
    $("#playlist-preview").empty();
    $("#search-query")[0].value = "";
    $("#search-query").trigger(jQuery.Event("focusout"));
    $("#pld-title").html("Make a search");
    $("#pld-description").html("Go ahead, try \"Coldplay Midnight cover\"!");
    $("#pld-progress").html("Video 1/&infin;");
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

        playlist = [];
        console.log("searchResults");
        console.log(searchResults);

        for (var i=0; i<searchResults.items.length;i++) {
            if(searchResults.items[i].id.kind === "youtube#video") {
                //videoIDArray.push(searchResults.items[i].id.videoId);
                playlist.push({
                    title: searchResults.items[i].snippet.title,
                    authorTitle: searchResults.items[i].snippet.channelTitle,
                    authorId: searchResults.items[i].snippet.channelId,
                    videoId: searchResults.items[i].id.videoId,
                    thumbnail: searchResults.items[i].snippet.thumbnails.default.url
                });
            }
        }
        for(var i = 0; i < playlist.length; i++) {
            var elem = createPlaylistItemElement({
                playlistNumber: i+1,
                title: playlist[i].title,
                videoId: playlist[i].videoId,
                author: playlist[i].authorTitle,
                authorId: playlist[i].authorId,
                thumbnail: playlist[i].thumbnail
            });
            $(elem.children[0]).removeClass("not-shown");
            $("#playlist-preview").append(elem);
        }
        console.log(playlist);
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

    player = new YT.Player('videoPlayer', {
        videoId: String(playlist[index].videoId),
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,

        }
    });
    if($("#vc-mute").children()[0].children[0].checked === true) {
        player.mute();
    }
}

function onPlayerReady(event) {
    event.target.playVideo();
    $("#pld-progress").html("Video "+(currentIndex+1)+"/"+playlist.length);
    $("#pld-loading").addClass("not-shown");
}

function onPlayerStateChange(event) {
    $("#pld-loading").addClass("not-shown");
    if(event.data === 0) {
        if (currentIndex < playlist.length) {
            currentIndex++;
            loadVideoWithIndex(currentIndex);
        } else if(currentIndex === playlist.length-1){
            //If it's the last video in the result list...
            //TODO
            //Reload some more results and append them to the videoIDArray
        }
    }
}

function createPlaylistItemElement(t) {

    var elem = document.createElement("div");
    elem.innerHTML = document.getElementById("playlist-preview-item-template").innerHTML;
    console.log(elem);
    elem.innerHTML = String(elem.innerHTML).replace("{{PLAYLIST_NUMBER}}",t.playlistNumber);
    elem.innerHTML = String(elem.innerHTML).replace("{{PLAYLIST_VIDEO_TITLE}}",t.title);
    elem.innerHTML = String(elem.innerHTML).replace("{{PLAYLIST_VIDEO_ID}}",t.videoId);
    elem.innerHTML = String(elem.innerHTML).replace("{{PLAYLIST_VIDEO_AUTHOR}}",t.author);
    elem.innerHTML = String(elem.innerHTML).replace("{{PLAYLIST_VIDEO_AUTHOR_ID}}",t.authorId);
    elem.innerHTML = String(elem.innerHTML).replace("{{PLAYLIST_VIDEO_THUMBNAIL}}",t.thumbnail);
    console.log(elem);
    return elem;
}
