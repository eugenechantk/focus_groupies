const allElements = document.getElementsByTagName('*');

// Filter clickable elements
const clickableElements = [].filter.call(allElements, (element) => {
const tagName = element.tagName.toLowerCase();
const hasClickableRole = element.getAttribute('role') === 'button' || element.getAttribute('role') === 'link';
const clickableTags = ['a', 'button', 'input'];
const isClickableTag = clickableTags.includes(tagName);
const isClickableInput = tagName === 'input' && ['submit', 'button', 'reset', 'image'].includes(element.type);

return hasClickableRole || isClickableTag || isClickableInput;
});
var buttonsAndLinks = document.querySelectorAll('button, a[href]');
var items = [];
var globalIDcount = 0;
var bodysize = document.body.getBoundingClientRect();

for (e of buttonsAndLinks){
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
