// function styleHeaderSiblings() {
//   if (!document.getElementsByTagName)
//     return false;
//   var headers = document.getElementsByTagName("h1");
//   for (var i = 0; i < headers.length; i++) {
//     var elem = getNextElement(headers[i].nextSibling);
//     addClass(elem, "intro");
//   }
// }

function styleElementNextSiblings(tag, theclass) {
  if (!document.getElementsByTagName)
    return false;
  var elems = document.getElementsByTagName(tag);
  for (var i = 0; i < elems.length; i++) {
    var elem = getNextElement(elems[i].nextSibling);
    addClass(elem, theclass);
  }
}

function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    element.className += " ";
    element.className += value;
  }
}

function getNextElement(node) {
  if (node.nodeType == 1) {
    return node;
  }
  if (node.nextSibling) {
    return getNextElement(node.nextSibling);
  }
  return null;
}

function addLoadEvent(func) {
  var oldonload = window.onload;
  if (typeof window.onload != 'function') {
    window.onload = func;
  } else {
    window.onload = function() {
      oldonload();
      func();
    };
  }
}

addLoadEvent(function() {
  styleElementNextSiblings("h1", "intro");
});
// addLoadEvent(styleHeaderSiblings);
