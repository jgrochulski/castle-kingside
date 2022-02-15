class LobbiesController < ApplicationController
  
  def index
    user = Lobby.all
    render json: user
  end

  # def show
  #   users = Lobby.where(username: 'jantje')
  #   # Book.where("LENGTH(title) > ?", params[:min_length])
  #   if users
  #     render json: users
  #   else
  #     render json: 'oops'
  #   end
  # end

  def create
    user = Lobby.create!(lobby_params)
    render json: user
  end

  def delete
    users = Lobby.where(username: params[:username])
    if users
      users.destroy_all
    else
      render json: { error: "user not found in lobby" }, status: :not_found
    end
  end

  private 

  def lobby_params
    params.permit(:id, :username, :score, :user_id)
  end

end
