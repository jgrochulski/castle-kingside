class UsersController < ApplicationController
  wrap_parameters format: []
  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity

  def index
    users = User.all
    render json: users
  end

  def create
    user = User.create!(user_params)
    render json: user
  end

  def show
    current_user = User.find_by(id: session[:user_id])
    if current_user
      render json: current_user, status: :ok
    else
      render json: "No current session stored", status: :unauthorized
    end
  end

  private

  def render_unprocessable_entity(invalid)
    render json: { error: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def user_params
    params.permit(:username, :password)
  end
end
