class Api::CometsController < ApplicationController
  wrap_parameters include: Comet.attribute_names + ['userId', 'taleId']

  before_action :require_logged_in, only: [:create, :update, :destroy]
  before_action :require_logged_in_as_author, only: [:update, :destroy]

  def require_logged_in_as_author
    comet_id = params[:id]
    @comet = Comet.find_by(id: comet_id)

    if @comet&.user_id != current_user.id
      render json: { errors: ["Must be logged in as comet author"] }, status: :unauthorized
    end
  end

  def index
    tale_id = params[:tale_id]
    @tale = Tale.find_by(id: tale_id)
    @comets = @tale.comets

    render :index
  end
 
  def create
    @comet = Comet.new(comet_params)
    @comet.tale_id = params[:tale_id]
    @comet.user_id = current_user.id

    if @comet.save
      render :show
    else
      render json: @comet.errors.full_messages, status: 422
    end
  end

  def update
    comet_id = params[:id]
    @comet = Comet.find_by(id: comet_id)

    if @comet&.update(comet_params)
      render :show
    elsif @comet
      render json: @comet.errors.full_messages, status: 422
    else
      render json: { errors: ["Comet not found"] }, status: 422
    end
  end

  def destroy
    comet_id = params[:id]
    @comet = Comet.find_by(id: comet_id)

    @comet.destroy!
    head :no_content
  end

  private
    def comet_params
      params.require(:comet).permit(
        :content
      )
    end

end