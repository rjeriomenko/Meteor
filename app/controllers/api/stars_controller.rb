class Api::StarsController < ApplicationController
  wrap_parameters include: Star.attribute_names + ['userId', 'taleId']

  before_action :require_logged_in, only: [:create]

  def index
    tale_id = params[:tale_id]
    @tale = Tale.find_by(id: tale_id)
    @stars = @tale.stars

    render :index
  end
 
  def create
    tale_id = params[:tale_id]
    user_id = current_user.id
    @star = Star.new(user_id: user_id, tale_id: tale_id)

    if @star.save
      render :show
    else
      render json: @star.errors.full_messages, status: 422
    end

  end

  def destroy
    star_id = params[:id]
    @star = Star.find_by(id: star_id)

    @star.destroy!
    head :no_content
  end

end