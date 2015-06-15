function doSomething() {
  var searchBoxString = document.getElementById("searchBox").value;

  var test = "https://gdata.youtube.com/feeds/api/videos?q=" + encodeURI("Heros Cover");

  console.log(encodeURI(searchBoxString));
  console.log(doRequest(encodeURI(searchBoxString)));
}

function doRequest(urlToRequest) {
  $.get(
    urlToRequest,
    {paramOne : 1, paramX : 'abc'},
    function(data) {
       alert('page content: ' + data);
    }
);
}
