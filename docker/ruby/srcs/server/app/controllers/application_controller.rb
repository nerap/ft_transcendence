class ApplicationController < ActionController::Base
    before_action :configure_permitted_parameters, if: :devise_controller?
    rescue_from ActionController::UnknownFormat, :with => :template_not_found

    def error_404
        redirect_to "/404"
    end

    def template_not_found
        redirect_to "/404"
    end

    protected
    def configure_permitted_parameters
        devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :avatar])
    end
end
