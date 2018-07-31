function prepareSlideshow() {
  // Make sure the browser understands the DOM methods
  if (!document.getElementsByTagName)
    return false;
  if (!document.getElementById)
    return false;

  // Make sure the elements exist
  if (!document.getElementById("linklist"))
    return false;
  if (!document.getElementById("preview"))
    return false;

  // Apply styles to the preview image
  var preview = document.getElementById("preview");
  preview.style.position = "absolute";
  preview.style.left = "0px";
  preview.style.top = "0px";
  // Get all the links in the list
  var list = document.getElementById("linklist");
  var links = list.getElementsByTagName("a");
  // Attach the animation behavior to the mouseover event
  links[0].onmouseover = function() {
    moveElement("preview", -100, 0, 10);
  }
  links[1].onmouseover = function() {
    moveElement("preview", -200, 0, 10);
  }
  links[2].onmouseover = function() {
    moveElement("preview", -300, 0, 10);
  }
}

function moveElement(elementID, final_x, final_y, interval) {
  if (!document.getElementById)
    return false;
  if (!document.getElementById(elementID)) 
    return false;
  var elem = document.getElementById(elementID);
  if (elem.movement) {
    clearTimeout(elem.movement);
  }
  var xpos = parseInt(elem.style.left);
  var ypos = parseInt(elem.style.top);

  if (xpos == final_x && ypos == final_y) {
    return true;
  }
  if (xpos < final_x) {
    xpos++;
  }
  if (xpos > final_x) {
    xpos--;
  }
  if (ypos < final_y) {
    ypos++;
  }
  if (ypos > final_y) {
    ypos--;
  }
  elem.style.left = xpos + "px";
  elem.style.top = ypos + "px";
  var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y + "," + interval + ")";
  elem.movement = setTimeout(repeat, interval);
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

addLoadEvent(prepareSlideshow);
