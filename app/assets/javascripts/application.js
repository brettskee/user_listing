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
//= require turbolinks
//= require_tree .

$(function() { // Don't load until page is loaded

	// Let's start with the page that renders all users from the db
	// $('.coin-user').on('click', function(e) {})

	$('#users-con').click(function(e) {
		var $clicked = $(e.target);
		if($clicked.hasClass("coin-user")) {

				$.ajax({
					url: "/show/"+$clicked.data('user-id')+".json",
					dataType: "json",
				}).done(function(data) {
					$('#user-choice').html(JSON.stringify(data));
				});
			
		}
	});

	var renderUser = function renderUser(user) {
		var $uc = $('#users-con');

		// Build the user object
		var $user = $('<li>').append($('<a class="coin-user" data-user-id="'+user.id+'" href="#">').html(user.name));

		// Now append the user to the user container div
		$uc.append($user);
	};

	$.get("/all.json")
		.done(function(users, textStatus, jqXHR) {
			users.forEach(function(user) {
				renderUser(user);
			});
		});




})
