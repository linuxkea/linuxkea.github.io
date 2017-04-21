// Global variable for the json data recives from google sheet
var datajson;

// For global use of div id data
var data = "";

// ID of the Google Spreadsheet
var lessonSpreadsheetID = "1GLMhpBRmnZSzTMQWHe4RLT25_cOLHiqtu12xLeAxDyU";

/* For reading the lessons google sheet */
function readLessons() {
    console.log("Inside read lessones");
    var url = "https://spreadsheets.google.com/feeds/list/" + lessonSpreadsheetID + "/od6/public/values?alt=json";
    //console.log(url);
    $.getJSON(url, function(data) {
        if (typeof(data) == null) {
            console.log("Data == null");
        }
        //console.log(data.feed.entry);
        jsondata = data.feed.entry;
        console.log(jsondata);
    });
}