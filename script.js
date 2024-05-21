import NEWS_API from "./apikey.js";
const url = "https://newsapi.org/v2/everything?q=";

function reload() {
  window.location.reload();
}

async function fetchNews(query) {
  const response = await fetch(`${url}${query}&apiKey=${NEWS_API}`);
  const data = await response.json();
  bindData(data.articles);
}

//bind atricles
function bindData(articles) {
  const cardcontainer = document.getElementById("card-container");
  const newsCardTemp = document.getElementById("template-news-card");
  cardcontainer.innerHTML = "";

  articles.forEach((article) => {
    //display all articles on home page
    if (!article.urlToImage) return;
    const cardClone = newsCardTemp.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardcontainer.appendChild(cardClone);
  });
}

//embed articles on the page
function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector("#news-img");
  const newstitle = cardClone.querySelector("#news-title");
  const newssource = cardClone.querySelector("#news-source");
  const newdesc = cardClone.querySelector("#news-desc");

  newsImg.src = article.urlToImage;
  newstitle.innerHTML = article.title;
  newdesc.innerHTML = article.description;

  const date = new Date(article.publishedAt).toLocaleString("en-US", {
    timeZone: "Asia/Jakarta",
  });

  newssource.innerHTML = `${article.source.name} • ${date}`;

  //open the article
  cardClone.firstElementChild.addEventListener("click", () => {
    window.open(article.url, "_blank");
  });
}

//event listener to nav items
let currentSelectedNav = null;
let x = document.querySelectorAll(".nav-item").forEach((e) => {
  e.addEventListener("click", (item) => {
    var query = item.target.innerHTML;
    currentSelectedNav?.classList.remove("active-class");
    item.target.classList.add("active-class");
    currentSelectedNav = item.target;

    // console.log(query);
    // console.log(item.target.classList);
    fetchNews(query);
  });
});

//search query
document.querySelector("#search-button").addEventListener("click", () => {
  currentSelectedNav?.classList.remove("active-class");
  var query = document.querySelector("#input").value;
  if (!query) return;
  fetchNews(query);
});

window.addEventListener("load", () => {
  fetchNews("india");
});
