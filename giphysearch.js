const APIKEY = "YOUR_API_KEY_HERE";

//Search Funciton
document.addEventListener("DOMContentLoaded", init);

function init() {
    document.getElementById("btnSearch").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page reload
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${APIKEY}&limit=5&q=`;
        let str = document.getElementById("search").value.trim();

        if (str == "") {
            alert("Sorry, you can't leave the text field blank. Please try again or select 'Show me a random gif.'")
        }

        url = url.concat(str);
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(content => {
                //  data, pagination, meta
                console.log(content.data);
                console.log("META", content.meta);
                let fig = document.createElement("figure");
                let img = document.createElement("img");
                let fc = document.createElement("figcaption");
                img.src = content.data[0].images.downsized.url;
                img.alt = content.data[0].title;
                fc.textContent = content.data[0].title;
                fig.appendChild(img).style.maxWidth = "100%";

                let out = document.querySelector(".out");
                out.insertAdjacentElement("afterbegin", fig);
                document.querySelector("#search").value = "";
            })
            .catch(err => {
                console.error(err);
            });
    });
}

//Random Gif Function

document.addEventListener("DOMContentLoaded", randomGif);

function randomGif() {
    document.getElementById("btnRandom").addEventListener("click", ev => {
        ev.preventDefault(); //to stop the page reload
        let url = `https://api.giphy.com/v1/gifs/random?api_key=${APIKEY}&tag=&rating=g`;
        console.log(url);
        fetch(url)
            .then(response => response.json())
            .then(content => {
                //  data, pagination, meta
                console.log(content.data);
                console.log("META", content.meta);
                let fig = document.createElement("figure");
                let img = document.createElement("img");
                let fc = document.createElement("figcaption");
                img.src = content.data.images.downsized.url;
                img.alt = content.data.title;
                fc.textContent = content.data.title;
                fig.appendChild(img).style.maxWidth = "100%";

                let out = document.querySelector(".out");
                out.insertAdjacentElement("afterbegin", fig);
                document.querySelector("#search").value = "";
            })
            .catch(err => {
                console.error(err);
            });
    });
}

//Reset form
function resetForm() {
    document.getElementById("btnReset").reset();
    document.getElementByClass('out').innerHTML = ('')
}