Rails.application.routes.draw do
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

    resources :chats
  end

  devise_for :users
  resources :users
  get "users", to: "users#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
