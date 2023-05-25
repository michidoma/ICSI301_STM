fetch('../../db.json')
  .then(response => response.json())
  .then(data => {
    const urlParams = new URLSearchParams(window.location.search);
    const travelId = urlParams.get('travelid');

    const travel = data.travels.find(travel => travel.id === parseInt(travelId));

    const travelTitleElement = document.getElementById('travel-title');
    travelTitleElement.textContent = travel.title;
  })
  .catch(error => {
    console.log('Error fetching travel data:', error);
});
