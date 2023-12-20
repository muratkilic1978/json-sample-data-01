const apiUrl = 'https://api.github.com/repos/muratkilic1978/persondata/contents/persondata.json';

    // Get the container element from the DOM
    const container = document.getElementById('data-container');

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        // Parse the base64-encoded content from the GitHub API response
        const content = atob(data.content);
        const jsonData = JSON.parse(content);

        // Check if jsonData has a "posts" key and it's an array
        if (jsonData.posts && Array.isArray(jsonData.posts)) {
          // Iterate through the array of posts
          jsonData.posts.forEach(post => {
            // Create a new div for each post
            const postDiv = document.createElement('div');

            // Iterate through the properties of each post
            Object.keys(post).forEach(key => {
              const element = document.createElement('p');
              element.textContent = `${key}: ${post[key]}`;
              postDiv.appendChild(element);
            });

            // Append the postDiv to the container
            container.appendChild(postDiv);
          });
        } else {
          // Display an error message if the structure is not as expected
          const errorElement = document.createElement('p');
          errorElement.textContent = 'Unexpected JSON structure.';
          container.appendChild(errorElement);
        }
      })
      .catch(error => console.error('Error:', error));