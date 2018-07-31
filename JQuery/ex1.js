// $(document).ready(function(){
//   $("button").click(function(){
//     $("p").hide();
//   });
// });
$(document).ready(() => {
  $("#b1").click(() => {
    $("p").hide();
  });
});

$(function() {
  $("#b2").click(() => {
    $("p").show();
  });
});
// =============================================================================
$(function(){
  $("input").focus(function(){
    $(this).css("background-color","#cccccc");
  });
  $("input").blur(function(){
    $(this).css("background-color","#ffffff");
  });
});
