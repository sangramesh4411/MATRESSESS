<?php
$servername = "localhost";
$username = "root";  // your db username
$password = "";      // your db password
$dbname = "mattress_store";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
let map;
let geocoder;
let marker;
let addressInput;

function initMap() {
    // Create a new map centered around a default location (e.g., New York City)
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 40.7128, lng: -74.0060 }, // Default center (New York)
        zoom: 14
    });

    // Set up geocoder to convert address to lat/lng
    geocoder = new google.maps.Geocoder();

    // Enable Places API for searching locations
    addressInput = document.getElementById("location-input");
    const autocomplete = new google.maps.places.Autocomplete(addressInput);
    autocomplete.setFields(["address_component", "geometry"]);
    autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
            window.alert("No details available for the selected place.");
            return;
        }

        // Move map center and drop marker at selected location
        map.setCenter(place.geometry.location);
        map.setZoom(14);
        if (marker) marker.setMap(null); // Remove previous marker
        marker = new google.maps.Marker({
            position: place.geometry.location,
            map: map,
        });

        // Set the form input with the address
        const formattedAddress = place.formatted_address;
        document.querySelector('textarea[name="address"]').value = formattedAddress;
    });
}

// Initialize Google Maps
google.maps.event.addDomListener(window, 'load', initMap);