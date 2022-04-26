// $(".hamburger").click(function () {
//    $(".wrapper").toggleClass("shrink");
// });




// $(".catigory_link").click(function(){
//    const Class = $(this).attr("data-class");
//    const Catigory = $(this).attr("data-catigory");

//    $.get("/catigory",
//    {
//       Class : Class,
//       Catigory : Catigory
//    });
// });

// $(".mingo").click(function () {
//    $("#sidebartoggle").toggleClass("shrink");
// });






const catigories = {Phones:['Samsung','Huawei','Apple'],Books:['Historical','Novels','Fiction'],Clothes:['Kids','Women','Men'] }
function myFunction(){
   $('.choiceOption').remove();
   let catigory1 = $('#select1').val();
   catigories[catigory1].forEach(element => {
      $('#choice').after("<option class='choiceOption' value='"+element+"'> "+element+"</option>");
   });
}

// function search(){
//    let searchWord = $('searchBar').val();

//    $.ajax({
//       URL: '/search',
//       contentType: 'application/json',
//       data: JSON.stringify({searchWord: searchWord}),
//       success: function(){
//          console.log(searchWord,"success")
//       }
//    })
// }

