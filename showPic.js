function prepareGallery() {
  if (!document.getElementsByTagName
    || !document.getElementById
    || !document.getElementById("imagegallery"))
    return false;

  var gallery = document.getElementById("imagegallery");
  var links = gallery.getElementsByTagName("a");
  for (link in links) {
    link.onclick = function() {
      return showPic(this) ? false : true;
    }
  }
}

function showPic(whichpic) {
  if (!document.getElementById("placeholder"))
    return false;
  var source = whichpic.getAttribute("href");
  var placeholder = document.getElementById("placeholder");
  if(placeholder.nodeName != "IMG")
    return false;
  placeholder.setAttribute("src", source);

  if (document.getElementById("description")) {
    var text = whichpic.getAttribute("title")
      ? whichpic.getAttribute("title")
      : "";
    var description = document.getElementById("description");
    if (description.firstChild.nodeType == 3)
      description.firstChild.nodeValue = text;
    }
    return true;
  }

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    }
  }
}

addLoadEvent(prepareGallery);
