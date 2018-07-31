function stripeTables() {
  if (!document.getElementsByTagName)
    return false;
  var tables = document.getElementsByTagName("table");
  for (var i = 0; i < tables.length; i++) {
    var odd = false;
    var rows = tables[i].getElementsByTagName("tr");
    for (var j = 0; j < rows.length; j++) {
      if (odd == true) {
        addClass(rows[j], "odd");
        odd = false;
      } else {
        odd = true;
      }
    }
  }
}

// =============================================================================
function displayAbbreviations() {
  if (!document.getElementsByTagName
    || !document.createElement
    || !document.createTextNode) {return false;}
  // get all the abbreviations
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1)
    return false;
  var defs = new Array();
  // loop through the abbreviations
  for (var i = 0; i < abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1){continue;}

    var definition = current_abbr.getAttribute("title");
    var key = current_abbr.lastChild.nodeValue;
    defs[key] = definition;
    // defs[abbreviations[i].lastChild.nodeValue] = abbreviations[i].getAttribute("title");
  }
  // create the definition list
  var dlist = document.createElement("dl");
  // loop through the definitions
  for (key in defs) {
    var definition = defs[key];
    // create the definition title
    var dtitle = document.createElement("dt");
    var dtitle_text = document.createTextNode(key);
    dtitle.appendChild(dtitle_text);
    // create the definition description
    var ddesc = document.createElement("dd");
    var ddesc_text = document.createTextNode(definition);
    ddesc.appendChild(ddesc_text);
    // add them to the definition list
    dlist.appendChild(dtitle);
    dlist.appendChild(ddesc);
  }
  if (dlist.childNodes.length < 1){return false;}
  // create a headline
  var header = document.createElement("h2");
  var header_text = document.createTextNode("Abbreviations");
  header.appendChild(header_text);
  // add the headline to the body
  document.body.appendChild(header);
  // add the definition list to the body
  document.body.appendChild(dlist);
}

// =============================================================================
function highlightRows() {
  if(!document.getElementsByTagName) return false;
  var rows = document.getElementsByTagName("tr");
  for (var i=0; i<rows.length; i++) {
    rows[i].onmouseover = function() {
      this.style.fontWeight = "bold";
    }
    rows[i].onmouseout = function() {
      this.style.fontWeight = "normal";
    }
  }
}

// =============================================================================
function addClass(element, value) {
  if (!element.className) {
    element.className = value;
  } else {
    newClassName = element.className;
    newClassName += " ";
    newClassName += value;
    element.className = newClassName;
  }
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

addLoadEvent(stripeTables);
addLoadEvent(displayAbbreviations);
addLoadEvent(highlightRows);
