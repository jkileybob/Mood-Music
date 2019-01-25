class MusicSerializer < ActiveModel::Serializer
  attributes :id, :title, :artist, :artist_img, :media_url, :vibe

  has_many :moods

end
