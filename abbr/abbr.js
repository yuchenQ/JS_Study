function displayAbbreviations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
    return false;
  }
  // get all the abbreviations
  var abbreviations = document.getElementsByTagName("abbr");
  if (abbreviations.length < 1)
    return false;
  var defs = new Array();
  // loop through the abbreviations
  for (var i = 0; i < abbreviations.length; i++) {
    var current_abbr = abbreviations[i];
    if (current_abbr.childNodes.length < 1) {
      continue;
    }

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
  if (dlist.childNodes.length < 1) {
    return false;
  }
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
function displayCitations() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode) {
    return false;
  }
  // get all the blockquotes
  var quotes = document.getElementsByTagName("blockquote");
  // loop through all the blockquotes
  for (var i = 0; i < quotes.length; i++) {
    // if there is no cite attribute, continue the loop
    if (!quotes[i].hasAttribute("cite"))
      continue;

    // store the cite attribute
    var url = quotes[i].getAttribute("cite");
    // get all the element nodes in the blockquote
    var quoteChildren = quotes[i].getElementsByTagName('*');
    // if there are no element nodes, continue the loop
    if (quoteChildren.length < 1)
      continue;

    // get the last element node in the blockquote
    var elem = quoteChildren[quoteChildren.length - 1];
    // create the markup
    var link = document.createElement("a");
    var link_text = document.createTextNode("source");
    link.appendChild(link_text);
    link.setAttribute("href", url);
    link.onclick = function() {
      popUp(this.getAttribute("href"));
      return false;
    }
    var superscript = document.createElement("sup");
    superscript.appendChild(link);
    // add the markup to the last element node in the blockquote
    elem.appendChild(superscript);
  }
}

function popUp(winURL) {
  window.open(winURL, "popup", "width=320,height=480");
}

// =============================================================================
function displayAccesskeys() {
  if (!document.getElementsByTagName || !document.createElement || !document.createTextNode)
    return false;

  // get all the links in the document
  var links = document.getElementsByTagName("a");
  // create an array to store the accesskeys
  var akeys = new Array();
  // loop through the links
  for (var i = 0; i < links.length; i++) {
    var current_link = links[i];
    // if there is no accesskey attribute, continue the loop
    if (current_link.getAttribute("accesskey") == null)
      continue;

    // get the value of the accesskey
    var key = current_link.getAttribute("accesskey");
    // get the value of the link text
    var text = current_link.lastChild.nodeValue;
    // add them to the array
    akeys[key] = text;
  }
  // create the list
  var list = document.createElement("ul");
  // loop through the accesskeys
  for (key in akeys) {
    var text = akeys[key];
    //  create the string to put in the list item
    var str = key + " : " + text;
    // create the list item
    var item = document.createElement("li");
    var item_text = document.createTextNode(str);
    item.appendChild(item_text);
    // add the list item to the list
    list.appendChild(item);
  }
  // create a headline
  var header = document.createElement("h3");
  var header_text = document.createTextNode("Accesskeys");
  header.appendChild(header_text);
  // add the headline to the body
  document.body.appendChild(header);
  // add the list to the body
  document.body.appendChild(list);
}
// =============================================================================
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
// =============================================================================
addLoadEvent(displayAbbreviations);
addLoadEvent(displayCitations);
addLoadEvent(displayAccesskeys);
