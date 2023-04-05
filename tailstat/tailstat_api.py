from datetime import datetime
from fastapi import FastAPI
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import tailstat_cpu
import tailstat_mem
import tailstat_disk

app = FastAPI()

app.add_middleware(CORSMiddleware, 
    allow_credentials=True,
    allow_origins=["*"],  
    allow_methods=["*"], 
    allow_headers=["*"])


@app.get("/report")
def read_report():
    try:
        output = {
            "tailstat": {
                "cpu": tailstat_cpu.main(),
                "mem": tailstat_mem.main(),
                "disk": tailstat_disk.main()
            },
            "timestamp": str(datetime.now())
        }
        return output

    except Exception as e:
        print(e)
        return JSONResponse(status_code=500, content={ "message": "Operation failed" })
