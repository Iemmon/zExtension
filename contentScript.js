(function () {

    const seriesObject = getSeriesFromDOM(document);
    console.log(seriesObject);
        let savedSeries = new Array();
        // chrome.storage.sync.clear(function(){
        //     console.log("cleared");
        // });

        const checkName = function (element) {
            return element.name == seriesObject.name;
        }

        //display this series if newEpisode equal true
        const checkEpisode = function (element) {
            element.newEpisode = element.lastEpisode != seriesObject.lastEpisode;
            return element.newEpisode;
        }

        chrome.storage.sync.get({ 'series': [] }, function ({ series: result }) {

            const button = document.createElement("button");
            button.innerText = "Added";
            button.disabled = true;

            if (!result.some(checkName)) {
                
                button.innerText = "Add to the list";
                button.disabled = false;
                //update array if this element is absent

                button.onclick = function () {
                    savedSeries = [seriesObject, ...result];
                    chrome.storage.sync.set({ 'series': savedSeries }, function () {
                        console.log("array updated");
                    });
                    button.innerText = "Added";
                    button.disabled = true;
                }
                

            } 
            document.querySelector("h1").appendChild(button);
           
        });
        

    

})();