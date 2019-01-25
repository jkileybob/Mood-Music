class MoodSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :img_url

  has_many :musics
  
end
