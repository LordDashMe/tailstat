import psutil


def main():
    diskUsage = psutil.disk_usage("/")

    percent = diskUsage.percent
    total = diskUsage.total
    used = diskUsage.used

    return { 
        "percent": percent, 
        "total": total, 
        "used": used 
    }
