const input = document.getElementById("url");
const submit = document.getElementById("submit");
const urlList = document.getElementById("urlList");
urlList.style.display = "none"; 
const shortenURLS = new Map();

function createAnchorTags(newUrl) {
    const anchorTagContainer = document.getElementById('anchorTagContainer');
    const anchorTag = document.createElement('a');
    anchorTag.href = shortenURLS.get(newUrl);
    anchorTag.textContent = newUrl;
    anchorTag.style.color = "blue";
    anchorTag.style.fontSize = "25px";
    anchorTag.style.padding = "10px";
    urlList.style.display = "block";
    anchorTagContainer.appendChild(anchorTag);
    anchorTagContainer.appendChild(document.createElement('br'));
}

async function shortenTheURL(urlToConvert) {
    const apiUrl = `https://api.shrtco.de/v2/shorten?url=${urlToConvert}`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.result.full_short_link;
      } catch(e){
        alert(e);
      }  
}

async function sendRequest(longURL) {
    try {
        const response = await fetch("https://csclub.uwaterloo.ca/~phthakka/1pt/addURL.php?url="+longURL+"&cu=");
        const data = await response.json();
        return `1pt.co/${data.short}`;
    } catch (err) {
        console.log(err);
    }
}

submit.onclick = async function() {
    if (input.value !== "" && validateURL(input.value)) {
        const key = await sendRequest(
                input.value
            );
        shortenURLS.set(key, input.value);
        createAnchorTags(key);
    } else {
        alert('Please enter a valid URL and try again!');
    }
};

const validateURL = (url) => {
    var regex = new RegExp(
        /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,}(:[0-9]{1,5})?(\/.*)?$/g
    );

    if (regex.test(url)) {
        return true;
    } else {
        return false;
    }
};