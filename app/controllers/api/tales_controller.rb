require 'date'

class Api::TalesController < ApplicationController
  wrap_parameters include: Tale.attribute_names + ['authorId']

  before_action :require_logged_in, only: [:update, :create, :destroy, :index_by_user, :index_by_follower]
  before_action :require_logged_in_as_author, only: [:update, :destroy]

  def require_logged_in_as_author
    tale_id = params[:id]
    @tale = Tale.find_by(id: tale_id)

    if @tale&.author_id != current_user.id
      render json: { errors: ["Must be logged in as author"] }, status: :unauthorized
    end
  end

  def index
    @tales = Tale.all
    render :index
  end

  def index_by_user_stars
    user_id = params[:id]

    if user_id != current_user.id
      render json: { errors: ["Must be logged in to see starred tales"] }, status: :unauthorized
    else
      @tales = current_user.starred_tales
      render :index
    end
  end

  def index_by_follower
    @tales = current_user.followed_users_tales
    if @tales
      render :index
    else
      head :no_content
    end
  end

  def index_by_constellation
    constellation_name = params[:name]
    constellations = Constellation.where("name='#{constellation_name}'")
    @tales = []
    
    constellations.each do |constellation|
      if constellation.tale_id
        tale = Tale.find_by_id(constellation.tale_id)
        @tales.push(tale)
      end
    end

    render :index
  end
 
  def create
    @tale = Tale.new(tale_params)
    @tale.author_id = current_user.id

    if @tale.save
      render :show
    else
      render json: @tale.errors.full_messages, status: 422
    end

  end

  def show
    tale_id = params[:id]
    @tale = Tale.find_by(id: tale_id)

    if @tale
      render :show
    else
      render json: { tale: nil }
    end
  end

  def update
    tale_id = params[:id]
    @tale = Tale.find_by(id: tale_id)
    
    if params[:update_publish_time]
        @tale.publish_time = DateTime.now
    end

    if @tale&.update(tale_params)
      render :show
    elsif @tale
      render json: @tale.errors.full_messages, status: 422
    else
      render json: { errors: ["Tale not found"] }, status: 422
    end
  end

  def destroy
    tale_id = params[:id]
    @tale = Tale.find_by(id: tale_id)

    @tale.destroy!
    head :no_content
  end

  private
    def tale_params
      params.require(:tale).permit(
        :title, :content
      )
    end
end