class Api::ConstellationsController < ApplicationController
  wrap_parameters include: Constellation.attribute_names + ['userId', 'taleId']

  before_action :require_logged_in, only: [:create_user, :create_tale, :update, :destroy]
  before_action :require_logged_in_as_author, only: [:update, :destroy]

  def require_logged_in_as_author
    constellation_id = params[:id]
    @constellation = Constellation.find_by(id: constellation_id)
    authorized = false

    if @constellation&.user_id == current_user.id
        authorized = true
    elsif @constellation&.tale_id
        tale = Tale.find_by(@constellation.tale_id)
        if tale.author_id == current_user.id
            authorized = true
        end
    end

    unless authorized
      render json: { errors: ["Can only edit constellations for same user"] }, status: :unauthorized
    end
  end

  def create_user
    @constellation = Constellation.new(constellation_params)
    @constellation.user_id = current_user.id

    if @constellation.save
      render :show
    else
      render json: @constellation.errors.full_messages, status: 422
    end
  end

  def create_tale
    @constellation = Constellation.new(constellation_params)

    tale = Tale.find_by(id: params[:tale_id])
    unless tale
      render json: { errors: ["Tale not found"] }, status: 422
    end

    @constellation.tale_id = params[:tale_id]

    if @constellation.save
      render :show
    else
      render json: @constellation.errors.full_messages, status: 422
    end
  end

  def update
    constellation_id = params[:id]
    @constellation = Constellation.find_by(id: constellation_id)

    if @Constellation&.update(constellation_params)
      render :show
    elsif @constellation
      render json: @constellation.errors.full_messages, status: 422
    else
      render json: { errors: ["Constellation not found"] }, status: 422
    end
  end

  def destroy
    constellation_id = params[:id]
    @constellation = Constellation.find_by(id: constellation_id)

    @constellation.destroy!
    head :no_content
  end

  def index
    @constellations = Constellation.all
    render :index
  end

  private
    def constellation_params
        params.require(:constellation).permit(
        :name
        )
    end

end