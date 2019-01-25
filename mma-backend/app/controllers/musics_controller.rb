class MusicsController < ApplicationController

# GET
  def index
    render json: Music.all
  end

  def show
    render json: Music.find(params[:id])
  end

  #POST
    def create
      render json: Music.create(music_params)
    end

  #PATCH
    def update
      Music.find(params[:id]).update(music_params)
      render json: Music.find(params[:id])
    end

  #DELETE
  def destroy
    render json: Music.find(params[:id]).destroy
  end

  private

  def music_params
    params.require(:music).permit(:title, :artist, :artist_img, :media_url, :vibe)
  end
end
