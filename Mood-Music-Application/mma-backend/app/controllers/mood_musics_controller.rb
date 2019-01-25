class MoodMusicsController < ApplicationController

  #GET ALL
    def index
      render json: MoodMusics.all
    end
    #GET
      def show
        render json: MoodMusics.find(params[:id])
      end

    #POST
      def create
        render json: MoodMusics.create(mood_music_params)
      end

private

def mood_music_params
  params.require(:mood_music).permit(:mood_id, :music_id)
end

end
