class Api::FollowsController < ApplicationController
  wrap_parameters include: Follow.attribute_names + ['userId']

  before_action :require_logged_in, only: [:create, :destroy]
  before_action :require_logged_in_as_follower, only: [:destroy]

  def require_logged_in_as_follower
    follow_id = params[:id]
    @follow = Follow.find_by(id: follow_id)

    if @follow&.follower_id != current_user.id
      render json: { errors: ["Must be logged in as follower"] }, status: :unauthorized
    end
  end

  def create
    followee_id = params[:user_id]
    follower_id = current_user.id
    @follow = Follow.new(followee_id: followee_id, follower_id: follower_id)

    if @follow.save
      render :show
    else
      render json: @follow.errors.full_messages, status: 422
    end

  end

   def destroy
    follow_id = params[:id]
    @follow = Follow.find_by(id: follow_id)

    @follow.destroy!
    head :no_content
  end

end