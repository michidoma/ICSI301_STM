import LatestNews from '../modules/CardNewsModule.js';
import ActiveTravels from '../modules/CardModule.js';

// News module
const latestNews = new LatestNews("../../db.json", 4);
latestNews.fetchAndRender("blog-container");

// Upcoming Travels
const activeTravels = new ActiveTravels("../../db.json");
activeTravels.renderUpcomingTravels("upcoming-travels");