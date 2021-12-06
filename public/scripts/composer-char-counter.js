$(document).ready(function() {
 
    $("#tweet-text").keyup(function(event){
     $("#counter").text($(this).val().length);
     let input = $(this).val().length
     if(input>140 ){
        $("#counter").css("color",'red')
     }
     else{
         $('#counter').css("color","")
     }
    })
  });




