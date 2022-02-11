puts "Seeding users..."

u1 = User.create(name: 'janek')
u2 = User.create(name: 'franci')

puts "Seeding games..."

g = Game.create(title: "test game")

puts "Seeding players..."

p1 = Player.create(user: u1, role: 'player1', game: g)
p2 = Player.create(user: u2, role: 'player2', game: g)


puts "✅ Done seeding!"