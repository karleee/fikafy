# == Schema Information
#
# Table name: users
#
#  id              :bigint           not null, primary key
#  username        :string           not null
#  email           :string           not null
#  gender          :string           not null
#  birthday        :date             not null
#  password_digest :string           not null
#  session_token   :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  attr_reader :password 

  validates :email, :username, :gender, :birthday, :password_digest, :session_token, presence: true
  validates :username, :email, :session_token, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true
  
  after_initialize :ensure_session_token

  has_many :playlists,
    foreign_key: :user_id,
    class_name: :Playlist

  def self.find_by_credentials(loginCredentials, password)
    user = loginCredentials.include?('@') ? User.find_by(email: loginCredentials)
      : User.find_by(username: loginCredentials)
    user && user.is_password?(password) ? user : nil
  end

  def self.generate_session_token!
    SecureRandom.urlsafe_base64
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = User.generate_session_token!
    self.save!
    self.session_token
  end

  private
  
  def ensure_session_token
    self.session_token ||= User.generate_session_token!
  end
end
