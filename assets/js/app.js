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

    var trainData = firebase.database();

    $("#submitTrain").on("click", function() {

        var trainName = $("#trainName").val().trim();
        var destination = $("#destination").val().trim();
        var startTime = moment($("#startTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
        var frequency = $("#frequency").val().trim();

        var newTrain = {
            name: trainName,
            destination: destination,
            //will firstTrain throw it off?
            firstTrain: startTime,
            frequency: frequency,
        }

        trainData.ref().push(newTrain);

        console.log(newTrain.name)
        console.log(newTrain.destination)
        console.log(startTime)
        console.log(newTrain.frequency)

        $("#trainName").empty();
        $("#destination").empty();
        $("#startTime").empty();
        $("#frequency").empty();

        return false;


    });

    trainData.ref().on("child_added", function(childSnapshot, prevChildKey) {

        console.log(childSnapshot.val());

        var trainNameAppend = childSnapshot.val().name
        var destinationAppend = childSnapshot.val().destination
        var frequencyAppend = childSnapshot.val().frequency
        var firstTrainAppend = childSnapshot.val().firstTrain

        var timeDifference = moment().diff(moment.unix(firstTrainAppend), "minutes");

        var remainingTime = moment().diff(moment.unix(firstTrainAppend), "minutes") % frequencyAppend;
        var timeMinutes = frequencyAppend - remainingTime;


        var arrivalTime = moment().add(timeMinutes, "m").format("hh:mm A");
        console.log(arrivalTime)
        console.log(timeMinutes)

        console.log(moment().format("hh:mm A"))
        console.log(arrivalTime);
        console.log(moment().format("X"))

        $("#tableBody").append("<tr><td>" + trainNameAppend + "</td><td>" + destinationAppend + "</td><td>" + firstTrainAppend +  "</td><td>" + arrivalTime + "</td><td>" + timeMinutes + "</td></tr>")

    });

});
