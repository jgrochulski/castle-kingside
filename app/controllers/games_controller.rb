class GamesController < ApplicationController


  def index
    games = Game.all
    render json: games, include: ['players.role', 'players.user']
  end

  def show
    game = Game.find(params[:id])
    render json: game, include: ['players.role', 'players.user']
  end

  def create
    game = Game.create!(game_params)
    render json: game
  end

  def update
    game = Game.find(params[:id])
    if game
      game.update(game_params)
      render json: game
    else
      render json: { error: "game not found" }, status: :not_found
    end
  end

  def destroy
    game = Game.find(params[:id])
    if game
      game.destroy
    else
      render json: { error: "game not found" }, status: :not_found
    end
  end

  private 

  def game_params
    params.permit(:id, :turn, :history, :counter, :state, :status, :player1, :player2)
  end

end
