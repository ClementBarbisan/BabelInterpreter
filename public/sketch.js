/**
 * Created by Clément on 10/02/2019.
 */
var page = "";
function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
function setup()
{
    console.log("test");
    createCanvas(80, 40);
    background(0);
    noSmooth();
    for (var i = 0; i < 80; i++)
    {
        for (var j = 0; j < 40; j++)
        {
            stroke(page[80 * i + j]);
            point(i, j);
        }
    }
}

function draw()
{

}

/*httpGetAsync("/page?search=libraryofbabel", function(data)
{
    page = data;
    Setup();

});*/