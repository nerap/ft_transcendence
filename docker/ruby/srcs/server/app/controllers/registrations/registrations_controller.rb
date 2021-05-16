# frozen_string_literal: true

class Registrations::RegistrationsController < Devise::RegistrationsController
  # before_action :configure_sign_up_params, only: [:create]
  # before_action :configure_account_update_params, only: [:update]

  # GET /resource/sign_up
  # def new
  #   super
  # end

  # POST /resource
  # def create
  #   super
  # end

  # GET /resource/edit
  # def edit
  #   super
  # end

  # PUT /resource
  # def update
  #   super
  # end

  # DELETE /resource
  def destroy
    # ADD SUPER USER CONDITION TO DESTROY USER
    user = User.find(param[:id])
    @chatrooms = Chatroom.all
    @chatrooms.each do |chatroom|
      chatroom.members.delete(user.id)
      chatroom.banned.delete(user.id)
      chatroom.muted.delete(user.id)
      chatroom.admin.delete(user.id)
      chatroom.save
    end
    @prs = PrivateRoom.all
    @prs.each do |pr|
      if pr.users.detect{ |e| e == user.id }
        pr.destroy
      end
    end
    @users = User.all
    @users.each do |usr|
      usr.block_list.delete(user.id)
      usr.save
    end
    FileUtils.rm_rf("public/avatars/#{user.id}")
    ActionCable.server.broadcast "room_channel", type: "chatrooms", action: "update"
    ActionCable.server.broadcast "private_room_channel", content: "destroy"
    user.destroy
    ActionCable.server.broadcast "users_channel", content: "profile"
    # super
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  # def cancel
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_up_params
  #   devise_parameter_sanitizer.permit(:sign_up, keys: [:attribute])
  # end

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_account_update_params
  #   devise_parameter_sanitizer.permit(:account_update, keys: [:attribute])
  # end

  # The path used after sign up.
  # def after_sign_up_path_for(resource)
  #   super(resource)
  # end

  # The path used after sign up for inactive accounts.
  # def after_inactive_sign_up_path_for(resource)
  #   super(resource)
  # end
end
