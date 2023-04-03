const UsageMeter = function (context, usage, opts) {

  let colorDefault = 'rgb(201, 203, 207)';
  let colorUsage = 'rgb(75, 192, 192)';

  if (typeof opts.colorUsage !== 'undefined') {
    colorUsage = opts.colorUsage;
  }

  const data = {
    labels: ['In used %', 'Free %'],
    datasets: [
      {
        data: [usage, (100 - usage)],
        backgroundColor: [colorUsage, colorDefault],
      }
    ]
  };

  const radiusBackground = {
    id: 'radiusBackground',
    beforeDatasetsDraw(chart, args, options) {
      const { ctx, width } = chart;
      const { innerRadius } = chart.getDatasetMeta(chart.data.datasets.length - 1).controller;
      const { outerRadius } = chart.getDatasetMeta(0).controller;
      const radiusLength = outerRadius - innerRadius;

      if (options.enabled) {
        const x = width / 2;
        ctx.beginPath();
        // height: 135 - 45 = 90
        ctx.arc(x, 135, (outerRadius - radiusLength / 2), 3.14, 0);
        ctx.lineWidth = radiusLength;
        ctx.strokeStyle = options.color;
        ctx.stroke();
      }
    }
  };

  const percentage = {
    id: 'percentage',
    beforeDraw(chart, args, options) {
      const { ctx, chartArea: { top, right, bottom, left, width, height } } = chart;
      ctx.save();
      ctx.font = "bold " + options.fontSize + 'px ' + options.fontFamily;
      ctx.textAlign = 'center';
      ctx.fillStyle = options.fontColor;
      ctx.fillText(chart.data.datasets[0].data[0] + '%', width / 2, (height / 2) + 34);
    }
  };
  
  const config = {
    type: 'doughnut',
    data: data,
    options: {
      elements: {
        arc: {
          borderWidth: 0
        }
      },
      rotation: -90,
      circumference: 180,
      responsive: true,
      cutout: 70,
      plugins: {
        legend: {
          display: false
        },
        title: {
          display: false
        },
        percentage: {
          fontColor: colorUsage,
          fontSize: 34,
          fontFamily: 'Chakra Petch'
        },
        radiusBackground: {
          enabled: true,
          color: colorDefault,
        }
      }
    },
    plugins: [percentage, radiusBackground]
  };

  const chart = new Chart(context, config);

  return {
    update: function (newUsage) {
      chart.data.datasets[0].data[0] = newUsage;
      chart.data.datasets[0].data[1] = 100 - newUsage;
      chart.update();
    }
  }
};
  