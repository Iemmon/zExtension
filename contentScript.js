(function(){

    const element = document.querySelector("h1 span[itemprop^='name']");
    const seriesName = element.innerText;

    console.log(element);
    console.log(seriesName);
    if(element != null){
        const listElements = document.querySelectorAll("div.season-list tr");
        const link = document.querySelector("#dle-content > ul > div > div.conteiner > div.left-material > div:nth-child(7) > span").innerText;
        console.log(link);
        let arr = new Array();
        for(let el of listElements){
            //console.log(el);

            const tds = el.querySelectorAll("td");
            arr.push({
                name: tds[2].innerText,
                date: tds[3].innerText,
                daysLeft: tds[4].innerText,
                episodeNum: tds[1].innerText
            });
        }
        let savedSeries = new Array();
        let lastEpisodeReleased = null;
        let seriesObject = null;
        for(let el of arr){
            if(el.date != "—" && el.daysLeft == ""){
                lastEpisodeReleased = el.episodeNum;
                seriesObject = {
                    name: seriesName,
                    lastEpisode: lastEpisodeReleased,
                    newEpisode: false,
                    link: link

                };
                console.log(el);
                break;
            }
        }
        // chrome.storage.sync.clear(function(){
        //     console.log("cleared");
        // });
        chrome.storage.sync.get({'series':[]}, function({series: result}){
            //first option
            /*
            if(result == null){
                savedSeries.push(seriesObject);
                chrome.storage.sync.set({'series' : savedSeries}, function(){
                    console.log("Created new array with objects");
                });
            } else {
                result.push(seriesObject);
                chrome.storage.sync.set({'series' : result}, function(){
                    console.log("New series added");
                })
            }
            console.log("result: ");
            console.log(result);
            */

            //second option
            /*
            let storedSeries = result||[];
            storedSeries.push(seriesObject);
            chrome.storage.sync.set({'series' : storedSeries}, function(){
                console.log("array updated");
            });
            */

            //third option
            //console.log(result.indexOf(seriesObject));
            for(let i = 0; i < result.length-1; i++){

            }
            const checkName = function(element){
                return element.name == seriesObject.name;
            }
            const checkEpisode = function(element){
                element.newEpisode = element.lastEpisode != seriesObjecti.lastEpisode;
                return element.newEpisode;
            }

            //display this series if newEpisode equal true
             
            if(!result.some(checkName)){
                //update array if this element is absent
                savedSeries = [seriesObject, ...result];
                chrome.storage.sync.set({'series' : savedSeries}, function(){
                    console.log("array updated");
                });
                
            } else {
                console.log("element is present");
            }
            //change seriesObject.newEpisode to false if the field with this series is ckicked at the extension window
            console.log(result);
        });
        
        console.log(lastEpisodeReleased);
        console.log("From storage: ");
        

    }

})();