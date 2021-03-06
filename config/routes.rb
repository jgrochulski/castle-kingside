Rails.application.routes.draw do
  resources :lobbies, only: [:index, :create]
  resources :players
  resources :games
  resources :users, only: [:index, :show, :create, :update]

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#delete"
  get '/me', to: "users#me"
  delete "/lobbies/:username", to: "lobbies#delete"


  # Defines the root path route ("/")
  # root "articles#index"

end
