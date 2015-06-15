// function doSomething() {
//   var searchBoxString = document.getElementById("searchBox").value;
//
//   var test = "https://gdata.youtube.com/feeds/api/videos?q=" + encodeURI(searchBoxString);
//
//   console.log(encodeURI(searchBoxString));
//   // console.log(doRequest("http://jsonip.com/"));
//  doRequest(test);
// }
//
// function doRequest(url) {
//   $http.get(url).
//   success(function(data, status, headers, config) {
//     // this callback will be called asynchronously
//     // when the response is available
//     console.log("data: " + data);
//     console.log("status: "+ status);
//     console.log("headers: "+ headers);
//     console.log("config: "+config);
//   }).
//   error(function(data, status, headers, config) {
//     // called asynchronously if an error occurs
//     // or server returns response with an error status.
//   });
// }
window.runAction = function runAction() {
  var req = createRequest(); // defined above
  // Create the callback:
  req.onreadystatechange = function() {
    if (req.readyState != 4) return; // Not there yet
    if (req.status != 200) {
      // Handle request failure here...
      return;
    }
    // Request successful, read the response
    var resp = req.responseText;
    console.log("response: "+ resp);
    // ... and use it as needed by your app.
  }

  req.open("GET", "https://gdata.youtube.com/feeds/api/videos?q= +"encodeURI("Shut up and Dance"), true);
  req.send();

  req.open("GET", url, true);
  req.setRequestHeader("Content-Type",
                       "text/json");
  req.send(form-encoded request body);
}
