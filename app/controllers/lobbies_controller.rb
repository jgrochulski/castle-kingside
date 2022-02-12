class LobbiesController < ApplicationController
  
  def index
    user = Lobby.all
    render json: user
  end

  def show
    users = Lobby.where(params[:username])
    render json: users
  end

  def create
    user = Lobby.create!(lobby_params)
    render json: user
  end

  def destroy
    users = Lobby.where(params[:username])
    if users
      users.destroy_all
    else
      render json: { error: "user not found in lobby" }, status: :not_found
    end
  end

  private 

  def lobby_params
    params.permit(:id, :username, :score)
  end

end
