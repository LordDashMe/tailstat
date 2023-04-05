import psutil


def main():
    try:
        mem = psutil.virtual_memory()
        output = { 
            "percent": mem.percent, 
            "total": mem.total, 
            "used": mem.used 
        }
        return output

    except Exception as e:
        print(e)
