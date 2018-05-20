function showPic(whichpic) {
  // var source = whichpic.getAttribute("href");
  // var placeholder = document.getElementById("placeholder");
  // placeholder.src = source;
  document.getElementById("placeholder").setAttribute("src", whichpic.getAttribute("href"));

  // var text = whichpic.getAttribute("title");
  // var description = document.getElementById("description");
  // description.firstChild.nodeValue = text;
  document.getElementById("description").firstChild.nodeValue = whichpic.getAttribute("title");
}
