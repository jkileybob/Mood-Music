class Mood < ApplicationRecord
  has_many :moodMusics
  has_many :musics, through: :moodMusics
end
