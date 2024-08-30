$(document).ready(function() {
    var currentStep = 0;
    var steps = $(".form-step");
    var progressBar = $("#progressBar");
    var form = $("#multistepForm");
    var dataTable = $("#dataTable");
  
    function showStep(step) {
      steps.addClass("d-none");
      $(steps[step]).removeClass("d-none");
      var percent = (step + 1) / steps.length * 100;
      progressBar.css("width", percent + "%");
      progressBar.text("Step " + (step + 1) + " of " + steps.length);
    }
  
    function validateStep(step) {
      var valid = true;
      $(steps[step]).find("input, textarea, select").each(function() {
        if (!form.validate().element($(this))) {
          valid = false;
        }
      });
      return valid;
    }
  
    $(".next-step").click(function() {
      if (validateStep(currentStep) && currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  
    $(".prev-step").click(function() {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  
    form.validate({
      errorPlacement: function(error, element) {
        if (element.attr("type") === "radio" || element.attr("type") === "checkbox") {
          error.insertAfter(element.closest(".form-check-inline").parent());
        } else {
          error.insertAfter(element);
        }
      },
      rules: {
        firstName: {
          required: true,
          regex: /^[a-zA-Z]+$/
        },
        lastName: {
          required: true,
          regex: /^[a-zA-Z]+$/
        },
        email: {
          required: true,
          email: true
        },
        password: {
          required: true,
          minlength: 5
        },
        phoneNumber: {
          required: true,
          regex: /^\d{10}$/
        },
        address: {
          required: true,
          regex: /^[a-zA-Z0-9\s,.'-]{3,}$/
        },
        gender: {
          required: true
        },
        hobbies: {
          required: true,
          minlength: 1
        }
      },
      messages: {
        firstName: {
          required: "Please enter your first name",
          regex: "Please enter a valid first name (letters only)"
        },
        lastName: {
          required: "Please enter your last name",
          regex: "Please enter a valid last name (letters only)"
        },
        email: "Please enter a valid email address",
        password: {
          required: "Please provide a password",
          minlength: "Your password must be at least 5 characters long"
        },
        phoneNumber: {
          required: "Please provide a phone number",
          regex: "Please enter a valid phone number (10 digits)"
        },
        address: {
          required: "Please enter your address",
          regex: "Please enter a valid address"
        },
        gender: "Please select your gender",
        hobbies: "Please select at least one hobby"
      }
    });
  
    $.validator.addMethod("regex", function(value, element, regexp) {
      var re = new RegExp(regexp);
      return this.optional(element) || re.test(value);
    }, "Please check your input.");
  
    form.submit(function(event) {
      event.preventDefault();
      if (validateStep(currentStep)) {
        var formData = {
          firstName: $("#firstName").val(),
          lastName: $("#lastName").val(),
          gender: $("input[name='gender']:checked").val(),
          email: $("#email").val(),
          hobbies: $("input[name='hobbies']:checked").map(function() {
            return this.value;
          }).get().join(", "),
          phoneNumber: $("#phoneNumber").val(),
          address: $("#address").val()
        };
  
        var newRow = "<tr><td>" + formData.firstName + "</td><td>" + formData.lastName + "</td><td>" + formData.gender + "</td><td>" + formData.email + "</td><td>" + formData.hobbies + "</td><td>" + formData.phoneNumber + "</td><td>" + formData.address + "</td></tr>";
        dataTable.find("tbody").append(newRow);
        dataTable.removeClass("d-none");
  
        form[0].reset();
        currentStep = 0;
        showStep(currentStep);
        progressBar.css("width", "33%");
        progressBar.text("Step 1 of 3");
      }
    });
  
    showStep(currentStep);
  });
  