var videoIDArray = [];
var currentIndex = 0;

var apiKey = "AIzaSyC5lG6cr07lMFM_NjAiL3M8kd0Kgmz92-I";



function doSomething(query) {
    //var searchBoxString = document.getElementById("searchBox").value;
    var searchBoxString = query;

    var test = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q= "+ searchBoxString + "&key=AIzaSyBRHqgKlw9i17BaQdcM91PCSw_J4x-6yoc";

    console.log(searchBoxString);
    // console.log(doRequest("http://jsonip.com/"));
    doRequest(test);
}



function doRequest(url) {
    $.get(url, function(data, status){
        console.log("status: "+ status);

        var jsonData = JSON.parse(JSON.stringify(data));

        videoIDArray = [];

        for (var i=0; i<jsonData.items.length;i++) {
            videoIDArray.push(jsonData.items[i].id.videoId);
        }

        console.log("videoIDArray: "+videoIDArray);

        loadViewWithIndex(0);

    });
}

function onYouTubeIframeAPIReady() {
    if (videoIDArray[0]) {
        loadViewWithIndex(currentIndex);
    } else {
        console.log("There's no data in videoIDArray yet.");
    }
}

function reset() {
    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        iframes[i].parentNode.removeChild(iframes[i]);
    }
    var searchBox = document.getElementById("searchBox");
    searchBox.value = "";
}


function loadViewWithIndex(index) {

    var iframes = document.getElementsByTagName('iframe');
    for (var i = 0; i < iframes.length; i++) {
        iframes[i].parentNode.removeChild(iframes[i]);
    }

    var container = document.getElementById("video-container");
    var newDiv = document.createElement('div');
    newDiv.id = "videoPlayer";
    container.appendChild(newDiv);

    var player = new YT.Player('videoPlayer', {
        videoId: ""+videoIDArray[index],
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if(event.data === 0) {
        if (currentIndex < videoIDArray.length) {
            currentIndex++;
            loadViewWithIndex(currentIndex);
        }
    }
}

$(document).keydown(function(event){
    var key = event.which;
    switch(key) {
        case 37:
        // Key left.
        currentIndex -= 1;
        loadViewWithIndex(currentIndex);
        break;
        case 39:
        // Key right.
        currentIndex += 1;
        loadViewWithIndex(currentIndex);
        break;
    }
});
