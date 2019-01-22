class MusicsController < ApplicationController

  def index
    render json: Music.all
  end

  def show
    render json: Music.find(params[:id])
  end
  
end
