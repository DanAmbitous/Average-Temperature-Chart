const inputContainer = document.getElementById('input-container');
const dropDownList = document.getElementById('temperature-unit');

inputContainer.addEventListener('change', () => {
  fetchingData('CSVFiles/GLB.Ts+dSST.csv');
})

const temperatureData = (name, temperature, color) => {
 return {
    label: name,
    data: temperature,
    backgroundColor: [
      color
    ],
    borderColor: [
      color
    ],
    borderWidth: 1,
  }
}

const charting = async () => {
  console.log('hi');
  const globalData = await fetchingData('CSVFiles/GLB.Ts+dSST.csv');
  const northernData = await fetchingData('CSVFiles/NH.Ts+dSST.csv');
  const southernData = await fetchingData('CSVFiles/SH.Ts+dSST.csv');

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
        labels: globalData.years,
        datasets: [
          temperatureData('Average Global Temperature', globalData.temperatures, 'green'),
          temperatureData('Average Northern Hemisphere Temperature', northernData.temperatures, 'blue'),
          temperatureData('Average Southern Hemisphere Temperature', southernData.temperatures, 'red')
      ]
    },
    options: {
        scales: {
            y: {
              ticks: {
                callback: (value) => {
                  return `${value}°`
                }
              }
            }
        },
        plugins: {
          tooltip: {
              callbacks: {
                  label: (context) => {
                    // An object containg the data about each dot on the chart, such as it's label, year, temperature, etc

                      // assigns to label the name of the dot (It's label which can be found from it's color on the chart key)
                      let label = context.dataset.label || '';

                      if (label) {
                          label += ': ';
                      }
                      
                      // context.parsed.y is the temperature value in number data type
                      if (context.parsed.y !== null) {
                          label += `${context.parsed.y}°`
                          
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

  dataArrayifed.forEach(row => {
    const column = row.split(/,/);
    const year = column[0];
    const temperature = column[1];

    years.push(year);

    temperatures.push(Number(temperature) + 14);
  });

  if (dropDownList.value === 'fahrenheit') {
    temperatures.pop();

    dataArrayifed.forEach(row => {
      const column = row.split(/,/);
      const temperature = column[1];
    
      temperatures.push((Number(temperature) + 14) * 9/5 + 32);
    });
  }

  if (dropDownList.value === "kelvin") {
    temperatures.pop();

    dataArrayifed.forEach(row => {
      const column = row.split(/,/);
      const temperature = column[1];
    
      temperatures.push((Number(temperature) + 14) + 273);
    }); 
  }

  return { years, temperatures }
}

charting();