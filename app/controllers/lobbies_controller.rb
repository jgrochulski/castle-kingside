class LobbiesController < ApplicationController
  
  def index
    user = Lobby.all
    render json: user
  end

  def show
    users = Lobby.find_by(params[:username])
    # Book.where("LENGTH(title) > ?", params[:min_length])
    render json: users
  end

  def create
    user = Lobby.create!(lobby_params)
    render json: user
  end

  def destroy
    users = Lobby.find_by(params[:username])
    if users
      users.destroy
    else
      render json: { error: "user not found in lobby" }, status: :not_found
    end
  end

  private 

  def lobby_params
    params.permit(:id, :username, :score)
  end

end
