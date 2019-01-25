class MoodMusic < ApplicationRecord
  belongs_to :mood
  belongs_to :music
end
