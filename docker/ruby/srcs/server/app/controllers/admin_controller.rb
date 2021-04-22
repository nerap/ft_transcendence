class AdminController < ApplicationController
    def set_admin
        user = User.find_by_username(params[:username])
        if user
            if is_superuser(current_user)
                user.admin = true
                user.save
            end
        end
    end

    def unset_admin
        user = User.find_by_username(params[:username])
        if user
            if is_superuser(current_user) && !is_superuser(user)
                user.admin = false
                user.save
            end
        end
    end

    def ban_user
        user = User.find_by_username(params[:username])
        if user
            if is_sadmin(current_user) && !is_sadmin(user)
                user.banned = true
                user.save
            end
        end
    end

    def unban_user
        user = User.find_by_username(params[:username])
        if user
            if is_sadmin(current_user)
                user.banned = false
                user.save
            end
        end
    end
end
