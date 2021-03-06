var BASE = "https://api.github.com/repos/jupyter/jupyterlab";

console.log("Starting...")

var prevStars;
var prevForks;
var prevIssues;

$(document).ready(function(){

  pullChanges()

  setInterval(function() {
    pullChanges();
  }, 60000)

});

function popup(stuff){
  $('.wrap, a').toggleClass('active');
  $("#stuff").text("Hooray! We are at star #" + stuff);
  var id = setTimeout(function() {
    $('.wrap, a').toggleClass('active');
  }, 4000);
  return false;
}

var pullChanges = function() {

  // Pull Requests
  var requestPulls = new XMLHttpRequest();
  requestPulls.open("GET", BASE + "/pulls", false);
  requestPulls.send();

  // Stargazers + Issues + Forks
  var jsonPulls = JSON.parse(requestPulls.responseText);
  $('#pull').text(jsonPulls.length);

  var requestData = new XMLHttpRequest();
  requestData.open("GET", BASE, false);
  requestData.send();

  var jsonData = JSON.parse(requestData.responseText);
  var stars = parseInt(jsonData.stargazers_count);
  var forks = parseInt(jsonData.forks_count);
  var issues = parseInt(jsonData.open_issues_count);

  $("#stars").text(stars);
  $("#forks").text(forks);
  $("#issues").text(issues);

  // Notification Stuff
  if (prevStars == null || prevForks == null || prevIssues == null) {
    prevStars = stars;
    prevForks = forks;
    prevIssues = issues;
  }

  // Check Stars
  if (prevStars < stars) {
    $('#notif').text("NEW STAR :D");
    prevStars = stars;
    popup(stars);
  } else if (prevStars > stars) {
    $('#notif').text("LOST STAR :(");
    prevStars = stars;
  }


  // Last PR
  var requestPR = new XMLHttpRequest();
  requestPR.open("GET", BASE + "/issues", false);
  requestPR.send();

  var jsonPR = JSON.parse(requestPR.responseText);
  console.log(jsonPR)
  $("#last_issue_1").text(jsonPR[0].title);
  $("#last_issue_2").text(jsonPR[1].title);
  $("#last_issue_3").text(jsonPR[2].title);

}
