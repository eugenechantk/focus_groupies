export const scrapeDOM = () => {
    var buttonsAndLinks = document.querySelectorAll('button, a[href]');
    var items = [];
    var globalIDcount = 0;
    var bodysize = document.body.getBoundingClientRect();
    
    for (var e of buttonsAndLinks){
        var temp_dict = {};
        temp_dict['bg-color'] = window.getComputedStyle(e).getPropertyValue("background-color");;
        temp_dict['href'] = e.href;
        temp_dict['content'] = e.innerText;
        if (e.id === ""){
            temp_dict['id'] = '' + globalIDcount;
            globalIDcount++;
        } else {    
            temp_dict['id'] = e.id;
        }
        temp_dict["color_text"] = window.getComputedStyle(e).getPropertyValue("color");
        temp_dict["size"] = {
            "h" :window.getComputedStyle(e).getPropertyValue("height"),
            "w" :window.getComputedStyle(e).getPropertyValue("width")
        };
        var rect = e.getBoundingClientRect();
        temp_dict["location"] = {
            "v" : rect.y*100/bodysize.height,
            "h" : rect.x*100/bodysize.width
        };
        items.push(temp_dict);
    }
    var j = JSON.stringify(items);
    chrome.storage.local.set({"items":j}).then(()=>{
        chrome.storage.local.get(["items"]).then((result)=>{
            console.log(result.items);
        });
    });
};
