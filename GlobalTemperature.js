const inputContainer = document.getElementById('input-container');
const globalTemperature = document.getElementById('Global');
const northernHemisphereTemperature = document.getElementById('Northern');
const southernHemisphereTemperature = document.getElementById('Southern');

inputContainer.addEventListener('change', () => {
  console.log(dataType());
})

const charting = async () => {
  const globalData = await fetchingData('CSVFiles/GLB.Ts+dSST.csv');
  const northernData = await fetchingData('CSVFiles/NH.Ts+dSST.csv');
  const southernData = await fetchingData('CSVFiles/SH.Ts+dSST.csv');

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
        labels: globalData.years,
        datasets: [
          {
            label: 'Average Global Temperature',
            data: globalData.temperatures,
            backgroundColor: [
                'green'
            ],
            borderColor: [
                'green'
            ],
            borderWidth: 1,
        },
        {
          label: 'Average Northern Hemisphere Temperature',
          data: northernData.temperatures,
          backgroundColor: [
              'blue'
          ],
          borderColor: [
              'blue'
          ],
          borderWidth: 1,
        },
        {
          label: 'Average Southern Hemisphere Temperature',
          data: southernData.temperatures,
          backgroundColor: [
              'red'
          ],
          borderColor: [
              'red'
          ],
          borderWidth: 1,
        }
      ]
    },
    options: {
        scales: {
            y: {
              ticks: {
                callback: (value) => {
                  return `${value}°C`
                }
              }
            }
        },
        plugins: {
          tooltip: {
              callbacks: {
                  label: (context) => {
                    // An object containg the data about each dot on the chart, such as it's label, year, temperature, etc
                    console.log(context);

                      // assigns to label the name of the dot (It's label which can be found from it's color on the chart key)
                      let label = context.dataset.label || '';

                      if (label) {
                          label += ': ';
                      }
                      
                      // context.parsed.y is the temperature value in number data type
                      if (context.parsed.y !== null) {
                        console.log(context.parsed.y);
                          label += `${context.parsed.y}°C`
                          
                          /*new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(context.parsed.y);*/
                      }

                      return label;
                  }
              }
          }
      }
    }
  });
}

const fetchingData = async (csvFile) => {
  const years = [];
  const temperatures = [];

  const responseFlow = await fetch(csvFile);
  let data = await responseFlow.text();
  data = data.trim();
  let dataArrayifed = data.split(/\n/);
  dataArrayifed = dataArrayifed.slice(2); 

  console.log(dataArrayifed);

  dataArrayifed.forEach(row => {
    const column = row.split(/,/);
    const year = column[0];
    const temperature = column[1];

    years.push(year);
    temperatures.push(Number(temperature) + 14);
  });

  return { years, temperatures }
}

charting();

const dataType = () => {
  let output;

  let globalValue = globalTemperature.checked;
  let northernValue = northernHemisphereTemperature.checked;
  let southernValue = southernHemisphereTemperature.checked;

  if (globalTemperature.checked) {

  }
}