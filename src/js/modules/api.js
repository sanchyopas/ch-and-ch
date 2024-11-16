fetch('https://test-2422i.fresco.bz/api/main', {
  method: 'GET',
})
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);

  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });