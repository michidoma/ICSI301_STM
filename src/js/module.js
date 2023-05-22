import LatestNews from '../modules/CardNewsModule.js';
import ActiveTravels from '../modules/CardModule.js';
import Reviews from '../modules/ReviewsModule.js';

// News module
const latestNews = new LatestNews("../../db.json", 4);
latestNews.fetchAndRender("blog-container");

// Travels
const activeTravels = new ActiveTravels("../../db.json");
activeTravels.renderUpcomingTravels("upcoming-travels-container");
activeTravels.renderSpecialTravels("special-travels-container");
// setInterval(() => {
//   activeTravels.renderUpcomingTravels("upcoming-travels")
// }, 2000);

// Review module
const reviews = new Reviews("../../db.json");
reviews.fetchAndRender("review-container");

// setInterval(() => {
//   activeTravels.upload()
// }, 15000);'

// Information Module
import Information from "../modules/InformationModule.js";
const newInfo = new Information("../../db.json");
newInfo.fetchAndRenderInfo("information");
