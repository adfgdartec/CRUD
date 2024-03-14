mapboxgl.accessToken = 'pk.eyJ1IjoicmFqaWFkYXIxIiwiYSI6ImNscmU3OWRtdjFobGwyaXFuZGh6Z3FodGsifQ.bMGK4KZ4EtFq5-3hj-uwzQ';
	
	var map = new mapboxgl.Map({
	  container: 'map',
	  style: 'mapbox://styles/mapbox/light-v11',
	  center: post.geometry.coordinates,
	  zoom: 5
	});

  // create a HTML element for each feature
  const el = document.createElement('div');
  el.className = 'marker';

  // make a marker for each feature and add to the map
  new mapboxgl.Marker(el).setLngLat(post.geometry.coordinates).setPopup(
    new mapboxgl.Popup({ offset: 25 }) // add popups
      .setHTML(
        `<h3>${post.title}</h3><p>${post.location}</p>`
      )
  ).addTo(map);

  $('.toggle-edit-form').on('click', function(){
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    $(this).siblings('.edit-review-form').toggle();
})








// Add Click Listener to clear rating for edit and create review form.


$('.clear-rating').click(function () {
    $(this).siblings('.input-no-rate').click();
})
