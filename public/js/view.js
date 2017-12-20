

$(document).ready(function() {


//on click function that creats a user with the given data
  $(document).on("click", ".create", function(e) {
    e.preventDefault()
    console.log(JSON.stringify({ namef: $("#userf").val().trim(''), namel: $("#userl").val().trim(''), email: $("#email").val().trim(''), pass: $("#pass").val().trim(''), 
    movie1: $("#movie1").val().trim(''), movie2: $("#movie2").val().trim(''), movie3: $("#movie3").val().trim(''), movie4: $("#movie4").val().trim(''), movie5: $("#movie5").val().trim('') }, null, 8))
    
    $.ajax({
      method: "POST",
      url: "/api/users",
      data: { unamef: $("#userf").val().trim(''), unamel: $("#userl").val().trim(''), email: $("#email").val().trim(''), pw: $("#pass").val().trim(''), movie1: $("#movie1").val().trim(''), movie2: $("#movie2").val().trim(''), movie3: $("#movie3").val().trim(''), movie4: $("#movie4").val().trim(''), movie5: $("#movie5").val().trim('')},
      dataType: "JSON"
    }).done(function(result) {
      window.location = result.redirect;
    });
  });

  // function used to login a user with the inputed data
  $(document).on("click", ".log", function(e) {
    e.preventDefault()
    console.log(JSON.stringify({ namef: $("#userf").val().trim(''), namel: $("#userl").val().trim(''), pass: $("#pass").val().trim('') }, null, 2))
    $.ajax({
      method: "POST",
      url: "/api/login",
      data: { unamef: $("#userf").val().trim(''), unamel: $("#userl").val().trim(''), pw: $("#pass").val().trim('') },
      dataType: "JSON"
    }).done(function(result) {
      console.log(result)
      window.location = result.redirect;
    });
  });

  $(document).on("click", "#testcase", function(e) {
      console.log(res.cookies);
      
  });

  

});

  