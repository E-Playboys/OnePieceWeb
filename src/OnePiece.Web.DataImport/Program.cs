using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
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
            ///ImportMangasData();
            ImportAnimeData();
            Console.ReadLine();
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

                // Currently chapter 22 - episode 195 to 205

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

                        MangaImage newEpisode = new MangaImage()
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

                        newChapter.MangaImages.Add(newEpisode);
                        Console.WriteLine("Episode {0} {1} - Page {2} Imported !", i + 1, episodeNames[i], pageNum);
                        pageNum++;
                    }
                }

                onePieceDb.MangaChapters.Add(newChapter);
                onePieceDb.SaveChanges();
            }
        }

        static void ImportAnimeData(string jsonFileName = "opEpisode.txt")
        {
            Task.Run(async () =>
            {
                using (var httpClient = new HttpClient())
                {
                    var animeSeasonsData = new List<AnimeSeasonData>();
                    animeSeasonsData = InitAnimeSeasonData();
                    var animeSeasons = new List<AnimeSeason>();
                    foreach (var animeSeasonData in animeSeasonsData)
                    {
                        var animeSeason = new AnimeSeason()
                        {
                            Number = animeSeasonData.Number,
                            Name = animeSeasonData.Name,
                            AnimeEpisodes = new List<AnimeEpisode>()
                        };

                        for (int i = animeSeasonData.StartEpisode; i <= animeSeasonData.EndEpisode; i++)
                        {
                            var episode = new AnimeEpisode()
                            {
                                Number = i,
                                AnimeVideos = new List<AnimeVideo>()
                            };

                            var animeVideo = new AnimeVideo()
                            {
                                VideoLinks = new List<VideoLink>()
                            };

                            string result;
                            // There's no topic for episode before 465
                            if (i >= 465)
                            {
                                result = await httpClient.GetStringAsync($"http://fconepiece.com/one-piece-{i}");
                                var matchTitle = Regex.Match(result,
                                    "<h1 class=\"entry-title\">(.+)<");
                                if (matchTitle.Success)
                                {
                                    episode.Name = matchTitle.Groups[1].Value;
                                }
                                var matchDesc = Regex.Match(result,
                                    "<p>(.+)<\\/p>\\n<p>(.+)<br");
                                if (matchDesc.Success)
                                {
                                    episode.Description = $"{matchDesc.Groups[1].Value} - {matchDesc.Groups[2].Value}";
                                }
                            }                            

                            result = await httpClient.GetStringAsync($"http://onepiecefc.com/vi/one-piece-anime/episode-{i}");
                            var match = Regex.Match(result,
                                "(source src=)[\"\']?((?:.(?![\"\']?\\s+(?:\\S+)=|[>\"\']))+.)[\"\']?");
                            if (match.Success)
                            {
                                var link = match.Groups[2].Value;
                                var videoLink = new VideoLink()
                                {
                                    Url = link,
                                    IsMainLink = true,
                                    LinkType = 0, //LinkType.Stream
                                    VideoQuality = 0//VideoQuality.Normal
                                };

                                animeVideo.VideoLinks.Add(videoLink);
                                Console.WriteLine(link);
                            }
                            animeVideo.AnimeEpisode = episode;
                            episode.AnimeSeason = animeSeason;
                            episode.AnimeVideos.Add(animeVideo);
                            animeSeason.AnimeEpisodes.Add(episode);
                        }
                        animeSeasons.Add(animeSeason);
                        onePieceDb.AnimeSeasons.Add(animeSeason);
                        onePieceDb.SaveChanges();
                    }
                    File.WriteAllText(jsonFileName, JsonConvert.SerializeObject(animeSeasons));
                }
            }).Wait();
            Console.WriteLine("Done!");
        }

        public class AnimeSeasonData
        {
            public int Number { get; set; }

            public string Name { get; set; }

            public string Description { get; set; }

            public int StartEpisode { get; set; }

            public int EndEpisode { get; set; }
        }

        public static List<AnimeSeasonData> InitAnimeSeasonData()
        {
            List<AnimeSeasonData> data = new List<AnimeSeasonData>();
            data.Add(new AnimeSeasonData()
            {
                Number = 1,
                Name = "Monkey D. Luffy",
                Description = "",
                StartEpisode = 1,
                EndEpisode = 62
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 2,
                Name = "Tiến vào Grand Line",
                Description = "",
                StartEpisode = 63,
                EndEpisode = 77
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 3,
                Name = "Gặp Chopper tại đảo Mùa Đông",
                Description = "",
                StartEpisode = 78,
                EndEpisode = 92
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 4,
                Name = "Tiến tới Alabasta",
                Description = "",
                StartEpisode = 93,
                EndEpisode = 130
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 5,
                Name = "Những giấc mơ",
                Description = "",
                StartEpisode = 131,
                EndEpisode = 143
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 6,
                Name = "Đảo trên Trời ",
                Description = "",
                StartEpisode = 144,
                EndEpisode = 195
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 7,
                Name = "Thoát khỏi pháo đài Naval & Băng hải tặc Foxy",
                Description = "",
                StartEpisode = 196,
                EndEpisode = 228
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 8,
                Name = "Water 7",
                Description = "",
                StartEpisode = 229,
                EndEpisode = 263
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 9,
                Name = "Sảnh Enies",
                Description = "",
                StartEpisode = 264,
                EndEpisode = 336
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 10,
                Name = "Thriller Bark",
                Description = "",
                StartEpisode = 337,
                EndEpisode = 381
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 11,
                Name = "Sabaody Archipelago",
                Description = "",
                StartEpisode = 382,
                EndEpisode = 407
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 12,
                Name = "Đảo Nữ Quốc",
                Description = "",
                StartEpisode = 408,
                EndEpisode = 421
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 13,
                Name = "Ngục Impel Down",
                Description = "",
                StartEpisode = 422,
                EndEpisode = 458
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 14,
                Name = "Tổng bộ Hải Quân/Tân thế giới",
                Description = "",
                StartEpisode = 459,
                EndEpisode = 516
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 15,
                Name = "Đảo người cá",
                Description = "",
                StartEpisode = 517,
                EndEpisode = 574
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 16,
                Name = "Đảo Punk Hazard",
                Description = "",
                StartEpisode = 575,
                EndEpisode = 628
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 17,
                Name = "Dressrosa",
                Description = "",
                StartEpisode = 629,
                EndEpisode = 746
            });
            data.Add(new AnimeSeasonData()
            {
                Number = 1,
                Name = "Zou",
                Description = "",
                StartEpisode = 747,
                EndEpisode = 771
            });

            return data;
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
            "Gear Two",
            "Response",
            "Accepting the Challenge",
            "The Girl They Called a Demon",
            "Dereshi",
            "Olvia",
            "The Demons of Ohara",
            "Ohara vs. the World Government",
            "Saul",
            "In Hopes of Reaching the Future",
            "Declaration of War",
            "Jump Toward the Waterfall!!",
            "The Key to Freedom",
            "Pirates vs. CP9",
            "Handcuffs No. 2",
            "Mr. Chivalry",
            "Franky vs. Fukurô",
            "Power",
            "Life Return",
            "Monster",
            "Monster vs. Kumadori",
            "The Terrifying Broadcast",
            "Super-Size Nami",
            "Nami vs. Kalifa",
            "You Missed Your Chance",
            "Hunter",
            "Sanji vs. Jabra",
            "Heat Up",
            "Zolo vs. Kaku",
            "Asura",
            "Luffy vs. Rob Lucci",
            "Legend of a Hero",
            "Buster Call",
            "Gear Three",
            "Rob Lucci",
            "Mermaid Legend",
            "Escape Ship",
            "Bridge of Mortal Combat",
            "A Ship Waiting for Wind",
            "This Isn't the Afterlife",
            "Let's Go Back",
            "Utter Defeat",
            "A Light Snow of Reminiscence Falls",
            "Fist of Love",
            "Jack-in-the-Box",
            "The Name of That Sea",
            "Whitebeard and Red-Hair",
            "You Have My Sympathies",
            "Trunks from Franky-House",
            "Naked Mania",
            "Pride",
            "Third and Seventh",
            "Fire Fist vs. Blackbeard",
            "Duel on Banaro Island",
            "Adventure in the Demonic Sea",
            "Thriller Bark",
            "Adventure on Ghost Island",
            "Zombies",
            "Doctor Hogback",
            "Zombie-in-the-Box",
            "Moria",
            "The Four Monsters of Thriller Bark",
            "Night of the General Zombies",
            "Perona's Wonder Garden",
            "Jigoro of the Wind",
            "Cloudy, Partly Bony",
            "The Humming Swordsman",
            "Gecko Moria of the Seven Warlords of the Sea",
            "Demon from the Land of Ice",
            "Meat!!!",
            "Anything but My Afro",
            "I Can't Just Die Hoping to be Forgiven",
            "Conquest Before Dawn!!",
            "Ghost Buster",
            "Adventures of Oars",
            "Pirate Sanji vs. Mystery Man Absalom",
            "Sanji's Dream",
            "Pirate Usopp vs. Mystery Woman Perona",
            "Conclusion",
            "Pirate Zolo vs. Samurai Ryuma",
            "Pirate Chopper vs. Mystery Man Hogback",
            "Come Out Here, Straw Hat Pirates!",
            "Oars vs. Straw Hat Pirates",
            "Down",
            "Warlord Bartholomew Kuma Appears",
            "We Have to Do It!",
            "Pirates of the Forest",
            "Nightmare Luffy",
            "3/8",
            "Luffy vs. Luffy",
            "Warrior of Hope",
            "Interception",
            "Shadows Asgard",
            "Morning is Coming",
            "The End of the Dream",
            "Squish",
            "Straw Hat Pirates - Pirate Hunter Zolo",
            "Piano",
            "That Song",
            "Song of Life",
            "Eighth Person",
            "Arriving Again",
            "Flying Fish Riders",
            "Iron Mask Duval",
            "You Know Me",
            "Duval's Tragedy",
            "Gaon Cannon",
            "Yarukiman Mangrove",
            "Adventure on the Archipelago of Dancing Soap Bubbles",
            "The Eleven Supernovas",
            "Sabaody Park",
            "The Embers of History",
            "The World Begins to Swell",
            "The Incident of the Celestial Dragons",
            "Aggravated Island",
            "Pirate Front Line on the Move!!",
            "Kuma",
            "Roger and Rayleigh",
            "Kizaru Arrives",
            "Island of Carnage",
            "Kizaru vs. Four Captains",
            "Straw Hat Pirates vs. War Machine",
            "Axe-Carrying Sentomaru",
            "Zolo, Gone",
            "Beyond Rescue!!!",
            "Body Parasite Mushrooms",
            "Adventure on the Island of Women",
            "Pirate Empress Boa Hancock",
            "Bath Time",
            "Coliseum",
            "Natural Born King",
            "Eye of the Gorgon",
            "Hoof of the Celestial Dragon",
            "Fatal Illness",
            "Hell",
            "Unstoppable",
            "The Underwater Prison Impel Down",
            "Adventure in the Great Prison",
            "Level 1: Crimson Hell",
            "Jimbei, First Son of the Sea",
            "Level 2: Beast Hell",
            "From One Hell to Another",
            "Level 3: Starvation Hell",
            "Jailer Beast Minotaur",
            "Level 4: Inferno Hell",
            "Warden Magellan vs. Pirate Luffy",
            "Friend",
            "Level 5: Frozen Hell",
            "A Ray of Hope",
            "Level 5.5 New Kama Land",
            "Emporio Energy Synthesis",
            "Level 6: Infinite Hell",
            "The Greatest Ever",
            "Yet Another Epic Incident",
            "Straw Hat and Blackbeard",
            "The Lid to the Cauldron of Hell Opens",
            "To Sunshine and Freedom",
            "Fish-Man Pirate Captain Jimbei, Warlord of the Sea",
            "Island Ripper",
            "Thank You",
            "Battleship",
            "Navy Headquarters",
            "Whitebeard of The Four Emperors",
            "Ace and Whitebeard",
            "Summit Battle",
            "Admiral Akainu",
            "Oars and the Hat",
            "Justice Will Prevail!",
            "Luffy and Whitebeard",
            "Little Brother",
            "Destiny",
            "Prisoners of Impel Down",
            "Luffy vs. Mihawk",
            "Whirl Spider Squard",
            "One Man, One Heart",
            "The Man Who Shook the World",
            "Oars' Path",
            "Raid",
            "Marineford Navy Headquarters - Oris Plaza",
            "Have It Your Way!",
            "White Monster",
            "The Bridge of Life",
            "The Execution Platform",
            "The Times They Are A-Changin'",
            "The Name of This Era is 'Whitebeard'",
            "The Death of Portgaz D. Ace",
            "Voiceless Rage",
            "The Great Pirate Edward Newgate",
            "Outrageous Events One After Another",
            "A Gift",
            "A Few Seconds of Courage",
            "The War's Conclusion",
            "Creeping Future",
            "Luffy and Ace",
            "Gray Terminal",
            "Incident with Porchemy",
            "Brotherly Pact",
            "City of Stench",
            "I Will Never Run Away",
            "Sabo's Ocean",
            "Efforts Toward Glory",
            "My Brother",
            "Are You Sure That's All Right?",
            "Yell",
            "News",
            "Message",
            "The Pledge",
            "Spectrum",
            "3D2Y",
            "Two Years Later",
            "Nine Pirates",
            "Island of New Beginnings",
            "Romance Dawn: For the New World",
            "Downward Ho!",
            "Keep That in Mind",
            "To the Deep Sea",
            "The Kraken and the Pirates",
            "Deep Sea Adventure",
            "30,000 Feet Under the Sea",
            "Underwater Paradise",
            "Adventure on Fish-Man Island",
            "Madam Sharley, Fortune-Teller",
            "Hody Jones",
            "Taken by the Shark They Saved",
            "Mermaid Princess of Shell Tower",
            "Too Late Now",
            "Mark-Mark Curse",
            "Anniversary for Revenge",
            "Incident at Coral Hill",
            "Proposal",
            "At the Forest of the Sea",
            "The Wonderful Amusement Park",
            "Otohime and Tiger",
            "The Sun Pirates",
            "Fisher Tiger the Pirate",
            "Queen Otohime",
            "Uninherited Will",
            "Neptune Brothers",
            "Thank You",
            "Spring Cleaning",
            "Former Warlord in the Way",
            "Getting Violent",
            "Conchcorde Plaza",
            "I Knew",
            "Friend or Foe",
            "100,000 vs. 10",
            "So Scary I Ran Up to the Sky",
            "General from Future Land",
            "The Ancient Ark",
            "Runaway-hoshi",
            "I'll Protect Everything",
            "Right Above Fishman Island",
            "What Are You?",
            "Complete Loss of Face",
            "Phantom",
            "To Zero",
            "Death Is Also Revenge",
            "Frog",
            "Stop, Noah",
            "The Road Towards the Sun",
            "Dancing of Breams and Plaices",
            "Two Changes to Keep in Mind",
            "The Voice From the New World",
            "A Premonition of Stormy Seas",
            "The Hero Hat",
            "A Gam of Whales",
            "Punk Hazard",
            "Adventure on the Burning Island",
            "Severed Head",
            "The Biscuits Room",
            "About My Torso",
            "Trafalgar Law, Warlord of the Sea",
            "Lakeside Bandits",
            "Warlord Law vs. Vice Admiral Smoker",
            "CC",
            "Master Caesar Clown",
            "Candy",
            "Yeti Cool Brothers",
            "Cool Fight",
            "Pirate Alliance",
            "Commence Operation",
            "Blizzard With a Chance of Slime",
            "Gas-Gas Fruit",
            "My Name is Kin'emon!!",
            "Vergo and Joker",
            "The Observers",
            "I Call it Land of the Dead",
            "The Perfect Weapon of Mass Murder",
            "Counter Hazard!!",
            "Lobby of Laboratory Building A",
            "The G-5 Spirit",
            "G-5 Commander Vergo the Bamboo Demon",
            "Luffy vs. Master",
            "Puppet Master",
            "An Icy Woman",
            "Don't Do It, Vegapunk",
            "My Name is Momonosuke",
            "The Snow-Woman in the Biscuits Room",
            "Wild Beast",
            "Mocha",
            "The Island That's There but Isn't There",
            "S.A.D.",
            "King of the Land of the Dead",
            "Assassins from Dressrosa",
            "Die for Me",
            "The Most Dangerous Man",
            "Leave It to Us!!!",
            "Mutual Interests",
            "Deal",
            "Doflamingo Appears",
            "Morning Paper",
            "His Pace",
            "Adventure in the Country of Love, Passion, and Toys",
            "Corrida Coliseum",
            "Waiting Room",
            "Lucy and the Statue of Kyros",
            "Maynard the Pursuer",
            "I Ain't Gonna Laugh at Ya",
            "Block B",
            "Coliseum of Scoundrels",
            "King Punch!!",
            "To Greenbit",
            "Adventure in the Land of the Little People",
            "Violet",
            "Usoland",
            "Lucy and Moocy",
            "The Battleground of Block C",
            "Don Chin Jao",
            "Dressrosa's Forgotten",
            "Riku Royal Army at the Flower Field",
            "Open, Chin Jao",
            "Prisoner-Gladiators",
            "Rebecca and the Soldier",
            "Royal Bloodlines",
            "Change of Plans",
            "Law's Plan",
            "The Undefeated Woman",
            "The Riku Family",
            "The Hero's Ambush",
            "The Number of Tragedies",
            "Warlord Doflamingo vs. Warlord Law",
            "Three Cards",
            "Operation Dressrosa S.O.P.",
            "An Underground World",
            "What The Soldier Wants",
            "The Slicing Winds of Rommel",
            "Fujitora's Plan",
            "Supreme Officer Diamante",
            "Officer Tower",
            "Trebol Army, Special Officer Sugar",
            "Captain",
            "It's in Your Hands!!!",
            "Usoland the Liar",
            "Ever At Your Side",
            "Dressrosa Trembles",
            "Revolutionary Army Chief of Staff",
            "The Birdcage",
            "Stars",
            "Supreme Officer Pica",
            "Repaying the Debt",
            "Onward, Gallery of Rogues!!",
            "Flashpoints",
            "Sabo vs. Admiral Fujitora",
            "Palm",
            "Battle",
            "Making Acquaintance",
            "A Man's World",
            "The Fourth Step",
            "Trump Card",
            "Just Keep Going",
            "Secret Plan",
            "The Same Bet",
            "The Op-Op Fruit",
            "The White Town",
            "Declaration of Humanity",
            "White Monster",
            "Minion, the Isle of Fate",
            "Smile",
            "Cora",
            "The Trigger That Day",
            "Bellamy the Pirate",
            "The Spear of Elbaph",
            "Sai, Don of the Happosui Army",
            "Cabbage and Lomeo",
            "Half 'n Half",
            "Leo, Captain of the Tontatta Warriors",
            "To Russian With Love",
            "The Hero of the Coliseum",
            "Zoro vs. Pica",
            "Tactics No. 5",
            "His Final Battle",
            "The Heart Curse",
            "Desire",
            "Champion of Evil",
            "In My Way",
            "Gear Four",
            "On Broken Legs",
            "Gyats",
            "Four Minutes Before",
            "My Battle",
            "LUCY!!",
            "Heaven and Earth",
            "Rubble",
            "On Hands and Knees",
            "Tiger and Dog",
            "Sabo's Adventure",
            "Suicide",
            "Soldier's Conviction",
            "Rebecca",
            "Heart",
            "Father and Sons",
            "Sons' Cups",
            "Opening Speech",
            "Zou",
            "Elephant Climbing",
            "Adventure in the Land Atop the Elephant's Back",
            "The Minks",
            "At Rightflank Fortress",
            "Ten Days Earlier",
            "Duke Dogupine",
            "The Cat Viper",
            "The Twirly Hat Crew Arrives",
            "Roko",
            "Capone 'Gang' Bege",
            "Tea Party Invitation",
            "Let's Go See The Cat Viper",
            "Take Me With You!!",
            "Dog vs. Cat",
            "Raizo of the Mist",
            "Inside the Whale",
            "Momonosuke, Heir to the Kozuki Clan",
            "Cats and Dogs Have a History",
            "Understood",
            "Descending the Elephant",
            "The World is Restless",
            "Whim",
            "Comic Strip",
            "0 and 4",
            "Totland",
            "1 and 2",
            "Emperor of the Sea, Charlotte Linlin",
            "A Man You Can Bet On",
            "Adventure in the Mysterious Forest",
            "The Germa Kingdom",
            "Vinsmoke Judge",
            "My Dream",
            "Kingdom of Soul",
            "Lola's Vivre Card",
            "Luffy vs. Cracker the General",
            "Chobro"
        };
    }
}
