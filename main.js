const api_url = "http://localhost:8000/api/v1/titles/"

// global variable
const moviesPerCategory = 7

// fill the categories elements with the appropriate names
function fillTitle(category, categoryName) {
    let titleElement = document.getElementById(category + "-title");
    titleElement.textContent += categoryName;
}

// carousel display with prev/next btn
carousel = function(id) {
    let carousel = document.getElementById(id + '-carousel');
    let prevBtn = document.getElementById(id + '-btn-prev');
    let nextBtn = document.getElementById(id + '-btn-next');
    let count = 0;

    function slideImages(dir){
        let totalChildren = moviesPerCategory;
        dir === "left" ? ++count : --count;
        carousel.style.left = count * 190 + 'px';
        prevBtn.style.display = count < 0 ? "block" : "none";
        nextBtn.style.display = count > 4-totalChildren ? "block" : "none";
      }

    prevBtn.addEventListener("click", function() {
          slideImages("left");
        });
    nextBtn.addEventListener("click", function(e) {
          slideImages("right");
        });
    };

// modal for the highlighted movie
function modalBest() {
    const bestMovieInfoButton = document.getElementById("info-btn");
    bestMovieInfoButton.onclick = function () {
        let modal = modalDisplay();
        modal.style.display = "block";
        getMovieInfos(this.id);
    };
}

// modals for carousel items
function modalCarousel() {
    for (let i = 0; i < document.getElementsByClassName("carousel-img").length; i++) {
        document.getElementsByClassName("carousel-img")[i].onclick = function () {
            let modal = modalDisplay();
            modal.style.display = "block";
            getMovieInfos(document.getElementsByClassName("carousel-img")[i].id);
        };
    }
}

// close modal element
function modalDisplay() {
    const modal = document.getElementById("modal-container");
    //close btn
    const button = document.getElementsByClassName("modal-close-btn")[0];
    button.onclick = () => {
        modal.style.display = "none";
    };
    return modal;
}

// get movies datas
function getHighlightedMovieInfos(id) {
    fetch(api_url + id)
        .then(response => response.json())
        .then(json => {
            document.getElementById("best-img").setAttribute("src", json.image_url);
            document.getElementById("info-btn").id = json.id;
            document.getElementById("best-long_description").innerHTML = json['long_description'];
            document.getElementById("best-title").innerHTML = json['title']
        })
}


function getMovieInfos(id) {
    fetch(api_url + id)
        .then(response => response.json())
        .then(json => {
            document.getElementById("modal-img").setAttribute("src", json.image_url);
            let infos = ["title", "long_description", "genres", "date_published", "rated", "imdb_score", "directors", "actors", "duration", "countries", "reviews_from_critics", "worldwide_gross_income"];
            for (var info of infos) {
                var text = json[info] === null ? 'Unknown' : json[info]
                if (info == 'title') {
                    var textInfo = ''
                }
                else {
                var textInfo = info === 'long_description' ? '<b>description:</b>' : '<b>' + info.replaceAll('_', ' ') + ':</b>'
            }
            document.getElementById("modal-" + info).innerHTML = textInfo + text;}
            })
}

// create carousel imgs
function createImgsElements(movies, category) {
    for (movie of movies.slice(0, moviesPerCategory)) {
        const div = document.createElement("div");
        div.classList.add('item-container');
        const img = document.createElement("img");
        img.id = movie[0];
        img.src = movie[1];
        img.className = "carousel-img";
        const link = document.createElement("a");
        link.href = "#";
        link.appendChild(img);
        div.appendChild(link)
        let carousel = document.getElementById(category + "-carousel");
        carousel.appendChild(div);
    }
}

// fetch movies datas
function getMovies(url, category, nbrofmovies = 0, movies = []) {
    fetch(url)
        .then(response => response.json())
        .then(json => {
            for (item of json.results) {
                movies.push([item.id, item.image_url])
            }
            if (nbrofmovies < moviesPerCategory) {
                getMovies(json.next, category, nbrofmovies + movies.length, movies=movies)
                return []
            }
            return movies;
        })
        .then(movies => {
            if (movies.length > 0) {
                createImgsElements(movies, category)
                if (category == "best-rating") {
                    getHighlightedMovieInfos(movies[0][0]);
                }
                modalCarousel();
            }})
        }

function main() {
    var categories = {};
    var categories = {
        'best-rating': '',
        'first-category': 'Action',
        'second-category': 'Drama',
        'third-category': 'Mystery'
    };
    for (var category in categories) {
        if (category == 'best-rating') {
            getMovies(api_url + "?sort_by=-imdb_score", category);
            modalBest();
        }
        else {
            fillTitle(category, categories[category])
            getMovies(api_url + "?sort_by=-imdb_score&genre_contains=" + categories[category], category);
        }
        carousel(category)
    }
}
main();