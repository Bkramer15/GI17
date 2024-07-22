import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.set('view engine', 'hbs');
const port = process.env.PORT || 8081;

// Middleware for parsing JSON and URL encoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use cors middleware to handle CORS
app.use(cors());

// Replace 'your_api_key_here' with your actual API key
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzlhYmE4OGEwMDQ4ZTBmYzE0YjM5MWVmNDNkYzVkYyIsInN1YiI6IjY2Njc3YjU3ZjlkNjI5MGE0YmRkYjRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GGAEPoLKmJ9MhcDCtGAHOWrxv9CFOSgUUAA3eFDJ_xk';

async function searchMovie(movieName, actor, genre) {
  let url = `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movieName)}&include_adult=false&language=en-US&page=1`;
  if (actor) {
    url += `&with_cast=${actor}`;
  }
  if (genre) {
    url += `&with_genres=${genre}`;
  }

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMzlhYmE4OGEwMDQ4ZTBmYzE0YjM5MWVmNDNkYzVkYyIsInN1YiI6IjY2Njc3YjU3ZjlkNjI5MGE0YmRkYjRiZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GGAEPoLKmJ9MhcDCtGAHOWrxv9CFOSgUUAA3eFDJ_xk'
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const movieData = await response.json();
    return movieData.results; // Assuming results are in movieData.results
  } catch (error) {
    console.error('Error fetching movie data:', error);
    throw error;
  }
}

app.get('/', (req, res) => {
  res.json('Welcome to the backend');
});

// GET endpoint to search for a movie based on user input
app.get('/api/search', async (req, res) => {
  try {
    const { movieName, genre, actor } = req.query;
    if (!movieName) {
      throw new Error('Movie name is required');
    }

    const movieData = await searchMovie(movieName, actor, genre);

    if (movieData.length === 0) {
      console.log(`No movies found for ${movieName}`);
      res.json({ movies: [] });
    } else {
      res.json({ movies: movieData });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
