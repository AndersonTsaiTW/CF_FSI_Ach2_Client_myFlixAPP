import React from "react";
import { useState } from "react";

import { MovieCard } from "../MovieCard/MovieCard";
import { MovieView } from "../MovieView/MovieView";

export const MainView = () => {
  const [ movies, setMovies ] = useState(
    [
    {"_id":{"$oid":"66286858ded157b056117b7f"},"Title":"Forrest Gump","Description":"The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.","Genre":{"Name":"Drama","Description":"Drama film is a genre that relies on the emotional and relational development of realistic characters to tell stories centered around realistic emotional themes."},"Director":{"Name":"Robert Zemeckis","Bio":"Robert Zemeckis is an American film director, producer, and screenwriter. He is known for his visual effects-heavy films, including the Back to the Future trilogy, Forrest Gump, and The Polar Express.","Birth":"1952","Death":null},"ImagePath":"https://m.media-amazon.com/images/M/MV5BNWIwODRlZTUtY2U3ZS00Yzg1LWJhNzYtMmZiYmEyNmU1NjMzXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg","Featured":false,"Actors":["Tom Hanks","Robin Wright"],"ReleaseYear":{"$numberInt":"1994"}},
    {"_id":{"$oid":"66286858ded157b056117b7e"},"Title":"The Godfather","Description":"The aging patriarch of an organized Sicily crime dynasty transfers control of his clandestine empire to his reluctant son.","Genre":{"Name":"Crime","Description":"Crime films, in the broadest sense, are a cinematic genre inspired by and analogous to the crime fiction literary genre."},"Director":{"Name":"Francis Ford Coppola","Bio":"Francis Ford Coppola is an American film director, producer, and screenwriter. He was a central figure in the New Hollywood filmmaking movement of the 1960s and 1970s.","Birth":"1939","Death":null},"ImagePath":"https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg","Featured":true,"Actors":["Marlon Brando","Al Pacino"],"ReleaseYear":{"$numberInt":"1972"}},
    {"_id":{"$oid":"66286858ded157b056117b7c"},"Title":"Silence of the Lambs","Description":"A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.","Genre":{"Name":"Thriller","Description":"Thriller film, also known as suspense film or suspense thriller, is a broad film genre that involves excitement and suspense in the audience."},"Director":{"Name":"Jonathan Demme","Bio":"Robert Jonathan Demme was an American director, producer, and screenwriter.","Birth":"1944","Death":"2017"},"ImagePath":"https://m.media-amazon.com/images/M/MV5BNjNhZTk0ZmEtNjJhMi00YzFlLWE1MmEtYzM1M2ZmMGMwMTU4XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg","Featured":true,"Actors":["John","Jenny"],"ReleaseYear":{"$numberInt":"1987"}}
  ]);

  const [ selectedMovie, setSelectedMovie ] = useState(null);
  if (selectedMovie) {
    return <MovieView movieData={selectedMovie} onBackClick={()=>setSelectedMovie(null)} />
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>
  } else {
    return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie._id.$oid} movieData={movie}
        onMovieClick = {(newSelectedMovie) => {
          console.log(newSelectedMovie);
          setSelectedMovie(newSelectedMovie);
        }}
        />
      ))}
    </div>)
  }
}