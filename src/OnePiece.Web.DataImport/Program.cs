using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePiece.Web.DataImport
{
    class Program
    {
        private static Account cloudinaryAcc = new Account("ewiki-io", "742665545865257", "S1PQu71FWZ8l8b-PjsLRzTtoeLg");
        private static Cloudinary cloudinary = new Cloudinary(cloudinaryAcc);
        private static OnePieceEntities onePieceDb = new OnePieceEntities();

        static void Main(string[] args)
        {
            ImportMangasData();
        }

        static void ImportMangasData(string jsonFileName = "opChapters.txt")
        {
            int fromEp;
            int toEp;
            int chapterNum;
            string chapterName;
            string chapterDescription;
            DateTime chapterPublishDate;

            Console.Write("Chapter num:");
            chapterNum = int.Parse(Console.ReadLine());
            Console.Write("Chapter name:");
            chapterName = Console.ReadLine();
            Console.Write("Chapter publish date:");
            chapterPublishDate = DateTime.Parse(Console.ReadLine());
            Console.Write("Ep. from:");
            fromEp = int.Parse(Console.ReadLine());
            Console.Write("Ep. to:");
            toEp = int.Parse(Console.ReadLine());

            // For descriptions
            Console.Write("Chapter description:");
            Stream inputStream = Console.OpenStandardInput();
            byte[] bytes = new byte[20000];
            int outputLength = inputStream.Read(bytes, 0, 20000);
            chapterDescription = Encoding.UTF8.GetString(bytes);

            using (StreamReader sr = new StreamReader(jsonFileName))
            {
                string jsonData = sr.ReadToEnd();
                List<Chapter> array = JsonConvert.DeserializeObject<List<Chapter>>(jsonData);

                // Anime
                // Season 1 from 1 - 62
                // Season 2 from 63 - 77
                // Season 3 from 78 - 92
                // Season 4 from 93 - 130
                // Season 5 from 131 - 143
                // Season 6 from 144 - 195
                // Season 7 from 196 - 228
                // Season 8 from 229 - 263

                // Mangas
                // Season 1 - 186 (20 chap)
                // Season 187- 388 (20 chap)
                // Season 389 - 594 (20 chap)
                // Season 595 - 806 (20 chap)
                // Season 807 - 850

                MangaChapter newChapter = new MangaChapter()
                {
                    MangaSeasonId = 2,
                    Name = chapterName,
                    Number = chapterNum,
                    PublishedDate = chapterPublishDate,
                    Description = chapterDescription
                };

                // Currently chapter 21 - episode 186 to 195

                for (int i = fromEp; i < toEp; i++)
                {
                    int pageNum = 1;

                    foreach (string url in array[i].Pages)
                    {
                        ImageUploadParams mangaImgUploadParams = new ImageUploadParams()
                        {
                            File = new FileDescription(url),
                            PublicId = string.Format("OnePiece/Mangas/Volume2/Chapter{0}/episode_{1}_page_{2}", newChapter.Number, i + 1, pageNum)
                        };

                        ImageUploadResult imgResult = cloudinary.Upload(mangaImgUploadParams);

                        Manga newEpisode = new Manga()
                        {
                            Number = pageNum,
                            Link = imgResult.Uri.ToString(),
                            AlternativeLink = url,
                            CreatedDate = DateTime.Now,
                            Height = imgResult.Height,
                            Width = imgResult.Width,
                            Name = string.Format("Episode {0} - Page {1}", i + 1, pageNum),
                            Description = episodeNames[i]
                        };

                        newChapter.Mangas.Add(newEpisode);
                        Console.WriteLine("Episode {0} {1} - Page {2} Imported !", i + 1, episodeNames[i], pageNum);
                        pageNum++;
                    }
                }

                onePieceDb.MangaChapters.Add(newChapter);
                onePieceDb.SaveChanges();
            }
        }

        private static string[] episodeNames = {
            "Romance Dawn",
            "They Call Him 'Straw Hat Luffy'",
            "Enter Zoro: Pirate Hunter",
            "The Great Captain Morgan",
            "The King of the Pirates and the Master Swordsman",
            "Number One",
            "Friends",
            "Nami",
            "Femme Fatale",
            "Incident at the Tavern",
            "Flight",
            "Dog",
            "Treasure",
            "Reckless",
            "Gong",
            "Versus Buggy's Crew",
            "High Level, Low Level",
            "The Pirate Buggy the Clown",
            "Devil Fruit",
            "The Way of the Thief",
            "Townies",
            "Strange Creatures",
            "The Dread Captain Usopp",
            "The Lie Rejecter",
            "Lies",
            "Captain Kuro's Plan",
            "True Lies",
            "Crescent Moon",
            "Uphill Battle",
            "Backfire",
            "Truth",
            "Cruel Fortune",
            "The Creeping Cat",
            "A Humble Servant",
            "The Steep Slope",
            "After Them!!",
            "Captain Kuro, of the Thousand Plans",
            "Pirate Crew",
            "For Whom the Bell Tolls",
            "Usopp's Pirate Crew",
            "To the Sea",
            "Yosaku and Johnny",
            "Sanji",
            "Three Tough Cooks",
            "Before the Storm",
            "An Uninvited Guest",
            "The Don's Offer",
            "Steer Clear",
            "Storm",
            "A Parting of Ways",
            "Zoro Overboard",
            "The Oath",
            "Mackerel Head",
            "Pearl",
            "Jungle Blood",
            "I Refuse",
            "If You Have a Dream",
            "Crap-Geezer",
            "Sanji's Debt",
            "Resolution",
            "The Demon",
            "MH5",
            "I Won't Die",
            "The Mighty Battle Spear",
            "Prepared",
            "The Chewed-up Spear",
            "The Soup (Soup)",
            "The Fourth Person",
            "Arlong Park",
            "The Great Adventure of Usopp the Man",
            "Lords of All Creation",
            "Proper Living",
            "Monsters of the Grand Line",
            "Business",
            "Of Maps and Fish-Men",
            "Sleep",
            "The First Step Toward a Dream",
            "Belle-Mère",
            "To Live",
            "A Thief is a Thief",
            "Tears",
            "OK, Let's Stand Up!",
            "Luffy in Black",
            "Zombie",
            "Three Swords vs. Six",
            "Heroism vs. Fish-Man Cruelty",
            "It's All Over!!",
            "Die!!!",
            "Trade-off",
            "What Can You Do?",
            "Darts",
            "Happiness",
            "Going Down",
            "The Other Villain",
            "Spin, Pinwheel",
            "The Meanest Man in the East",
            "Kitetsu III",
            "Dark Clouds",
            "Luffy Died",
            "The Legend Begins",
            "Reverse Mountain",
            "And Now, the Grand Line",
            "The Whale",
            "Cape Promise",
            "Log Pose",
            "The Town of Welcome",
            "Moonlight and Tombstones",
            "100 Bounty Hunters",
            "A Question of Duty",
            "The Night Isn't Over",
            "The Secret Criminal Organization",
            "Luffy vs. Zoro",
            "It's All Right!!!",
            "The Course",
            "Little Garden of Adventure",
            "Big",
            "Dorry and Broggy",
            "Someone's Out There",
            "Deadly Improvisation",
            "The Red Ogre Weeps",
            "I Knew",
            "A Dead Body is Useless",
            "Luffy vs. Mr. 3",
            "The Tea is Good",
            "Candle Champion",
            "Instinct",
            "Snail-o-phone",
            "Pirate Pride",
            "Straight Ahead!!!",
            "Maximum Speed",
            "Wapol of Tin",
            "See?",
            "Adventure in a Nameless Country",
            "Dr. Kureha",
            "Lapins",
            "A Man Named Dalton",
            "Avalanche",
            "The Summit",
            "Enter Tony Tony Chopper",
            "The Castle of Snow",
            "Quack Doctor",
            "Skull and Cherry Blossoms",
            "Clumsy",
            "Snowy Tale",
            "Carrying on His Will",
            "Battle to Defend the Kingdom",
            "Frauds",
            "Unbreakable",
            "Rumble!!",
            "Royal Drum Crown 7-Shot Tin Tyrant Cannon",
            "The Skies of Drum",
            "Full Moon",
            "Hiruluk's Cherry Blossoms",
            "To Alabasta",
            "Sir Crocodile, the Pirate",
            "Oh Come My Way Days",
            "Ace Arrives",
            "Landing in Alabasta",
            "Come On",
            "Spiders Café at Eight O'Clock",
            "The Green City Erumalu",
            "Adventure in the Kingdom of Sand",
            "Yuba, the Town of Rebels",
            "I Love My Country",
            "Operation Utopia",
            "Luffy vs. Vivi",
            "Battlefront",
            "Rainbase, the City of Dreams",
            "The Kingdom's Strongest Warrior",
            "Beginning",
            "Koza, Leader of the Rebels",
            "Rebellion",
            "Bananagator",
            "Mr. Prince",
            "Release",
            "Rush (Rush!!)",
            "30 Million vs. 81 Million",
            "Grand Line Level",
            "Showdown at Alubarna",
            "Alabasta Animal Land",
            "Supersonic Duck Quiz",
            "Roar",
            "Squadron Leader Karoo",
            "Moletown Block Four",
            "Oh... Is That So?",
            "4",
            "Stalemate",
            "Oh Come My Way Karate",
            "2",
            "Climate Baton",
            "She Who Controls the Weather",
            "Tornado Warning",
            "Utopia",
            "Cutting Steel",
            "Mr. Bushido",
            "1",
            "The Leaders",
            "4:15 p.m.",
            "Hope!!",
            "Water Luffy",
            "Nico Robin",
            "The Royal Mausoleum",
            "Crocodile-ish",
            "Red",
            "The Sand-Sand Band's Secret Fort",
            "Ignition",
            "Nightmare",
            "Guardian Spirit",
            "I Will Defeat You",
            "Zero",
            "King",
            "Some Justice",
            "V.I.P.",
            "Strategy to Escape the Sand Kingdom",
            "Last Waltz",
            "Vivi's Adventure",
            "Stowaway",
            "Why the Log Pose Is Dome-Shaped",
            "Masira the Salvage King",
            "A Walk on the Seafloor",
            "Monsters",
            "The Giant Novice",
            "I Promise Never to Fight in This Town",
            "Do Not Dream",
            "People's Dreams",
            "Shoujou, the Salvage King of the Seafloor",
            "Noland the Liar",
            "Mont Blanc Cricket, the Last Boss of the Monkey Mountain Allied Force",
            "Let's Eat",
            "Pursue the South Bird!",
            "Bellamy the Hyena",
            "The 100 Million Berry Man",
            "The World's Greatest Power",
            "Please Remember",
            "The Knock Up Stream",
            "The Ship Sails to the Sky",
            "High in the Sky",
            "Heaven's Gate",
            "Angel Beach",
            "Dial Power",
            "Heaven's Judgment",
            "Class-2 Criminals",
            "Trial",
            "SOS",
            "Adventure on Kami's Island",
            "Satori, Vassal of the Forest of no Return",
            "Ball Challenge",
            "Former Kami vs. Vassal",
            "The Village Hidden in the Cloud",
            "Ball Dragon",
            "Overture",
            "Junction",
            "Varse",
            "Aubade",
            "The Anaconda and the Search Team",
            "Wyper the Berserker",
            "Dial Battle",
            "The Many Souths",
            "Pirate Zolo vs. Warrior Braham",
            "Pirate Luffy vs. Berserker Wyper",
            "Warrior Genbo vs. Heavenly Warriors Commander Yama",
            "Pirate Chopper vs. Vassal Gedatsu",
            "Pirate Nami and the Weird Knight vs. Heavenly Warriors Subcommanders Hotori and Kotori",
            "Warrior Kamakiri vs. Kami Eneru",
            "Pirate Robin vs. Heavenly Forces Commander Yama",
            "Pirate Chopper vs. Vassal Ohm",
            "March",
            "Suite",
            "Concerto",
            "Serenade",
            "Pirate Zolo vs. Vassal Ohm",
            "Play",
            "Quintet",
            "Oratorio",
            "Divina Commedia",
            "Shandian Rhythm",
            "Maxim",
            "Conis",
            "Pirate Luffy vs. Kami Eneru",
            "Floating",
            "Deathpiea",
            "Desire",
            "On the Front Line of Rescuing Love",
            "Sorry",
            "Capriccio",
            "The Shandoran Demon",
            "Kami Killing",
            "Curse",
            "Full Moon",
            "The Light of Shandora",
            "We'll Be Here",
            "To Meet, like the Half-Moon Hidden by Clouds",
            "Bolero",
            "Kingdom Come",
            "Giant Jack",
            "Ultimate Sky Situation",
            "Praise of the Earth",
            "Love Song",
            "Fantasia",
            "Symphony",
            "I Hereby Guide...",
            "Finale",
            "The Wealthy Pirate Gang",
            "Long Island Adventure",
            "Foxy the Silver Fox",
            "Donut Race!",
            "Ready, Set, Donut!",
            "Obstructive Tactics",
            "Groggy Monsters",
            "Groggy Ring!!",
            "Rough Game",
            "Goal!!",
            "Main Event",
            "Combat!!",
            "Secret Room",
            "Brother Soul",
            "K.O.",
            "Closure",
            "Admiral Aokiji of the Navy Headquarters",
            "Ultimate Military Force",
            "One-on-One",
            "Puffing Tom",
            "The City of Water, Water Seven",
            "Adventures in the City of Water",
            "The Franky Family",
            "Mr. Iceberg",
            "Shipbuilding Island, Repair Dock No. 1",
            "The Pirate Abduction Incident",
            "My Name Is Franky",
            "It's Decided",
            "The Big Argument",
            "Luffy vs. Usopp",
            "Captain",
            "Big Trouble in the Secret Room",
            "Warning",
            "Luffy vs. Franky",
            "Protectors of the City of Water",
            "Coup de Vent",
            "Rumors",
            "The Woman Who Brings Darkness",
            "Demon",
            "The Messengers of Darkness",
            "Cipher Pol No. 9",
            "Opposing Force",
            "Sleepers",
            "The Ninth Justice",
            "Six Powers",
            "Fighting Power",
            "Ordinary Citizens",
            "The Warehouse Under the Bridge",
            "Klabautermann",
            "Tom's Workers",
            "The Legendary Shipwright",
            "Sea Train",
            "Spandam",
            "Mr. Tom",
            "Cutty Flam",
            "Reactivation",
            "Bingo",
            "Departing Soon",
            "P.S.",
            "Ebb Tide",
            "Aqua Laguna",
            "Kokoro",
            "Rocketman!!",
            "Sortie!",
            "Sniper King",
            "Sea Train Battle Game",
            "Ramen Kung Fu",
            "You're Not Alone",
            "The Honorable Captain T-Bone",
            "Plastic Surgery",
            "Necessary Evil",
            "Scramble",
            "The Supermen of Enies Lobby",
            "I Got It!!",
            "The Big Showdown on the Judiciary Island",
            "Casualties",
            "Power Level",
            "Enies Lobby Main Island Express",
            "Fired",
            "Demon Lair",
            "Luffy vs. Blueno",
            "Signal the Counterattack",
            "There Is a Way",
            "Unprecedented",
            "Gear",
            "Gear Two"
        };
    }
}
