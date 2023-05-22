import LatestNews from '../modules/CardNewsModule.js';
import ActiveTravels from '../modules/CardModule.js';

// News module
const latestNews = new LatestNews("../../db.json", 4);
latestNews.fetchAndRender("blog-container");

// Upcoming Travels
const activeTravels = new ActiveTravels("../../db.json");
activeTravels.renderUpcomingTravels("upcoming-travels");
// setInterval(() => {
//   activeTravels.renderUpcomingTravels("upcoming-travels")
// }, 2000);


// setInterval(() => {
//   activeTravels.upload()
// }, 15000);'

// Information Module
import Information from "../modules/InformationModule.js";
const newInfo = new Information("../../db.json");
newInfo.fetchAndRenderInfo("information");
