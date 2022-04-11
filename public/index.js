$(".hamburger").click(function () {
   $(".wrapper").toggleClass("shrink");
});

$(".catigory_link").click(function(){
   const Class = $(this).attr("data-class");
   const Catigory = $(this).attr("data-catigory");

   $.get("/catigory",
   {
      Class : Class,
      Catigory : Catigory
   });
});