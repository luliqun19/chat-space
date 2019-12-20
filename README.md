# CHAT-SPACE DB設計
## users table
|Column|Type|Options|
|------|----|-------|
|email|string|null: false|
|password|string|null: false|
|username|string|null: false|

### Association
- has_many :messages
- has_many :groups_users
- has_many :groups,  through:  :groups_users

## messages table
|Column|Type|Options|
|------|----|-------|
|body|text||
|image|string||
|group_id|integer|null: false, foreign_key: true|
|user_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group


## groups table
|Column|Type|Options|
|------|----|-------|
|name|text|null: false|

### Association
- has_many :messages
- has_many :groups_users
- has_many :users,  through:  :groups_users

## groups_users table
|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user