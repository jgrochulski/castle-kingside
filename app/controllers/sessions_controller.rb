class SessionsController < ApplicationController

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      # debugger
      render json: user, status: :ok
    else
      render json: "Invalid Credentials", status: :unauthorized
    end
  end

  def delete
    session.delete :user_id
    head :no_content
  end

end
