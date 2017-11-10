console.log("Popup Script");

//====================== UPDATE 2.0 =======================//
/*window.onload = function () {
    var chkBox = document.getElementById('checkBoxToggle');
    var alertCollecting = document.getElementById('alertCollecting');
    var alertNotCollecting = document.getElementById('alertNotCollecting');
    chkBox.onclick =  function () {
        if(this.checked){
            alertCollecting.style.display = 'block';
            alertNotCollecting.style.display = 'none';
        }
        else{
            alertCollecting.style.display = 'none';
            alertNotCollecting.style.display = 'block';
        }
    }
}*/

//===================== UPDATE 1.1 ========================//
window.onload = function () {
    checkAlert();
    checkToggle();
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
        init(tabId);
    });
    function init(tabId){
        chrome.storage.sync.get("enabledExtension", function (item) {
            if(item['enabledExtension'] == true){//Run content Script
                console.log("Popup: Executing content Script");
                chrome.tabs.executeScript(tabId, {
                    file: "injectScript.js",
                    allFrames: true,
                    runAt: "document_end"
                });
            }
        })
    }
    function checkToggle() {
        var chkToggle = document.querySelector("input[id=checkBoxToggle]");

        chkToggle.addEventListener('change', function () {
            if(this.checked){
                saveSettings(true);
                init();
            }
            else{
                saveSettings(false);
            }
            checkAlert();
        })
    }
    function saveSettings(choice) {
        chrome.storage.sync.set({'enabledExtension': choice}, function () {
            console.log("Settings saved: " + choice + ", Please Refresh for changes to take affect.");
        });
    }
    function checkAlert() {
        chrome.storage.sync.get("enabledExtension", function (item){
            var checkBox = document.getElementById('checkBoxToggle');
            var alertCollecting = document.getElementById('alertCollecting');
            var alertNotCollecting = document.getElementById('alertNotCollecting');
            var choice = item['enabledExtension'];
            checkBox.checked = choice;
            console.log("Stored Data: " + choice);
            if(choice == true){
                alertCollecting.style.display = 'block';
                alertNotCollecting.style.display = 'none';
            }
            else{
                alertCollecting.style.display = 'none';
                alertNotCollecting.style.display = 'block';
            }
        });
    }
}








//=================== UPDATE 1===================//

/*
console.log("Popup Script");
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    var chkToggle = document.getElementById('checkBoxToggle');
    chkToggle.onclick = function toggleCheckBox(){
        if(chkToggle.checked){
            chrome.storage.sync.set({'enabledExtension': true});
            saveSettings(true);


            /!*document.getElementById('alertNotCollecting').style.display = "none";
            document.getElementById('alertCollecting').style.display = "block";*!/
            chrome.tabs.executeScript(tabId, {
                file: "injectScript.js",
                allFrames: true,
                runAt: "document_end"
            });
        }
        else{
            saveSettings(false);
           /!* document.getElementById('alertCollecting').style.display = "none";
            document.getElementById('alertNotCollecting').style.display = "block";*!/
            document.getElementById('write').innerHTML = "";
        }
    }
});
/!*function saveSettings(enable) {
    chrome.windows.getAll({populate: true}, function (window_list) {
        var window = window_list[i];
        for(var j=0;j<window.tabs.length;j++){
            var tab = window.tabs[j];
            alert("Extension Disabled");
            if(enable == true)
                chrome.storage.sync.set({'enabledExtension': true});
            else
                chrome.browserAction.disable(tab.id);
        }
    })
}*!/


*/
