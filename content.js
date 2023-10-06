// Wait for page to load, not sure if there's better way to do this. Already tried adding "run_at": "document_end" in manifest.json
setTimeout(function() { run(); }, 3000);

function run() {

  // Observe when the first listed player changes (ie: on pagination or new sort) to update the salaries
  const firstListedPlayer = document.querySelector('#fitt-analytics > div > div.jsx-979094127.shell-container > div.page-container.cf > div.layout.is-full > div > div > div.jsx-1948381739.players-table__sortable.tc > div > div > table > tbody > tr:nth-child(1) > td:nth-child(1) > div');
  console.log(firstListedPlayer.title);
  const observer = new MutationObserver(onFirstListedPlayerChange);
  const observerConfig = { attributes: true, attributeFilter: ['title'] };
  observer.observe(firstListedPlayer, observerConfig);

  const text = document.querySelectorAll("#fitt-analytics > div > div.jsx-979094127.shell-container > div.page-container.cf > div.layout.is-full > div > div > div.jsx-1948381739.players-table__sortable.tc > div > div > table > tbody > tr:nth-child(n) > td:nth-child(2) > div")

  const names = document.querySelectorAll("#fitt-analytics > div > div.jsx-979094127.shell-container > div.page-container.cf > div.layout.is-full > div > div > div.jsx-1948381739.players-table__sortable.tc > div > div > table > tbody > tr:nth-child(n) > td:nth-child(1) > div > div > div.jsx-1811044066.player-column_info.flex.flex-column > div > div.jsx-1811044066.player-column__athlete.flex > span:nth-child(1) > a")

  console.log('Caren');
  console.log(text.length);

  const url = chrome.runtime.getURL('./salary.json');

  fetch(url)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        response.json().then(function(data) {

          for (let i=0; i < text.length; i++) {
            // TODO Get name of NBA player
            const player = names[i].innerHTML;
            const totalPaidInMillion = data[player]
            text[i].innerHTML = convertToShortScale(data[player]);
          }

        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });
}

function convertToShortScale(numberString) {
  const number = parseFloat(numberString);

  if (isNaN(number)) {
    return "Invalid input";
  }

  if (number >= 1000000) {
    // If the number is greater than or equal to 1 million, convert it to the "m" format
    const millionEquivalent = (number / 1000000).toFixed(1); // Keep one decimal place
    return millionEquivalent + "m";
  } else {
    // If the number is less than 1 million, leave it as is
    return numberString;
  }
}

// Function to run when the title attribute of elements with the specified class changes
function onFirstListedPlayerChange(mutationsList, observer) {
  for (let mutation of mutationsList) {
    if (mutation.type === 'attributes' && mutation.attributeName === 'title') {
      // The title attribute of an element has changed
      // You can add your logic here
      console.log('Title attribute changed:', mutation.target.title);

      const text = document.querySelectorAll("#fitt-analytics > div > div.jsx-979094127.shell-container > div.page-container.cf > div.layout.is-full > div > div > div.jsx-1948381739.players-table__sortable.tc > div > div > table > tbody > tr:nth-child(n) > td:nth-child(2) > div")

      const names = document.querySelectorAll("#fitt-analytics > div > div.jsx-979094127.shell-container > div.page-container.cf > div.layout.is-full > div > div > div.jsx-1948381739.players-table__sortable.tc > div > div > table > tbody > tr:nth-child(n) > td:nth-child(1) > div > div > div.jsx-1811044066.player-column_info.flex.flex-column > div > div.jsx-1811044066.player-column__athlete.flex > span:nth-child(1) > a")

      console.log('Caren');
      console.log(text.length);

      const url = chrome.runtime.getURL('./salary.json');

      fetch(url)
        .then(
          function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }

            response.json().then(function(data) {

              for (let i=0; i < text.length; i++) {
                // TODO Get name of NBA player
                const player = names[i].innerHTML;
                const totalPaidInMillion = data[player]
                text[i].innerHTML = convertToShortScale(data[player]);
              }

            });
          }
        )
        .catch(function(err) {
          console.log('Fetch Error :-S', err);
        });
    }
  }
}
