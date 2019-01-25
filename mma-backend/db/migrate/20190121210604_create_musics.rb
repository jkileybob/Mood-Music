class CreateMusics < ActiveRecord::Migration[5.2]
  def change
    create_table :musics do |t|
      t.string :title
      t.string :artist
      t.string :artist_img
      t.string :media_url
      t.integer :vibe
      t.timestamps
    end
  end
end
