import ActiveTravels from '../modules/CardModule.js';
const activeTravels = new ActiveTravels("../../db.json");
activeTravels.renderRecommendingTravels("recommending-travels-container");
