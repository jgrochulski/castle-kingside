class PlayersController < ApplicationController

  def index
    players = Player.all
    render json: players
  end

  def create
    player = Player.create!(player_params)
    render json: player
  end

  private 

  def player_params
    params.permit(:id, :user_id, :game_id, :role)
  end

end
