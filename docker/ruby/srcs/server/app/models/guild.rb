class Guild < ApplicationRecord
    validates :name, presence: true, uniqueness: { case_sensitive: false }, length: { in: 3..12 }
    validates :anagram, presence: true, uniqueness: { case_sensitive: false }, length: { in: 5..5 }
end
