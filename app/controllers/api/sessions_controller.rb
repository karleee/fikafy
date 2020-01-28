class Api::SessionsController < ApplicationController
  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:email],
      params[:user][:password]
    )
     
    if @user 
      log_in(@user)
      render 'api/users/show'
    else 
      render json: ['Your request failed. Please try again.'], status: 401
    end
  end

  def destroy
    @user = current_user
    if @user
      log_out
      render '/api/users/show'
    else
      render json: {}
    end
  end
end
