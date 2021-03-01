class UsersController < ApplicationController
  # before_action :authenticate_user!, only: [:index] # demande de log in pour pouvoir consulter la page
  before_action :load_entities, only: [ :show ]

  def index
    @users = User.all
  end

  def show
  end

  protected
  def load_entities
    @users = User.all
    @user = User.find(params[:id]) if params[:id]
  end
end
