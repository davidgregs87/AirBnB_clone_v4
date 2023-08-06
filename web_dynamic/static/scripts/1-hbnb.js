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
});
