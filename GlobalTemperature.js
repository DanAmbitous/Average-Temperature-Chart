const inputContainer = document.getElementById('input-container');
const globalTemperature = document.getElementById('Global');
const northernHemisphereTemperature = document.getElementById('Northern');
const southernHemisphereTemperature = document.getElementById('Southern');

inputContainer.addEventListener('change', () => {
  console.log(dataType());
})

const charting = async () => {
  const data = await fetchingData();
  const dataNorthern = await fetchingDataNorthern();

  const ctx = document.getElementById('chart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
        labels: data.years,
        datasets: [
          {
            label: 'Average Global Temperature',
            data: data.temperatures,
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
          data: dataNorthern.temperatures,
          backgroundColor: [
              'blue'
          ],
          borderColor: [
              'blue'
          ],
          borderWidth: 1,
        }
      ]
    },
    options: {
        scales: {
            y: {
             
            }
        }
    }
  });
}

const fetchingData = async () => {
  const years = [];
  const temperatures = [];

  const responseFlow = await fetch('GLB.Ts+dSST.csv');
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

const fetchingDataNorthern = async () => {
  const years = [];
  const temperatures = [];

  const responseFlow = await fetch('NH.Ts+dSST.csv');
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