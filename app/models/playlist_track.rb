# == Schema Information
#
# Table name: playlist_tracks
#
#  id          :bigint           not null, primary key
#  playlist_id :integer          not null
#  track_id    :integer          not null
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class PlaylistTrack < ApplicationRecord
  validates :playlist_id, :track_id, presence: true
  validates :track_id, uniqueness: { scope: :playlist_id }

  belongs_to :track
  belongs_to :playlist
end
