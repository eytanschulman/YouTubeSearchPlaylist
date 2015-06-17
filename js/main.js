function doSomething() {
  var searchBoxString = document.getElementById("searchBox").value;

  var test = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q= "+ searchBoxString + "&key=AIzaSyBRHqgKlw9i17BaQdcM91PCSw_J4x-6yoc";

  console.log(searchBoxString);
  // console.log(doRequest("http://jsonip.com/"));
 doRequest(test);
}

var videoIDArray = [];
var currentIndex = 0;

function doRequest(url) {
  $.get(url, function(data, status){
    // this callback will be called asynchronously
    // when the response is available
    // console.log("data: " + data);
    // console.log("JSON: " + JSON.stringify(data));
    console.log("status: "+ status);

    var jsonData = JSON.parse(JSON.stringify(data));
    console.log("jsonData: "+ jsonData);
    var arr = jsonData[1];
    console.log(arr);

    for (var i=0; i<jsonData.items.length;i++) {
      var item = jsonData.items[i];
      var idTag = item["id"];
      var vidID = idTag["videoId"];

      videoIDArray.push(vidID);
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

function loadViewWithIndex(index) {
  var player;
  if (index < 1) {
  player = new YT.Player('videoPlayer', {
              height: '390',
              width: '640',
              videoId: ""+videoIDArray[index],
              events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
              }
            });
    } else {
      player = new YT.Player('videoPlayer', {
                  height: '390',
                  width: '640',
                  videoId: ""+videoIDArray[index],
                  events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                  }
                });
        document.getElementById("videoPlayer").innerHTML = player;
    }
}

// autoplay video
        function onPlayerReady(event) {
            event.target.playVideo();
        }

        // when video ends
        function onPlayerStateChange(event) {
            if(event.data === 0) {
                if (currentIndex < videoIDArray.length) {
                  currentIndex++;
                  loadViewWithIndex(currentIndex);
                }
            }
        }
