class Api::UsersController < ApplicationController
  wrap_parameters include: User.attribute_names + ['password', 'fullName', 'profileBio', 'siteSettings']

  before_action :require_logged_out, only: [:create]
  before_action :require_logged_in, only: [:update]

  def index
    @users = User.all
    render :index
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render :show
    else
      render json: @user.errors.full_messages, status: 422
    end

  end

  def show
    user_id = params[:id]
    @user = User.find_by(id: user_id)

    if @user
      render :show
    else
      render json: { user: nil }
    end
  end

  def update
    user_id = params[:id]
    @user = User.find_by(id: user_id)

    if @user&.update(user_params)
      render :show
    elsif @user
      render json: @user.error.full_messages, status: 422
    else
      render json: { errors: ["User not found"] }, status: 422
    end
  end

  def destroy
    user_id = params[:id]
    @user = User.find_by(id: user_id)

    @user.destroy!
    head :no_content
  end

  private
    def user_params
      params.require(:user).permit(
        :email, :password, :full_name, :username, :tagline, :site_settings, :profile_bio
      )
    end
end