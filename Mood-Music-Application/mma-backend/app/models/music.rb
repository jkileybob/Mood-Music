class Music < ApplicationRecord
  has_many :moodMusics
  has_many :moods, through: :moodMusics
end
