fetch('data/cars.json')
  .then(res => res.json())
  .then(cars => {
    const grid = document.getElementById('carsGrid');
    cars.forEach(car => {
      const col = document.createElement('div'); col.className='col-md-6 col-lg-4';
      col.innerHTML = `
        <div class="card">
          <img src="${car.img}" class="card-img-top" alt="${car.name}">
          <div class="card-body">
            <h5 class="card-title">${car.name} (${car.year})</h5>
            <p class="card-text">${car.desc}</p>
            <p class="fw-bold">${car.price}</p>
          </div>
        </div>`;
      grid.appendChild(col);
    });
  })
  .catch(err => console.error(err));
