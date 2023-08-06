// A jQuery script that listens to when a user  clicks the input checkbox, and add the checked value to the div tag
$(document).ready(function () {
    let amenity_list = {}; // Initialize an empty dictionary for selected amenities

    // Attach an event listener to the checkboxes
    $('.amenity-checkbox').change(function () {
        amenity_list = {}; // Clear the dictionary before rebuilding it

        // Loop through all checked checkboxes
        $('.amenity-checkbox:checked').each(function () {
            let amenity_id = $(this).data('id');
            let amenity_name = $(this).data('name');
            amenity_list[amenity_id] = amenity_name; // Store the Amenity ID and name in the dictionary
        });

        // Update the h4 tag with the list of selected amenities
        let amenity_items = Object.values(amenity_list).join(', ');
        $('.amenities h4').text(amenity_items);
    });

    // API status function:
    function checkAPIStatus() {
        const apiUrl = 'http://' + window.location.hostname + ':5001/api/v1/status/';
        $.get(apiUrl, function (data) {
            if (data.status === 'OK') {
                $('#api_status').addClass('available');
            } else {
                $('#api_status').removeClass('available');
            }
        });
    }

    // on page load:
    checkAPIStatus();

    // Using AJAX to make a POST request to our API endpoint
    function postData() {
        $.ajax({
            url: 'http://' + window.location.hostname + ':5001/api/v1/places_search/',
            data: JSON.stringify({}),
            type: 'POST',
            contentType: 'application/json',
            success: function (data) {
                data.forEach((place) => {
                    $('section.places').append(`
                    <article>
                        <div class="title_box">
                            <h2>${place.name}</h2>
                            <div class="price_by_night">$${place.price_by_night}</div>
                        </div>
                        <div class="information">
                            <div class="max_guest">${place.max_guest} Guest${(place.max_guest !== 1) ? 's' : ''}</div>
                            <div class="number_rooms">${place.number_rooms} Bedrooms${(place.number_rooms !== 1) ? 's' : ''}</div>
                            <div class="number_bathrooms">${place.number_bathrooms} Bathroom${(place.number_bathrooms !== 1) ? 's' : ''}</div>
                        </div>
                        <div class="description">${place.description}</div>
                    `)
                });
            }
        })
    } 
    postData();
});
