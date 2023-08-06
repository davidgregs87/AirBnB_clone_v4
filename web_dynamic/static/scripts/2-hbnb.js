// jQuery AJAX;

$(document).ready(function () {
    // Amenities event listener - OnCheck
    const amenities = {};

    function amenityListener() {
        const checkedAmenities = Object.values(amenities).join(', ');
        $('.amenities > h4').text(checkedAmenities);
    }

    $('.amenities input[type="checkbox"]').on('change', function () {
        const $checkbox = $(this);
        const id = $checkbox.parent().data('id');
        const name = $checkbox.parent().data('name');

        if ($checkbox.is(':checked')) {
            amenities[id] = name;
        } else {
            delete amenities[id];
        }

        amenityListener();
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
});