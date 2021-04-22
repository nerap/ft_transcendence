Rails.application.routes.draw do
  resources :chatrooms
  root "home#index"
  get "home", to: "home#index"

  scope "api" do
    resources :friends
    resources :guilds
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

    put '/users/edit_profile'
    put '/users/block_user'
    put '/users/unblock_user'

    post '/chats', to: "chats#create"
  
    resources :private_rooms
    post '/private_messages', to: "private_messages#create"
    post '/guilds/leave_guild', to: "guilds#leave_guild"
    post '/guilds/join_guild', to: "guilds#join_guild"
    post '/guilds/promote', to: "guilds#promote"
    post '/guilds/demote', to: "guilds#demote"
    post '/guilds/kick', to: "guilds#kick"
  end

  get 'my_friends', to: "friends#index"
  devise_for :users, controllers: { registrations: 'registrations/registrations' }
  get 'users', to: "users#index"
  get 'users/:id', to: "users#show", as: 'user'

  match "*path", to: "application#error_404", :via => [:get, :post, :delete, :put, :patch]
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
