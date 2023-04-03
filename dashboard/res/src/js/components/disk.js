const DISK = {
  usageMeterOpts: {
    colorUsage: "rgb(153, 102, 255)"
  },
  elements: {
    diskUsageId: "disk_usage",
    diskTotal: "disk_total",
    diskUsed: "disk_used"
  },
  chart: null,
  percentage: 0,
  total: 0,
  used: 0,
  setPercentage: function (percentage) {
    this.percentage = percentage;
  },
  setTotal: function (total) {
    this.total = total;
  },
  setUsed: function (used) {
    this.used = used;
  },
  render: function () {
    this.chart = UsageMeter(
      document.getElementById(this.elements.diskUsageId), 
      this.percentage, 
      this.usageMeterOpts
    );
    document.getElementById(this.elements.diskTotal).textContent = formatBytes(this.total);
    document.getElementById(this.elements.diskUsed).textContent = formatBytes(this.used);
  },
  update: function () {
    this.chart.update(this.percentage);
    document.getElementById(this.elements.diskTotal).textContent = formatBytes(this.total);
    document.getElementById(this.elements.diskUsed).textContent = formatBytes(this.used);
  }
};
