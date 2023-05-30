# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

ApplicationRecord.transaction do
    puts "Destroying tables..."
    User.destroy_all

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')

    puts "Creating Users..."
    User.create!(
        email: "demo@man.com",
        password: "brimstone",
        full_name: "Tavish Finnegan DeGroot"
    )

    20.times do
        User.create!(
            email: Faker::Internet.unique.email,
            password: "password",
            full_name: Faker::Name.name
        )
    end

    puts "Done Seeding"
end