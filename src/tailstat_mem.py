import psutil


def main():
    mem = psutil.virtual_memory()

    percent = mem.percent
    total = mem.total
    used = mem.used

    return { 
        "percent": percent, 
        "total": total, 
        "used": used 
    }
