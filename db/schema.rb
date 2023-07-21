# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_07_21_132942) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comets", force: :cascade do |t|
    t.string "content", null: false
    t.integer "user_id", null: false
    t.integer "tale_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tale_id", "user_id"], name: "index_comets_on_tale_id_and_user_id"
    t.index ["user_id", "tale_id"], name: "index_comets_on_user_id_and_tale_id"
  end

  create_table "constellations", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "tale_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name", null: false
    t.index ["name", "tale_id"], name: "index_constellations_on_name_and_tale_id", unique: true
    t.index ["name", "user_id"], name: "index_constellations_on_name_and_user_id", unique: true
  end

  create_table "follows", force: :cascade do |t|
    t.bigint "follower_id", null: false
    t.bigint "followee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["followee_id", "follower_id"], name: "index_follows_on_followee_id_and_follower_id", unique: true
    t.index ["follower_id", "followee_id"], name: "index_follows_on_follower_id_and_followee_id", unique: true
  end

  create_table "stars", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "tale_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["tale_id", "user_id"], name: "index_stars_on_tale_id_and_user_id"
    t.index ["user_id", "tale_id"], name: "index_stars_on_user_id_and_tale_id"
  end

  create_table "tales", force: :cascade do |t|
    t.string "title", null: false
    t.string "content", null: false
    t.bigint "author_id", null: false
    t.string "publish_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["author_id"], name: "index_tales_on_author_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", null: false
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "full_name", null: false
    t.string "session_token", null: false
    t.string "site_settings"
    t.string "profile_bio"
    t.string "tagline"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
