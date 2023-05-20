import LatestNews from '../modules/CardNewsModule.js';

// News module
const latestNews = new LatestNews("../../db.json", 4);
latestNews.fetchAndRender("blog-container");