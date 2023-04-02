import psutil


def main():
    percent = psutil.cpu_percent()
    count = psutil.cpu_count()

    return { 
        "percent": percent, 
        "count": count  
    }
