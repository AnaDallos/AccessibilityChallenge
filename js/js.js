let parent = document.querySelector("nav");
var nonSelectedCitiesDropdown = '';
parent.addEventListener("click", switchTab, false);
parent.addEventListener('keypress', function (e) {
    var key = e.which || e.keyCode;
    if (key === 13) {
        switchTab(e);
    }
});


function getListOfPlaces(){
    const listofPlaces = [
        { name: "St. Petersburg", id: "LED", isSelected: false },
        { name: "Atlanta", id: "ATL", isSelected: false },
        { name: "Denver", id: "DEN", isSelected: false },
        { name: "Los Angeles", id: "LAX", isSelected: false },
        { name: "Chicago", id: "ORD", isSelected: false },
        { name: "San Francisco", id: "SFO", isSelected: false },
        { name: "New York", id: "JFK", isSelected: false },
    ];
    return listofPlaces
}

function switchTab(e) {
    if (e.target != e.currentTarget) {
        let clickedItem = e.target.id;
        let listofOptions = [""];

        listofPlaces = getListOfPlaces();

        console.clear();

        let domPath;

        domPath = assignDOMpathfromBrowser(detectBrowser(), e);


        (Array.from(domPath)).map((typeofQuery) => {
            listofOptions.push(typeofQuery);
        });

        listofOptions.shift();

        document.querySelector('.search-content').innerHTML = `Tab #selected is ${clickedItem}`;
        
        resetAllAriaSelected(listofOptions);
        injectOptionHtml(e, listofPlaces, listofOptions);
    }
    

}

function injectOptionHtml(e, listofPlaces){
    let html = "";
    switch (e.target.id) {
        case 'ticket':
            domPath[0].setAttribute('aria-selected', true);
            fillSearchContentTicket(listofPlaces);
            
            break;
        case 'hotel':
            domPath[1].setAttribute('aria-selected', true);
            break;
        case 'carRental':
            domPath[2].setAttribute('aria-selected', true);
            break;
        case 'insurance':
            domPath[3].setAttribute('aria-selected', true);
            break;
        }
}

function fillSearchContentTicket(listofPlaces) {

    let html='';

    fillOriginCityDropdown(listofPlaces, html);
    
    

    html += `<div class="departure">
    
    <input type="date" id="input5" name="departure-date" title="title attribute" aria-label="Choose the date of your flight" aria-invalid="false" placeholder="Flight Date" required>
    </div>
    </div>`
    //console.log(html);
    document.querySelector('.new-flight').innerHTML += html;
    
    console.log(listofPlaces);
    
}

function fillOriginCityDropdown(listofPlaces, html){
    html = `<br>
    <div class="new-flight">
        <div class="flight-airports">
            <div class="flight-origin ">
            <select name="select" id="select-origin" onchange="validateOrigin()" aria-label="Choose the origin of your flight" required> `

    listofPlaces.map((city) => {
    html += `<option value="${city.name}">${city.name}</option>` 
    });


    html += `</select>
        </div>`

    html += `<br>
        <div class="flight-destination">
        <select name="select" id="select-destination" onchange="validateOrigin()" aria-label="Choose the destination of your flight"> `

    listofPlaces.map((city) => {
    html += `<option value="${city.name}">${city.name}</option>` 
    });


    html += `</select>
        </div>
    </div> </div>`
    
    document.querySelector('.search-content').innerHTML += html;
    
}

function detectBrowser() {
    let browsers = [""];

    const winNav = window.navigator;
    // Firefox 1.0+
    const isFirefox = typeof InstallTrigger !== 'undefined';
    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1+
    const isChromium = window.chrome;
    const vendorName = winNav.vendor;
    const isOpera = typeof window.opr !== "undefined";
    const isIEedge = winNav.userAgent.indexOf("Edge") > -1;
    let isChrome = "false";

    let browser = "";

    if (
        isChromium !== null &&
        typeof isChromium !== "undefined" &&
        vendorName === "Google Inc." &&
        isOpera === false &&
        isIEedge === false
    ) {
        isChrome = true;
    }



    browsers = [isFirefox, isEdge, isChrome];

    console.log(browsers.join());


    switch (browsers.join()) {
        case "true,false,false":
            return "Firefox";
            break;
        case "false,true,false":
            return "Edge";
            break;
        case "false,false,true":
            return "Chrome";
            break;
    }

    

}

function assignDOMpathfromBrowser(browser, e) {
    switch (browser) {
        case "Firefox":
            domPath = e.explicitOriginalTarget.parentNode.parentElement.children;
            console.log('is Firefox');
            break;
        case "Edge":
            domPath = e.
                console.log('isEdge');
            break;
        case "Chrome":
            domPath = e.path[1].querySelectorAll('a');
            console.log('isChrome');
            break;
    }
    return domPath;
}

function resetAllAriaSelected(listofOptions){
    listofOptions.map((x) => { x.setAttribute('aria-selected', false) });
}

function validateOrigin(){
    
    let origin = document.getElementById('select-origin').value;
    let listofPlaces = getListOfPlaces();

    listofPlaces.map((newOriginResetter)=>{
        newOriginResetter.isSelected = false;
    })
    

    listofPlaces.find((place)=> {
        place.name === origin ? place.isSelected = true : '';
    });

    nonSelectedCitiesDropdown = fillNonSelectedCitiesDropdown(listofPlaces);



    let html =`
    
    <select name="select" id="selectFlightOrigin" onchange="" aria-label="Choose the destination of your flight">`
        
    
    nonSelectedCitiesDropdown.map((city) => {
        html += `<option value="${city.name}">${city.name}</option>` 
    });


    document.querySelector('.flight-destination').innerHTML = html;
    
}

function fillNonSelectedCitiesDropdown(listofPlaces) {
    
    let nonSelectedCitiesDropdown = listofPlaces.filter((nonSelectedCity) => {
        return nonSelectedCity.isSelected == false;
        
    });
    
    console.log(nonSelectedCitiesDropdown);
    
    return nonSelectedCitiesDropdown;

    
}