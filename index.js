flubber = require("flubber"); // Node classic

function rndIndex() {
  return Math.floor(Math.random() * (50));
}

function myfunc(svgItem1, path1, path2, interpolator) {
  requestAnimationFrame(draw);

  var start = null;
  var duration = 2000;
  function draw(time) {
    if (!start) start = time;
    var t = (time - start)/duration;
    $(svgItem1).attr("d", interpolator(t));
    if (t < 1) {
        requestAnimationFrame(draw);
    }
  }
  
}

var a = document.getElementById("statessvg");
a.addEventListener("load",function(){
  
  var svgDoc = a.contentDocument;
  var paths = $(svgDoc).find("path");
  var pathCopy = [];
  
  $.each(paths, function(i,val) {
    $(val).attr("fill-opacity",0.75);
    $(val).attr("stroke","black");
    pathCopy.push($(val).attr("d"));
  });
  setInterval(function() {
    var svgItem1 = $(paths[rndIndex()]);
    var path1 = $(svgItem1).attr("d");
    var path2 = pathCopy[rndIndex()];
    var interpolator = flubber.interpolate(path1, path2);
    myfunc(svgItem1, path1, path2, interpolator);
  },100);
}, false);