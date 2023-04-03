const fetchTailStatData = async function () {
  
  const sync = await fetch(
    "http://localhost:10000/report/sync", 
    { 
      method: "POST",
    }
  );

  const res = await fetch(
    "http://localhost:10000/tmp/tailstat_data.json", 
    { 
      method: "GET",
      headers: {
        'Accept': 'application/json'
      }
    }
  );

  const data = await res.json();

  document.getElementById("tailstat_timestamp").textContent = moment.utc(data.timestamp).local().format('MMMM Do YYYY, h:mm:ss a');

  CPU.setPercentage(data.tailstat.cpu.percent);
  CPU.setCount(data.tailstat.cpu.count);
  CPU.update();

  MEM.setPercentage(data.tailstat.mem.percent);
  MEM.setTotal(data.tailstat.mem.total);
  MEM.setUsed(data.tailstat.mem.used);
  MEM.update();

  DISK.setPercentage(data.tailstat.disk.percent);
  DISK.setTotal(data.tailstat.disk.total);
  DISK.setUsed(data.tailstat.disk.used);
  DISK.update();
}

document.getElementById("host_action_reload").addEventListener("click", fetchTailStatData);

document.addEventListener("DOMContentLoaded", async function () {

  CPU.setPercentage(0);
  CPU.setCount(0);
  CPU.render();

  MEM.setPercentage(0);
  MEM.setTotal(0);
  MEM.setUsed(0);
  MEM.render();

  DISK.setPercentage(0);
  DISK.setTotal(0);
  DISK.setUsed(0);
  DISK.render();

  await fetchTailStatData();

  setInterval(fetchTailStatData, 5000);

});
