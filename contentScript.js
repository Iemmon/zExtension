(function(){

    const element = document.querySelector("h1 span[itemprop^='name']");
    const seriesName = element.innerText;

    console.log(element);
    console.log(seriesName);
    if(element != null){
        const listElements = document.querySelectorAll("div.season-list tr");
        
        let arr = new Array();
        for(let el of listElements){
            //console.log(el);

            const tds = el.querySelectorAll("td");
            arr.push({
                name: tds[2].innerText,
                date: tds[3].innerText,
                daysLeft: tds[4].innerText
            });
        }
        let savedSeries = new Array();
        let lastEpisodeReleased = null;
        let seriesObject = null;
        for(let el of arr){
            if(el.date != "—" && el.daysLeft == ""){
                lastEpisodeReleased = el;
                seriesObject = {
                    name: seriesName,
                    lastEpisode: lastEpisodeReleased
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
            console.log(result.indexOf(seriesObject));
            for(let i = 0; i < result.length-1; i++){

            }
            const check = function(element){
                return element.name == seriesObject.name;
            }
            
            if(!result.some(check)){
                savedSeries = [seriesObject, ...result];
                chrome.storage.sync.set({'series' : savedSeries}, function(){
                    console.log("array updated");
                });
                
            } else {
                console.log("element is present");
            }
            console.log(result);
        });
        
        console.log(lastEpisodeReleased);
        console.log("From storage: ");
        

    }

})();