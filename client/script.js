const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  if (!token) {
    window.location.href = 'index.html';
  } else {
    loadMovies();
    document.getElementById('add-movie-form').addEventListener('submit', addMovie);
  }
});

function loadMovies() {
  fetch('http://localhost:3000/api/movies', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(movies => {
      const movieList = document.getElementById('movie-list');
      movieList.innerHTML = '';
      movies.forEach(movie => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${movie.title}</strong> - ${movie.description}
          <button onclick="bookMovie('${movie._id}')">Book</button>
        `;
        movieList.appendChild(li);
      });
    });
}

function addMovie(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;

  fetch('http://localhost:3000/api/movies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ title, description })
  })
    .then(res => res.json())
    .then(() => {
      loadMovies();
      document.getElementById('add-movie-form').reset();
    });
}

function bookMovie(movieId) {
  alert(`Movie with ID ${movieId} booked! (Functionality to be implemented)`);
}
