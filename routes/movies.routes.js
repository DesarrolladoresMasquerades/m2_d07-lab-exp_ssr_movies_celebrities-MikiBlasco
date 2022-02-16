// starter code in both routes/celebrities.routes.js and routes/movies.routes.js
const router = require("express").Router();
const Movie = require("../models/movie.model");
const Celebrity = require("../models/Celebrity.model");


router.get("/movies/create", (req, res) =>{

    Celebrity.find()
    .then((dbCeleb) => {
      res.render("movies/new-movie", { dbCeleb });
    })
    .catch((err) => console.log(`Err while displaying post input page: ${err}`));

});
    
    

router.post("/movies/create", (req, res) => 
{
    const { title, genre, plot, cast } = req.body;

          Movie.create({ title, genre, plot, cast })
          .then(() => res.redirect('/movies'))         
          //.catch((err) => console.log(`Error while creating a new user: ${err}`))
          
});

router.get("/movies", (req, res) => {
    Movie.find()
    .then((movies)=>{
        res.render("movies/movies", {movies} )
    })
});


router.get("/movies/:id", (req, res) => {
    Movie.findById(req.params.id)
    .populate("cast")
    .then((movie)=>{
        res.render("movies/movie-details", movie)
    })
    }

);

module.exports = router;