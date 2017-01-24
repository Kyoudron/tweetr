jQuery(document).ready(function(){

  $("textarea").on("input", function(event) {
    var len = $(this).val().length;
    let $counter = $(this).siblings(".counter")
    console.log($counter)
    counterUpdate($counter, len);
    })
});


function counterUpdate($counter, len) {
  let characters = 140 - len;
  $counter.text(characters);
  $counter.css("color", "black");
  if (characters < 0) {
    $counter.css("color", "red")
  };
}
