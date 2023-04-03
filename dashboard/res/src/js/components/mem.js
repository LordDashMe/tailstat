const MEM = {
  usageMeterOpts: {
    colorUsage: "rgb(86, 144, 255)"
  },
  elements: {
    memUsageId: "mem_usage",
    memTotal: "mem_total",
    memUsed: "mem_used"
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
      document.getElementById(this.elements.memUsageId), 
      this.percentage, 
      this.usageMeterOpts
    );
    document.getElementById(this.elements.memTotal).textContent = formatBytes(this.total);
    document.getElementById(this.elements.memUsed).textContent = formatBytes(this.used );
  },
  update: function () {
    this.chart.update(this.percentage);
    document.getElementById(this.elements.memTotal).textContent = formatBytes(this.total);
    document.getElementById(this.elements.memUsed).textContent = formatBytes(this.used );
  }
};
