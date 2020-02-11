/*

  Author: creativeCary
  Template: CloudSoft
  Version: 1.0
  URL: http://themeforest.net/user/creativecary


*/
	

	/* ==========================
	   PRE-LOADER
	=============================*/
	
	$(window).load(function() {
	    "use strict";
		// will fade loading animation
		$("#object").delay(0).fadeOut(0);
		// will fade loading background					
		$("#loading").delay(0).fadeOut(0);
	})
	
	/* ==========================
	   JOIN-US FORM
	=============================*/


		$('#submit_btn').on('click', function() { 
	       "use strict";
			var proceed = true;
			//simple validation at client's end
			//loop through each field and we simply change border color to red for invalid fields		
			$("#contact-us-form  input[required=true]").each(function(){
				$(this).css('border-color',''); 
				if(!$.trim($(this).val())){ //if this field is empty 
					$(this).css('border','solid 1px red'); //change border color to red   
					proceed = false; //set do not proceed flag
				}
				//check invalid email
				var email_reg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/; 
				if($(this).attr("type")=="email" && !email_reg.test($.trim($(this).val()))){
					$(this).css('border','solid 1px red'); //change border color to red   
					proceed = false; //set do not proceed flag				
				}	
			});
			if(proceed) //everything looks good! proceed...
			{
				//get input field values data to be sent to server
				var post_data = {
					'name'	        : $('input[name=name]').val(),
					'user_email'	: $('input[name=email]').val()
				};
				//Ajax post data to server
				$.post('contact_us.php', post_data, function(response){ 
					if(response.type == 'error'){ //load json data from server and output message     
						var output = '<div class="error">'+response.text+'</div>';
					}else{
						output = '<div class="success">'+response.text+'</div>';
						//reset values in all input fields
						$("#contact-us-form  input[required=true]").val(''); 
					}
					$("#notifications").hide().html(output).slideDown();
				}, 'json');
			}
		});
		
		//reset previously set border colors and hide all message on .keyup()
		$("#contact-us-form   input[required=true]").keyup(function() { 
			$(this).css('border-color',''); 
			$("#notifications").slideUp();
		});