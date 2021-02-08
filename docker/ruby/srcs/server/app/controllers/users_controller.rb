class UsersController < ApplicationController
  # before_action :authenticate_user!, only: [:index] # demande de log in pour pouvoir consulter la page

  def index
    @users = User.all
  end
end
