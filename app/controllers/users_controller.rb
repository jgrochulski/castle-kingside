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
    user = User.find(params[:id])
    if user 
      render json: user, include: ['games.players.user'], status: :ok
    else
      render json: "No current session stored", status: :unauthorized
    end
  end

  def me
    current_user = User.find_by(id: session[:user_id])
    if current_user 
      render json: current_user, include: ['games.players.user'], status: :ok
    else
      render json: "No current session stored", status: :unauthorized
    end
  end

  def update
    user = User.find(params[:id])
    if user
      # user.update(elo_rating: user_params[:elo_rating])
      user.update_attribute(:elo_rating, user_params[:elo_rating])
      render json: user
    else
      render json: { error: "user not found" }, status: :not_found
    end
  end

  private

  def render_unprocessable_entity(invalid)
    render json: { error: invalid.record.errors.full_messages}, status: :unprocessable_entity
  end

  def user_params
    params.permit(:id, :username, :password, :elo_rating)
    # remove id from permits? 
  end
  
end
