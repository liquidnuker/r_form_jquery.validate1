import "./styles/main.scss";
import "./js/vendor/jquery.validate_1.14.0.js";

// 
// ======================================================/
$.validator.setDefaults({
  submitHandler: function () {
    alert("submitted!");
  }
});

$().ready(function () {
  // validate signup form on keyup and submit
  $("#form1").validate({
    // uses name attr
    rules: {
      firstname: "required",
      lastname: "required",
      username: {
        required: true,
        minlength: 2
      },
      password: {
        required: true,
        minlength: 5
      },
      message2: {
        required: true,
        minlength: 5
      },
      confirm_password: {
        required: true,
        minlength: 5,
        equalTo: "#password"
      },
      email: {
        required: true,
        email: true
      },
      topic: {
        required: "#newsletter:checked",
        minlength: 2
      },
      agree: "required",
    },
    messages: {
      // firstname: "Please enter your firstname",
      // lastname: "Please enter your lastname",
      // username: {
      //   required: "Please enter a username",
      //   minlength: "Your username must consist of at least 2 characters"
      // },
      // password: {
      //   required: "Please provide a password",
      //   minlength: "Your password must be at least 5 characters long"
      // },
      // confirm_password: {
      //   required: "Please provide a password",
      //   minlength: "Your password must be at least 5 characters long",
      //   equalTo: "Please enter the same password as above"
      // },
      // email: "Please enter a valid email address",
      // agree: "Please accept our policy",
      // topic: "Please select at least 2 topics"
    },
    errorPlacement: function (error, element) {
      let placement = $(element).data('error');
      if (placement) {
        $(placement).append(error);
        console.log("appended");
      } else {
        error.insertAfter(element);
        console.log("else");
      }
    }
  });

  // propose username by combining first- and lastname
  $("#username").focus(function () {
    let firstname = $("#firstname").val();
    let lastname = $("#lastname").val();
    if (firstname && lastname && !this.value) {
      this.value = firstname + "." + lastname;
    }
  });

  //code to hide topic selection, disable for demo
  const newsletter = $("#newsletter");
  // newsletter topics are optional, hide at first
  let inital = newsletter.is(":checked");
  let topics = $("#newsletter_topics")[inital ? "removeClass" : "addClass"]("gray");
  let topicInputs = topics.find("input").attr("disabled", !inital);
  // show when newsletter is checked
  newsletter.click(function () {
    topics[this.checked ? "removeClass" : "addClass"]("gray");
    topicInputs.attr("disabled", !this.checked);
  });
});