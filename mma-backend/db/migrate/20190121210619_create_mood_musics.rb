class CreateMoodMusics < ActiveRecord::Migration[5.2]
  def change
    create_table :mood_musics do |t|
      t.integer :mood_id
      t.integer :music_id
      t.timestamps
    end
  end
end
