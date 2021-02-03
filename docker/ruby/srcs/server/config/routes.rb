Rails.application.routes.draw do
  resources :chats
  get 'users/index'
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root "home#index"
  get "home", to: "home#index"
  match '/users',   to: 'users#index',   via: 'get'
  get "chats/index"
  # root 'chats#index'
end
