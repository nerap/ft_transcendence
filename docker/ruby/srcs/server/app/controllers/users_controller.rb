require 'fileutils'

class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action { flash.clear }

  def index
    @users = User.all.order(:username)
  end

  def show
  end

  def edit_profile
    user = User.find(params[:user][:id])
    if current_user == user
      user.username = params[:user][:username]
      if params[:user][:avatar]
        uploaded = params[:user][:avatar]
        ext = File.extname(uploaded)
        avatar_path = "avatars/#{user.id}/"
        avatar = "avatar#{ext}"
        FileUtils.mkdir_p("public/#{avatar_path}")
        File.open("public/#{avatar_path}#{avatar}", "wb") do |file|
          file.write uploaded.read
        end
        user.avatar = "#{avatar_path}#{avatar}"
      end
      if user.save
        respond_to do |format|
          flash[:notice] = "Profile updated successfully !"
          ActionCable.server.broadcast "users_channel", content: "profile"
          ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
          format.json { render json: { user: user }, status: :ok }
        end
      else
        flash[:error] = ""
        user.errors.full_messages.each do |msg|
          flash[:error] = flash[:error] << msg << "<br/>"
        end
        respond_to do |format|
          ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
          format.json { render json: { user: user }, status: :unprocessable_entity }
        end
      end
    end
  end

  def block_user
    if (user = User.find_by_id(params[:chatroom][:user_id]))
      if !is_blocked(current_user, user.id) \
      && current_user != user
        current_user.block_list.push(user.id)
        if current_user.save
          respond_to do |format|
            flash[:deleted] = "You have blocked #{user.username} !"
            ActionCable.server.broadcast "users_channel:#{current_user.id}", content: "ok"
            ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
            format.json { render json: { chatroom: @chatroom }, status: :ok }
          end
        end
      end
    end
  end

  def unblock_user
    if (user = User.find_by_id(params[:chatroom][:user_id]))
      if is_blocked(current_user, user.id)
        current_user.block_list.delete(user.id)
        if current_user.save
          respond_to do |format|
            flash[:notice] = "You have unblocked #{user.username} !"
            ActionCable.server.broadcast "users_channel:#{current_user.id}", content: "ok"
            ActionCable.server.broadcast "flash_admin_channel:#{current_user.id}", type: "flash", flash: flash
            format.json { render json: { chatroom: @chatroom }, status: :ok }
          end
        end
      end
    end
  end

  protected
  # utils
  def is_blocked(user, targetuserid)
    if user.block_list.detect{ |e| e == targetuserid }
      return 1
    end
    return nil
  end
end
