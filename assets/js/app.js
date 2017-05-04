$(document).on("ready", function() {

    var config = {
        apiKey: "AIzaSyBslIrJQyowzrD7YzS6YDxzDGbJodJSzNg",
        authDomain: "crazytrain-83dee.firebaseapp.com",
        databaseURL: "https://crazytrain-83dee.firebaseio.com",
        projectId: "crazytrain-83dee",
        storageBucket: "crazytrain-83dee.appspot.com",
        messagingSenderId: "462699708397"
    };
    firebase.initializeApp(config);

    var database = firebase.database();

    $("submitTrain").on("click", function() {

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var startTime = $("#startTime").val().trim();
        var frequency = $("#frequency").val().trim();

        var newtrain = {
            name: trainName,
            destination: destination,
            firstTrain: startTime,
            frequency: frequency,
        }

        trainData.ref().push(newTrain);

    });

});
