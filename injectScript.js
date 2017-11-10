var pageStored = false;
console.log("Content Script");
var getLink = function (tag) {
    if(!pageStored) {
        //pageDone = true;
        var links = [].slice.apply(document.getElementsByTagName(tag));
        links = links.map(function (element) {
            var href = element.href;
            var hashIndex = href.indexOf('#');
            if (hashIndex >= 0) {
                href.substr(0, hashIndex);
            }
            return href;
        });
        links.sort();
        for (var i = 0; i < links.length; i++) {
            console.log("Content_Script: " + links[i]);/* '<a href = "' + (links[i]) + '">' + (links[i]) + '</a>';
            box.innerText += '<br>';*/
        }
    }
}
getLink("link");
getLink("a");
