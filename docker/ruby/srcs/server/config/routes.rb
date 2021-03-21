Rails.application.routes.draw do
  root "home#index"
  get "home", to: "home#index"

  scope "api" do
    resources :chatrooms do
      member do
        post 'login'
        post 'set_admin'
        post 'unset_admin'
        post 'ban_user'
        post 'unban_user'
        post 'mute_user'
        post 'unmute_user'
        get 'psswd', to: "chatrooms#show"
        put 'new_owner'
        post 'join'
        post 'unjoin'
      end
    end

    resources :chats
  end

  

  devise_for :users
  resources :users
  get "users", to: "users#index"

  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
