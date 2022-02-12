class LobbiesController < ApplicationController
  def index
    players = Lobby.all
    render json: players
  end
end
