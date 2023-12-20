const apiUrl = 'https://raw.githubusercontent.com/muratkilic1978/json-sample-data-01/main/sampledata.json';

    // Get the container element from the DOM
    const container = document.getElementById('data-container');

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(dataArray => {
        // Assuming the JSON structure is an array of objects
        dataArray.forEach((data, index) => {
          // Create a new div for each data object
          const dataDiv = document.createElement('div');

          // Iterate through the properties of each data object
          Object.keys(data).forEach(key => {
            const element = document.createElement('p');
            element.textContent = `${key}: ${data[key]}`;
            dataDiv.appendChild(element);
          });

          // Append the dataDiv to the container
          container.appendChild(dataDiv);
        });
      })
      .catch(error => console.error('Error:', error));