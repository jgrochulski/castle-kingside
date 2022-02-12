Rails.application.routes.draw do
  resources :lobbies
  resources :players
  resources :games
  resources :users, only: [:index, :show, :create]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#delete"
  get '/me', to: "users#show"


  # Defines the root path route ("/")
  # root "articles#index"

end
