// Global variable for the json data recives from google sheet
var json;

// For global use of div id data
var data = "";

// ID of the Google Spreadsheet
var lessonSpreadsheetID = "1GLMhpBRmnZSzTMQWHe4RLT25_cOLHiqtu12xLeAxDyU";

/* For reading the lessons google sheet */
function readLessons() {
    data = "";
    console.log("Inside read lessones");
    var url = "https://spreadsheets.google.com/feeds/list/" + lessonSpreadsheetID + "/od6/public/values?alt=json";
    //console.log(url);
    $.getJSON(url, function(data1) {
        if (typeof(data1) == null) {
            console.log("Data == null");
        }
        //console.log(data.feed.entry);
        json = data1.feed.entry;
        //console.log(json);
        addTableTagData();
        // table inside
        extractDataFromJson();
        endTableTagData();
        // homepage header
        var header = '<div class="container">' +
            '<div class="page-header">' +
            '<h2>' +
            'Material for next class' +
            '</h2>' +
            '</div>' +
            '</div>';
        //console.log(data);        
        document.getElementById('content').innerHTML = header + data;
    });
}

function extractDataFromJson() {
    console.log('Extract data from json');
    console.log(json);
    var dayData = [];
    for (var i = 0; i < json.length; i++) {
        // data extraction
        extractFromRow(json[i], i + 1);

    }
}

function extractFromRow(row, rowNumber) {
    console.log("row extract");
    console.log(row);
    console.log(rowNumber);
    if (rowNumber === 1) {
        console.log(row.gsx$day.$t);
        addTableHeadTagData();
        data += '<tr>' +
            '<td>' + 'Day' + '</td>' +
            '<td>' + 'Subject' + '</td>' +
            '<td>' + 'Information' + '</td>' +
            '<td>' + 'Link' + '</td>' +
            '</tr>';
        console.log(data);
        endTableHeadTagData();
    }
    var color = "";
    var dayNumber = row.gsx$day.$t;
    dayNumber = parseInt(dayNumber);
    console.log('day number');
    console.log(dayNumber);
    if (dayNumber % 2 == 0) {
        color = "color:green";
        console.log('modulus 0');
    } else {
        color = "color:grey";
        console.log('modulus 1');
    }
    addTableBodyTagData();
    data += '<tr style="' + color + '">' +
        '<td>' + row.gsx$day.$t + '</td>' +
        '<td>' + row.gsx$subject.$t + '</td>' +
        '<td>' + row.gsx$linkinformation.$t + '</td>' +
        '<td>' + '<a href="' + row.gsx$link.$t + '">' + row.gsx$link.$t + '</td>' +
        '</tr>';
    endTableBodyTagData();


}

// Tag for a bootstrap table
function addTableTagData() {
    //console.log("add table tag");
    data += '<table class="table table-hover" style="border: 1px solid black">';
}

function endTableTagData() {
    data += '</table>';
}

function addTableHeadTagData() {
    data += '<thead>';
}

function endTableHeadTagData() {
    data += '</thead>';
}

function addTableBodyTagData() {
    data += '<tbody>';
}

function endTableBodyTagData() {
    data += '</tbody>';
}