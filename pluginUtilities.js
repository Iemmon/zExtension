function getSeriesFromDOM(document){
    let seriesName = document.querySelector("h1 span[itemprop^='name']");
    if (seriesName == null) return;
    seriesName = seriesName.innerText;
    let seriesObject = null;

    const link = document.querySelector("#dle-content > ul > div > div.conteiner > div.left-material > div:nth-child(7) > span").innerText;

    let arrayOfEpisodes = new Array();
    const listOfEpisodes = document.querySelectorAll("div.season-list tr");
    for (let el of listOfEpisodes) {
    
        const episodeData = el.querySelectorAll("td");
        let episode = {
            episodeNum: episodeData[1].innerText,
            date: episodeData[3].innerText,
            daysLeft: episodeData[4].innerText
        };

        if (episode.date != "—" && episode.daysLeft == "") {
            let lastEpisodeReleased = episode.episodeNum;
            seriesObject = {
                name: seriesName,
                lastEpisode: lastEpisodeReleased,
                newEpisode: false,
                link: link
            };
            console.log(seriesObject);
            break;
        }
        // 0 - season
        // 1 - episode
        // 2 - episode name
        // 3 - date
        // 4 - days left
    }

    return seriesObject;
};