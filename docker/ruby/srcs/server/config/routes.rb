Rails.application.routes.draw do
  resources :friends
  resources :chatrooms
  root "home#index"
  get "home", to: "home#index"

  scope "api" do
    resources :chatrooms do
      member do
        post 'login'
        put 'set_admin'
        put 'unset_admin'
        put 'ban_user'
        put 'unban_user'
        put 'mute_user'
        put 'unmute_user'
        put 'leave'
        put 'join'
        put 'unjoin'
      end
    end
    put '/users/block_user'
    put '/users/unblock_user'

    post '/chats', to: "chats#create"
  
    resources :private_rooms
    post '/private_messages', to: "private_messages#create"
  end

  devise_for :users

  get 'users', to: "users#index"
  get 'users/:id', to: "users#show", as: 'user'

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
