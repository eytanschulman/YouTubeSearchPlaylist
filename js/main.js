function doSomething() {
  var searchBoxString = document.getElementById("searchBox").value;

  var test = "https://gdata.youtube.com/feeds/api/videos?q=" + encodeURI(searchBoxString);

  console.log(encodeURI(searchBoxString));
  // console.log(doRequest("http://jsonip.com/"));
 doRequest(test);
}

function doRequest(url) {
  $http.get(url).
  success(function(data, status, headers, config) {
    // this callback will be called asynchronously
    // when the response is available
    console.log("data: " + data);
    console.log("status: "+ status);
    console.log("headers: "+ headers);
    console.log("config: "+config);
  }).
  error(function(data, status, headers, config) {
    // called asynchronously if an error occurs
    // or server returns response with an error status.
  });
}
