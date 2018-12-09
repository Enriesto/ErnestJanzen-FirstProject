/*
 * Removes white space from a string value.
 *
 * return  A string with leading and trailing white-space removed.
 */
function trim(str) 
{
	// Uses a regex to remove spaces from a string.
	return str.replace(/^\s+|\s+$/g,"");
}

/*
 * Determines if a text field element has input
 *
 * param   fieldElement A text field input element object
 * return  True if the field contains input; False if nothing entered
 */
 function formFieldHasInput(fieldElement)
 {
 	if(!trim(fieldElement.value))
 	{
 		return false;
 	}

 	return true;
 }

/*
 * Handles the submit event of the survey form
 *
 * param e  A reference to the event object
 * return   True if no validation errors; False if the form has
 *          validation errors
 */
function validate(e)
{
	// See if the form has any errors
	if(formHasErrors()){
		// Returning false prevents the form from submitting
		return false;
	}
	else
	{
		alert(`Thank you! Redirecting you to our home page.`);
		window.location.replace("index.html");
	}

	return true;
}

/*
 * Handles the reset event for the form.
 *
 * param e  A reference to the event object
 * return   True allows the reset to happen; False prevents
 *          the browser from resetting the form.
 */
function resetForm(e)
{
	// Confirm that the user wants to reset the form.
	if ( confirm('Reset the fields?') )
	{
		// Ensure all error fields are hidden
		hideAllErrors();
		
		//Reset the text to blank
		document.getElementById("fullname").value = "";
		document.getElementById("address").value = "";
		document.getElementById("city").value = "";
		document.getElementById("province").value = "";
		document.getElementById("email").value = "";
		document.getElementById("phone").value = "";
		document.getElementById("feedback").value = "";

		// Set focus to the first text field on the page
		document.getElementById("fullname").focus();
		
		// When using onReset="resetForm()" in markup, returning true will allow
		// the form to reset
		return true;
	}
	
	// When using onReset="resetForm()" in markup, returning false would prevent
	// the form from resetting
	return false;	
}

function formHasErrors()
{
	// Assume that the form doesn't have any errors
	var errorFlag = false;

	// An array of text field to see if the user
	// has entered a value
	var requiredTextFields = ["fullname", "address",
	 "city", "province", "email", "phone", "feedback"];

	// Loop through text field ids
	for (var a = 0; a < requiredTextFields.length; a++)
	{
		// Variable for the current object using id of the current element
		var textField = document.getElementById(requiredTextFields[a]);

		if(!formFieldHasInput(textField))
		{
			// Use the appropriate error object from the DOM
			document.getElementById(requiredTextFields[a] + "_error").style.display = "block";

			if(!errorFlag)
			{
				//Set focus to the text field that caused the error
				textField.focus();

				//Select the text in the text field
				//textField.select();
			}

			//Raise the error flag
			errorFlag = true;
		}
		else
		{
			// Ensure the error isn't visible
			document.getElementById(requiredTextFields[a] + "_error").style.display = "none";
		}
	}

	//Create a regular expression for an email
	var regexEmail = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

	var emailFieldValue = document.getElementById("email").value;

	if(!regexEmail.test(emailFieldValue))
	{
		document.getElementById("emailformat_error").style.display = "block";

		//See if this is the first error
		//Set focus to the text field if this is so
		if(!errorFlag)
		{
			//Set focus to the student number text field
			textField.focus();

			//Select the text in the student number text field
			textField.select();
		}

		//Raise the error flag indicating a validation error
		errorFlag = true;
	}
	else
	{
		// Ensure the error isn't visible
		document.getElementById("emailformat_error").style.display = "none";
	}

	//Create a regular expression for a ten digit string
	var phoneRegex = new RegExp(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/);

	//A valid phone number should have no more or less than 10 digits
	//Get the value of the student number text field
	var phoneFieldValue = document.getElementById("phone").value;

	//Determine if the value is not a number or the length is more than 7 characters
	if(!phoneRegex.test(phoneFieldValue))
	{
		//Get the error object from the DOM for the appropriate
		//text field and make it visible
		document.getElementById("phoneformat_error").style.display = "block";

		//Determine if this is the first error
		//If so, set focus to the text field
		if(!errorFlag)
		{
			//Set the focus tot he student number text field
			textField.focus();

			//Select the text in the student number text field
			textField.select();
		}

		//Raise the error flag indicating a validation error
		errorFlag = true;
	}
	else
	{
		document.getElementById("phone_error").style.display = "none";
		document.getElementById("phoneformat_error").style.display = "none";
	}

	//Return the errorFlag value once everything has been checked
	return errorFlag;
}

/*
 * Hides all of the error elements.
 */
function hideAllErrors()
{
	//Get an array of the error field ids
	var errorFields = document.getElementsByClassName("error");

	//Loop through each error field id
	for(var b = 0; b < errorFields.length; b++)
	{
		//Hide the error field
		errorFields[b].style.display = "none";
	}
}

/*
 * Handles the load event of the document.
 */
function load()
{
	let submit = document.getElementById("submit");
	submit.addEventListener("click", validate);

	let clear = document.getElementById("clear");
	clear.addEventListener("click", resetForm);

	//Hide the errors when loading the page
	hideAllErrors();
}

// Add document load event listener
document.addEventListener("DOMContentLoaded", load);