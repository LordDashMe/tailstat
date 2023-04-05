import psutil


def main():
    try:
        output = { 
            "percent": psutil.cpu_percent(), 
            "count": psutil.cpu_count() 
        }
        return output

    except Exception as e:
        print(e)
