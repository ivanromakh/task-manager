changeColor();

function changeColor(){
  $(document).ready(function(){
    $('.change-color').mouseover(function(event){
      $(this).css("background-color", "grey"); 
    });

    $('.change-color').mouseout(function(event){
      $(this).css("background-color", "white "); 
    });
  });
}