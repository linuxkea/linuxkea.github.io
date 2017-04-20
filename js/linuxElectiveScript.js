// Global variable for the json data recives from google sheet
var jsondata;

// For global use of div id data
var divElementData = "";

// ID of the Google Spreadsheet
var spreadsheetID = "1h4hc5PDMLunO_JdpYvYXc4qAGbnjfVXFyYQ9CDl6fu8";

// Check for the various File API support.
function checkFileAPI() {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
        reader = new FileReader();
        return true;
    } else {
        alert('The File APIs are not fully supported by your browser. Fallback required.');
        return false;
    }
}

function readSheet() {

    var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
    //console.log(url);
    $.getJSON(url, function(data) {
        if (typeof(data) == null) {
            console.log("Data == null");
        }
        //console.log(data.feed.entry);
        jsondata = data.feed.entry;
        //console.log("data.feed.entry added to jsondata global variable")
        //console.log(jsondata);
        //console.log("Going to feedExtraction");
        feedExtraction();
        //console.log("div element data");
        //console.log(divElementData);
        var header = '<div class="container">' +
            '<div class="page-header">' +
            '<h2>' +
            'Schedule 3. Semester International Network' +
            '</h2>' +
            '</div>' +
            '</div>';
        document.getElementById('content').innerHTML = header + '<br />' + divElementData;
    });
}

function feedExtraction() {
    //console.log(jsondata);
    if (jsondata != null) {
        // The feed entries is allocated to data variable
        var data = jsondata;
        var weekData = [];
        //console.log(data);
        var counter = 0;
        //console.log(data.length);
        for (var i = 0; i < data.length; i++) {
            weekData[counter] = data[i];
            // get week data by search for week in the WeekChange colon

            if (data[i].gsx$weekchange.$t === "week") {
                //console.log("A hole Week");
                //console.log(weekData);
                weekDataExtraction(weekData);
                weekData = [];
                counter = 0;
            } else {
                counter++;
            }
        }
    }
}

// take a hole week array and use it to make a week table piece
function weekDataExtraction(week) {
    //console.log("week data");
    addTableTag();
    //console.log("loop");
    //console.log(week.length);
    for (var i = 0; i < week.length - 1; i++) {
        // send row number and Object to new method
        //console.log("Going to extractRowData()");
        extractRowData(week[i], i + 1);
    }
    endTableTag();
}

// var firstRun = true;

function extractRowData(object, rowNumber) {
    //console.log("extract row data");
    //console.log(object);
    if (rowNumber === 1) {
        addTableHeadTag();
        divElementData += '<tr>' +
            '<td>' +
            '<h2>' + object.gsx$allweeks.$t + '</h2>' +
            '</td>' +
            '</tr>';
        endTableHeadTag();

    } else {
        addTableBodyTag();

        divElementData += '<tr>' +
            '<td>' +
            object.gsx$allweeks.$t +
            '</td>' +
            '<td>' +
            object.gsx$monday.$t +
            '</td>' +
            '<td>' +
            object.gsx$tuesday.$t +
            '</td>' +
            '<td>' +
            object.gsx$wednesday.$t +
            '</td>' +
            '<td>' +
            object.gsx$thursday.$t +
            '</td>' +
            '<td>' +
            object.gsx$friday.$t +
            '</td>' +
            '</tr>';
        endTableBodyTag();
        //console.log(divElementData);
    }
}

function addTableTag() {
    //console.log("add table tag");
    divElementData += '<table class="table table-hover" style="border: 1px solid black">';
}

function endTableTag() {
    divElementData += '</table>';
}

function addTableHeadTag() {
    divElementData += '<thead>';
}

function endTableHeadTag() {
    divElementData += '</thead>';
}

function addTableBodyTag() {
    divElementData += '<tbody>';
}

function endTableBodyTag() {
    divElementData += '</tbody>';
}