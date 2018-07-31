for (var i = 0; i < 4; i++) {
  setTimeout(function() {
    console.log(i);
  }, 0);
}
// -----------------------------------------------------------------------------
for (var i = 0; i < 4; i++) {
  (function(i) {
    setTimeout(function() {
      console.log(i);
    }, 0);
  })(i);
}
// =============================================================================
function createFunctions() {
  var result = new Array();

  for (var i = 0; i < 10; i++) {
    result[i] = function(num) {
      return function() {return num;};
    }(i);
  }
  return result;
}

var funcs = createFunctions();
for (var i=0; i < funcs.length; i++){
    console.log(funcs[i]());
}
// =============================================================================
function log(){
  console.log.apply(console, arguments);
}
log(1);    //1
log(1,2);    //1 2
