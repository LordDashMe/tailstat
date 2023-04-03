const CPU = {
  usageMeterOpts: {
    colorUsage: "rgb(75, 192, 192)"
  },
  elements: {
    cpuUsageId: "cpu_usage",
    cpuCount: "cpu_count"
  },
  chart: null,
  percentage: 0,
  count: 0,
  setPercentage: function (percentage) {
    this.percentage = percentage;
  },
  setCount: function (count) {
    this.count = count;
  },
  render: function () {
    this.chart = UsageMeter(
      document.getElementById(this.elements.cpuUsageId), 
      this.percentage, 
      this.usageMeterOpts
    );
    document.getElementById(this.elements.cpuCount).textContent = this.count;
  },
  update: function () {
    this.chart.update(this.percentage);
    document.getElementById(this.elements.cpuCount).textContent = this.count;
  }
};
