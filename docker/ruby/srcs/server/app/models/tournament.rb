class Tournament < ApplicationRecord
    has_many :user, foreign_key: "tournament"
    has_many :competing, -> { where eliminated: false }, class_name: "User", foreign_key: "tournament"
end
