// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
// require turbolinks
//= require_tree .

$(function() { // Don't load until page is loaded

	// event handler for search input
	$('#user-search').focus(function(e) {
		// So when we focus on the search field...
		var search_field = e.target;

		$(search_field).keypress(function(key_event) {
			if($(search_field).val === "") {
				// no search so just do a regular request for all
				findAll();
			} else {
				$.get("/search.json?q="+$(search_field).val())
					.done(function(data){
						// we should have only search results that match now
						refreshUsers(data);
					});

			}
			

		})

	}).blur(function(e) {
		findAll();
	})

	// Let's start with the page that renders all users from the db
	// $('.coin-user').on('click', function(e) {})

	$('#users-con').click(function(e) {
		var $clicked = $(e.target);
		if($clicked.hasClass("coin-user")) {

				$.ajax({
					url: "/show/"+$clicked.data('user-id')+".json",
					dataType: "json",
				}).done(function(data) {
					var userdata = JSON.stringify(data);
					$('#user-choice .page-header').html(data.name);
					$('#user-choice .sub-header').html(data.phone);
					var $ud = $('#user-choice #user-details');
					$ud.html(''); // Clear out existing HTML to make room for new data.

					// Build the address line
					var address = data.line1+'<br>'+data.line2+'<br>'+data.city+', '+data.state+' '+data.zip;

					var $row = $('<tr>');
					$row.appendTo($ud);
					$('<td>').text('Address').appendTo($row);
					$('<td>').html(address).appendTo($row);

				});
			
		}
	});

	var refreshUsers = function refreshUsers(users) {
		var $uc = $('#users-con');
		$uc.html('');

		users.forEach(function(user) {
			renderUser(user);
		});
	}

	var renderUser = function renderUser(user) {
		var $uc = $('#users-con');

		// Build the user object
		$('<li>').append($('<a class="coin-user" data-user-id="'+user.id+'" href="#">')
			// and append to the container
				.html(user.name)).appendTo($uc);

	};


	var findAll = function findAll() {
		$.get("/all.json")
		.done(function(users, textStatus, jqXHR) {
			refreshUsers(users);
		});

	}

	findAll();

	






});
