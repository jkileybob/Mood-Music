class MoodsController < ApplicationController

#GET ALL
  def index
    render json: Mood.all
  end

#GET
  def show
    render json: Mood.find(params[:id])
  end

#POST
  def create
    render json: Mood.create(mood_params)
  end

#PATCH
  def update
    Mood.find(params[:id]).update(mood_params)
    render json: Mood.find(params[:id])
  end

#DELETE
def destroy
  render json: Mood.find(params[:id]).destroy
end

private

def mood_params
  params.require(:mood).permit(:name, :description, :img_url)
end

end
