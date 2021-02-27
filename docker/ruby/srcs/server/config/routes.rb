Rails.application.routes.draw do
  root "home#index"
  get "home", to: "home#index"

  resources :chatrooms do
    member do
      post 'login'
      put 'set_admin'
      delete 'unset_admin'
      put 'ban_user'
      delete 'unban_user'
    end
  end

  resources :chats

  devise_for :users
  resources :users
  get "users", to: "users#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
