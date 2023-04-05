import psutil


def main():
    try:
        diskUsage = psutil.disk_usage("/")
        output = {
            "percent": diskUsage.percent, 
            "total": diskUsage.total, 
            "used": diskUsage.used
        }
        return output

    except Exception as e:
        print(e)
