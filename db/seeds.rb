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
    #######NEED TO DESTROY ALL TABLES?: users, tales, stars, comets

    puts "Resetting primary keys..."
    ApplicationRecord.connection.reset_pk_sequence!('users')
    #######NEED TO RESET ALL TABLES?: users, tales, stars, comets

    puts "Creating Users..."
    User.create!(
        email: "demo@man.com",
        password: "brimstone",
        full_name: "Tavish Finnegan DeGroot"
    )

    40.times do
        User.create!(
            email: Faker::Internet.unique.email,
            password: "password",
            full_name: Faker::Name.name
        )
    end

    puts "Creating Tales..."
    Tale.create!(
        title: "Roaring Tales of DeGroot Keep: Conquer the Battlefield and Unleash the Claidheamh Mòr Fury!",
        content: %(<div class=\"input-div publish-title-text focused\">Roaring Tales of DeGroot Keep: Conquer the Battlefield and Unleash the Claidheamh Mòr Fury!</div><div class=\"input-div\">Listen up, brave souls! I've got a tale to spin about the marvels of DeGroot Keep that'll have ye itching for adventure. Pay heed, for this be a place ye must visit if ye crave glory and a taste of me splendid collection of Claidheamh Mòr swords!</div><div class=\"input-div\">Imagine standin' tall upon the ramparts of DeGroot Keep, a fortress that commands respect, nestled amidst a vibrant forest. The air be thick with the scent of nature's splendor, birdsong fillin' yer ears, and the trees swayin' to the rhythm of the wind. This be a land untouched by time, a realm where honor and valor hold sway.</div><div class=\"input-div\">DeGroot Keep be a haven for warriors like meself, where epic battles unfurl. Ye'll witness swordsmen clashin', arrows zippin' through the air, and explosions that'll rattle yer very bones! The battlefield be vast and treacherous, with hidden nooks and crannies where ye can spring surprises upon yer foes. But fear not, for the mighty keep offers safety, with its unassailable walls and secret passages that only a true adventurer can navigate.</div><div class=\"input-div\">Now, let's talk about me prized possession – me Claidheamh Mòr collection! These beauties be the finest swords ye ever laid eyes upon. Each Claidheamh Mòr be a masterpiece, forged with craftsmanship ye won't find elsewhere. The blades be sharper than a serpent's fang and heavy enough to send yer enemies flyin'! Oh, the thrill of swingin' me Claidheamh Mòr, cleavin' through me foes with the fury of a storm!</div><div class=\"input-div\">Ye may be wonderin' why ye should visit DeGroot Keep and witness me Claidheamh Mòr collection up close. Well, me lads and lasses, let me tell ye, the excitement of battle and the bonds ye'll forge here be like nothin' else. Ye'll make friends, create memories, and earn the respect of yer peers as ye charge into the fray. Whether ye be a seasoned warrior or a greenhorn yearnin' to prove yerself, DeGroot Keep be a playground for the bold and fearless.</div><div class=\"input-div\">So gather yer courage, me hearties, and chart a course to DeGroot Keep. Prepare yerselves for a grand adventure, where ye'll test yer mettle against the mightiest of foes. And fear not, for me Claidheamh Mòr collection awaits, ready to accompany ye on yer quest for glory! Join me in the revelry and magnificence of DeGroot Keep, and together, we shall conquer all who dare stand in our path!</div><div class=\"input-div\">Until then, me friends, remember this: there be no glory without a fight, no victory without a struggle. So grab yer gear, sharpen yer swords, and prepare to embark on a journey ye'll never forget. DeGroot Keep awaits, offerin' ye the promise of triumph and eternal glory!</div>),
        author_id: 1,
        publish_time: DateTime.now
    )
    Tale.create!(
        title: "Australia, Land of Contrasting Charms: A Demoman's Deliberations on the Land Down Under, with Mick by Me Side",
        content: %(<div class="input-div publish-title-text">Australia, Land of Contrasting Charms: A Demoman's Deliberations on the Land Down Under, with Mick by Me Side</div><div class="input-div">Australia, ye land of contrasts and curiosities, ye be a place that stirs both joy and perplexity within me very soul. As I reflect upon me time in the vast expanses of this far-flung land, accompanied by me trusty mate Mick, I find meself torn betwixt the wonders and the peculiarities that define this sun-soaked realm.</div><div class="input-div">First and foremost, let me regale ye with the marvels that captivated me senses upon settin' foot on Australian soil. The breathtaking landscapes, adorned with arid deserts, verdant rainforests, and azure coastlines, left me in awe. I reveled in the exhilaration of traversing the iconic Outback, where the spirit of adventure danced upon the red earth. The Great Barrier Reef, a masterpiece of nature's craftsmanship, beckoned me to explore its vibrant depths teeming with marine marvels. And who could forget the majesty of the Sydney Opera House, an architectural triumph that stood as a testament to human ingenuity?</div><div class="input-div">Yet, me hearties, alongside these splendors, I encountered facets of Australia that boggled me mind. The critters, ye see, seemed determined to challenge me very sanity. Creatures lurked in every nook and cranny, from the mischievous kangaroos hoppin' about with impudence to the fearsome spiders that haunted me dreams. And let us not forget the sweltering heat, relentless as a never-endin' barrage of explosions, scorchin' me skin and testin' me fortitude with every step.</div><div class="input-div">But amidst these contradictions, one constant remained—me dear mate Mick. Oh, how he reveled in his homeland, sharin' tales of the rugged Outback and the unique flora and fauna that define Australia. He led me through the vast expanses, navigatin' the treacherous terrains with the ease of a seasoned adventurer. His passion for his homeland was infectious, and in his company, I found meself appreciatin' the idiosyncrasies of this foreign land with a newfound fondness.</div><div class="input-div">Together, Mick and I indulged in the vibrant local culture, sample' the delectable meat pies, and washed 'em down with frothy pints of beer. We reveled in the jovial spirit of the Aussie folk, their warm-heartedness and love for a good laugh. We partook in competitive games of cricket, cheerin' and jestin' with our newfound friends as we soaked in the true essence of Australia's conviviality.</div><div class="input-div">Australia, dear friends, be a tapestry of contradictions, a land that challenges and charms in equal measure. The vast landscapes and unique wildlife, though they tested me resolve, also ignited me sense of adventure. And through it all, the presence of Mick, me steadfast companion, helped me appreciate the beauty and quirkiness of this sun-kissed nation.</div><div class="input-div">So, as I raise me glass in a toast to this wondrous land, I say, Australia, ye've left an indelible mark upon me soul. I shall forever cherish the memories forged amidst your contrasting charms. And to me dearest mate Mick, I extend me gratitude for guidin' me through this captivating journey. Together, we unraveled the enigma that be Australia, and for that, I am forever grateful.</div><div class="input-div">Salute, Australia! May yer landscapes continue to amaze, yer critters continue to bewilder, and yer spirit continue to thrive!</div>),
        author_id: 1,
        publish_time: "2023-06-03T05:27:11-04:00"
    )
    Tale.create!(
        title: "The Scout's Speedster Saga: Dominating the Marathon Scene with Lightning-Fast Agility",
        content: %(<div class="input-div publish-title-text">The Scout's Speedster Saga: Dominating the Marathon Scene with Lightning-Fast Agility</div><div class="input-div">Running a marathon? Ha! No sweat for the fastest guy around, the one and only Scout! Strap yourselves in, folks, 'cause I'm about to school ya on what it means to dominate the marathon scene with unparalleled agility and lightning-fast speed.</div><div class="input-div focused">When it comes to racing, I'm the alpha, the omega, and everything in between. My nimble feet are a blu as I dash across the starting line, leaving my competitors eatin' dust faster than they can say "bonk!" The marathon track is my playground, and I'm the undisputed champ of the race.</div><div class="input-div">With every step I take, my brawny legs propel me forward like a human rocket. My years of dodgin' bullets and zoomin' past enemies on the battlefield have honed my reflexes to perfection. I effortlessly navigate through the swarm of runners, weavin' and dodgin' like a spry gazelle, while the wind whispers sweet victory in my ears.</div><div class="input-div">Endurance? Please. I could run circles around the rest of those chumps without breakin' a sweat. The Scout is a well-oiled machine, fueled by a never-ending wellspring of energy. My heart beats like a war drum, pushin' me forward with an insatiable hunger for the finish line. Nothin' can stand in my way.</div><div class="input-div">As I blitz past mile after mile, the crowd's roars of excitement fuel my determination. They witness a blur of blue as I zip through the course, a spectacle of pure speed and athleticism. The Scout is the life of the marathon party, entertainin' the spectators with my sly quips and cheeky banter, all while outpacin' the competition.</div><div class="input-div">You might think that runnin' a marathon is all about brute strength, but you're dead wrong. It's about strategy, precision, and a whole lotta heart. I anticipate every twist and turn, makin' split-second decisions to shave off those precious seconds. My nimble feet dance across the pavement, dodgin' obstacles like a magician evadin' the audience's gaze.</div><div class="input-div">The finish line approaches, and the crowd erupts into thunderous applause. Victory is within my grasp, and I seize it with all my might. The Scout crosses that finish line like a triumphant streak of lightning, arms raised high, basking in the adoration of the crowd. I've conquered the marathon, leavin' my opponents in the dust and cementin' my status as the speed demon extraordinaire.</div><div class="input-div">So, if you ever find yourself starin' down the barrel of a marathon challenge, remember this: speed is the name of the game, and nobody does it better than the Scout. With my lightning-fast agility and boundless energy, victory is inevitable. So lace up yer shoes, buckle up, and get ready to witness the spectacle of the century as the Scout conquers the marathon scene like no one else can.</div><div class="input-div">Catch ya on the flip side, losers!),
        author_id: rand(2..40),
        publish_time: "2023-06-08T05:27:11-04:00"
    )
    Tale.create!(
        title: "Pyro's Fiery Symphony: Igniting the Stage with Explosive Concert Pyrotechnics",
        content: %(<div class="input-div publish-title-text">Pyro's Fiery Symphony: Igniting the Stage with Explosive Concert Pyrotechnics</div><div class="input-div">Ladies and gentlemen, gather 'round and prepare for a spectacle like no other! Today, I shall regale you with tales of pyrotechnic mastery from none other than our mysterious artist, Mr. Pyro! Join me as we delve into the world of concert pyrotechnics and witness the mesmerizing display of flames and explosions that will leave you breathless.</div><div class="input-div">When it comes to setting the stage ablaze, Pyro is the undisputed maestro of fiery enchantment. Beneath that asbestos-lined suit lies an artist with a deep understanding of the harmonious interplay between fire and music. As the lights dim and the crowd's anticipation reaches its peak, Pyro stands poised, ready to transform the concert into an inferno of visual splendor.</div><div class="input-div">With a flick of the wrist and a trail of gasoline, Pyro conjures a mesmerizing dance of flames and explosions. Each burst of fire illuminates the night sky, casting a warm glow upon the audience, as if summoning forth the very essence of musical passion. The crowd gasps in awe as fiery tendrils climb and twist, mirroring the rhythm and melody that flows through the air.</div><div class="input-div">But Pyro's pyrotechnics are not merely random bursts of flame. Oh no, they are a precisely choreographed symphony of fire and artistry. Every explosion, every burst of heat, is meticulously timed to accentuate the crescendos and climaxes of the music, enhancing the emotional journey of the audience. Pyro is not just a performer; Pyro is the conductor, orchestrating a ballet of flames that captivates the senses.</div><div class="input-div">The concert venue transforms into a fiery spectacle, with explosions of color and sparks dancing in perfect synchrony with the music. Flames reach towards the heavens, painting the night sky with a breathtaking display of radiance. The crowd, transfixed by the hypnotic allure of Pyro's pyrotechnics, sways and sings along, immersed in a sensory experience that transcends mere sound.</div><div class="input-div">But Pyro's mastery of pyrotechnics extends beyond the visual spectacle. The very air crackles with energy as the heat washes over the audience, heightening their euphoria. Each explosion is not just a burst of fire; it is a surge of emotion, evoking passion, excitement, and a shared connection between artist and fan. Pyro's pyrotechnics ignite not only the stage but also the hearts and souls of those fortunate enough to witness the spectacle.</div><div class="input-div">So, my friends, if you ever have the opportunity to attend a concert where Pyro weaves their pyrotechnic magic, seize it with both hands. Prepare to be mesmerized by the fiery symphony, where explosions become notes and flames become melodies. Pyro will ignite your imagination, fuel your emotions, and create an unforgettable experience that will forever burn in your memory.</div><div class="input-div">Let us celebrate Pyro's pyrotechnic prowess, where fire and music unite in a harmonious dance of awe-inspiring beauty. Raise your lighters, stomp your feet, and revel in the brilliance of Pyro's fiery symphony, for it is a testament to the power of artistry and the transcendence of the human spirit.</div><div class="input-div">Now, my friends, let the show begin!),
        author_id: rand(2..40),
        publish_time: "2023-05-05T05:27:11-04:00"
    )
    Tale.create!(
        title: "Engineer's Handyman Chronicles: Tackling Odd Jobs with Ingenuity and Grit",
        content: %(<div class="input-div publish-title-text">Engineer's Handyman Chronicles: Tackling Odd Jobs with Ingenuity and Grit</div><div class="input-div">Y'all ever find yerselves in need of a jack-of-all-trades, someone who can tackle any odd job with unmatched skill and resourcefulness? Look no further, 'cause the Engineer's got ya covered! Sit back and listen as I regale ya with tales of takin' on odd jobs, fixin' things that ain't meant to be fixed, and makin' the impossible possible.</div><div class="input-div">As an expert in all things mechanical, the Engineer thrives in the realm of odd jobs. From fixin' leaky pipes to repairin' dilapidated structures, there ain't a challenge that can stump me. Armed with my trusty toolbox and an unwavering determination, I roll up me sleeves and dive headfirst into every task, ready to conquer the seemingly insurmountable.</div><div class="input-div">The secret to my success lies in my ingenuity. When confronted with a problem, I don't just patch it up; I find innovative solutions that stand the test of time. Need a fence mended? I'll whip up a sturdy contraption that'll withstand the harshest winds. Got a malfunctionin' generator? Don't worry, I'll have it hummin' like a well-oiled machine in no time.</div><div class="input-div">But it ain't just my technical prowess that sets me apart. It's my unwavering commitment to quality workmanship. Whether it's fixin' a broken clock or buildin' a custom piece of furniture, I pour my heart and soul into every job. The satisfaction of seein' a smile on my client's face, knowin' I've made their lives a little easier, is worth more to me than any payment.</div><div class="input-div">Odd jobs come in all shapes and sizes, and each one presents its own unique set of challenges. But that's where the Engineer thrives. I'm a master problem solver, a wizard of repairs, and a conductor of efficiency. I tackle each task with meticulous precision, always findin' the most efficient way to get the job done. Time is money, after all.</div><div class="input-div">And let's not forget the camaraderie that comes with odd jobs. As the Engineer, I've had the pleasure of workin' alongside a colorful cast of characters. Whether it's the brawny Heavy lendin' a hand or the wily Spy providin' some unexpected assistance, we come together like a well-oiled machine, each bringin' our unique skills to the table.</div><div class="input-div">So, if you find yerself in need of a handyman extraordinaire, look no further than the Engineer. I'll tackle any odd job with a twinkle in my eye and a wrench in my hand. From simple repairs to complex projects, I'm the one you can trust to get the job done right.</div><div class="input-div">Together, we'll conquer the world of odd jobs, one task at a time. So, let's roll up our sleeves, embrace the challenges, and revel in the satisfaction that comes with a job well done. The Engineer is here, ready to fix, build, and make the impossible possible.),
        author_id: rand(2..40),
        publish_time: "2023-06-09T05:27:11-04:00"
    )
    Tale.create!(
        title: "Spy's Elusive Ascension: Mastering the Art of Requesting Advancement",
        content: %(<div class="input-div publish-title-text">Spy's Elusive Ascension: Mastering the Art of Requesting Advancement</div><div class="input-div">Asking for a promotion? Ah, the delicate dance of climbing the corporate ladder. Step into the shadows, my friends, and let me, the Spy, guide you through the intricate art of requesting advancement with finesse, charm, and a touch of deception.</div><div class="input-div">In the world of covert operations and subtle maneuvering, the Spy is a master manipulator, skilled in the art of persuasion. When the time is right, I unveil my true intentions, donning the guise of a humble employee seeking to ascend to greater heights. But beneath that facade lies a cunning mind, plotting and scheming to secure the coveted promotion.</div><div class="input-div">The first step is gathering intelligence. I study the organization's hierarchy, analyzing the strengths and weaknesses of those in power. I observe their preferences, their vulnerabilities, and the intricate dynamics that shape their decisions. Armed with this knowledge, I craft a strategy to present myself as the ideal candidate for promotion.</div><div class="input-div">Timing is crucial. I carefully choose the opportune moment to approach my superiors, when their guard is down and they are most receptive to my charm. With a confident stride and a disarming smile, I navigate the treacherous waters of office politics, aligning myself with influential figures who can vouch for my capabilities.</div><div class="input-div">But simply asking for a promotion outright is far too obvious, too pedestrian for the Spy's refined tastes. No, I employ a more subtle approach. I subtly drop hints of my achievements, highlighting my contributions to the organization's success. Through discreet conversations and strategically placed compliments, I plant seeds of admiration, cultivating an image of indispensability in the minds of decision-makers.</div><div class="input-div">However, my arsenal of skills extends beyond mere flattery. I utilize my powers of persuasion to persuade others to speak on my behalf. With a deft touch, I orchestrate situations where colleagues unwittingly advocate for my promotion, painting me as the indispensable asset that the organization cannot afford to lose.</div><div class="input-div">And when the time is ripe, when the stars align, I make my move. Armed with a well-crafted proposal outlining the benefits of my promotion, I approach my superiors with an air of confidence and poise. I present my case with eloquence and precision, leaving no room for doubt in their minds. The Spy's persuasive prowess shines through, captivating their attention and swaying their judgment.</div><div class="input-div">But remember, my friends, success is not guaranteed. The path to promotion is a treacherous one, filled with unexpected twists and turns. The Spy must adapt, ready to seize opportunities and overcome obstacles with agility and cunning. Should setbacks arise, I retreat to the shadows, reassess my strategy, and strike again when the time is right.</div><div class="input-div">So, if you find yourself yearning for a promotion, heed the lessons of the Spy. Master the art of persuasion, study the intricate dynamics of your organization, and navigate the delicate dance of office politics. With finesse, charm, and a touch of deception, you too can ascend the ranks, leaving your adversaries in awe and securing the advancement you deserve.</div><div class="input-div focused">The Spy's elusive ascension is a testament to the power of calculated moves and strategic manipulation. Embrace the shadows, my friends, and let the dance begin.</div>),
        author_id: rand(2..40),
        publish_time: "2023-06-01T05:27:11-04:00"
    )
    Tale.create!(
        title: "Heavy's Culinary Expedition: Taming the Seas with Fish-based Delicacies",
        content: %(<div class="input-div publish-title-text">Heavy's Culinary Expedition: Taming the Seas with Fish-based Delicacies</div><div class="input-div focused">Welcome, comrades, to a gastronomic adventure like no other! Join me, the Heavy Weapons Guy, as we embark on a journey into the realm of cooking with fish. Put on your aprons, sharpen your knives, and prepare to indulge in a feast fit for champions, for the Heavy is here to show you the true power of fish-based delicacies.</div><div class="input-div">Fish, my friends, is a bountiful treasure from the depths of the seas. Its flavors are as diverse as the ocean itself, ranging from delicate and mild to robust and meaty. With its rich nutrients and unique textures, fish presents a world of culinary possibilities that will tantalize your taste buds and leave you yearning for more.</div><div class="input-div">As a man of strength and fortitude, I approach cooking with fish with the same dedication I bring to the battlefield. The Heavy's kitchen is my domain, and the fish is my obedient ally. Together, we create masterpieces that will make even the most discerning palate tremble with delight.</div><div class="input-div">The first key to successful fish-based cooking is freshness. Like a vigilant sentinel, I procure only the finest and freshest catch, ensuring that every dish starts with the highest quality ingredients. Whether it's succulent salmon, flaky cod, or delicate trout, the Heavy's discerning eye and firm handshake guarantee the finest selection.</div><div class="input-div">Next comes the art of preparation. With a steady hand and a keen eye, I fillet and debone the fish with precision and grace. Each cut is a testament to my mastery, as I transform the raw bounty into elegant pieces ready for the culinary dance. The Heavy's knife skills are as sharp as my minigun, ensuring every slice is executed flawlessly.</div><div class="input-div">Now, comrades, let us not forget the importance of flavor. The Heavy's secret weapon lies in the marinades and seasonings that infuse the fish with a symphony of taste. I draw inspiration from my Russian roots, using fragrant herbs, zesty citrus, and a touch of vodka to create marinades that elevate the fish to new heights. With a delicate balance of flavors, the Heavy's creations dance upon the palate like a triumphant Cossack.</div><div class="input-div">Grilling, baking, or pan-searing? The Heavy does it all. Each cooking method is a testament to my versatility in the kitchen. The searing heat of the grill imparts a smoky intensity, while baking allows the flavors to meld and infuse. Pan-searing, on the other hand, creates a delectable crust that seals in the fish's natural juices. The choice is yours, comrades, as we embark on a culinary adventure tailor-made to satisfy your desires.</div><div class="input-div">And what is a feast without accompaniments? The Heavy's table is graced with an array of complementary dishes that celebrate the fish's magnificence. Whether it's a refreshing cucumber and dill salad, a hearty potato medley, or a tangy lemon butter sauce, every component is carefully crafted to enhance the fish's inherent qualities.</div><div class="input-div">So, my comrades, if you seek to conquer the culinary world with the power of fish, join me on this epic voyage. The Heavy's culinary expedition promises a symphony of flavors, a celebration of the sea's bounty that will leave you craving more. Strap on your aprons, grab your spatulas, and let us embark on this adventure together.</div><div class="input-div">Prepare to savor the fruits of the ocean, for the Heavy's fish-based delicacies will ignite your senses and elevate your culinary prowess to new heights.</div>),
        author_id: rand(2..40),
        publish_time: "2023-05-25T05:27:11-04:00"
    )

    # puts "Creating Stars..."
    # 200.times do
    #     Star.create!(
    #         user_id: rand(1..40),
    #         tale_id: rand(1..7)
    #     )
    # end

    puts "Done Seeding"
end