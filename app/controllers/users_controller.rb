require "controller_helper"
class UsersController < ApplicationController
	include ControllerHelper # include methods defined in controller helper

	before_action :user_params, :only => [:create, :update, :destroy]
	before_action :set_user, :only => [:show, :edit, :update, :destroy]

	def all
		# get all users
		render_json(User.all)

		# users = User.all

		# render :index
	end

	def show
		render_json(@user)
	end

	def search
		@users = User.where('name LIKE "%'+params[:q]+'%"')
		render_json(@users)
	end

	def update
		if @user.update(user_params)
			render :json => { result: "OK", message: "#{@user.name} was updated successfully!" } and return
		else
			render :json => { result: "Error", message: "User could not be updated, try again." } and return
		end
	end

	private

	# get user params from post
	def user_params
		params.require(:user).permit!
	end

	# get user from url
	def set_user
		@user = User.find(params[:user_id])
	end
end
