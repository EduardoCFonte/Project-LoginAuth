import fitz 
import sys
from fastapi import File, UploadFile



class pdf_parser:
    def __init__(self):
        print("oi")
    
    async def read_pdf(self, files: list[UploadFile] = File(...)):
        
        for file in files:
            try:
                file_bytes = await file.read()
                doc = fitz.open(stream=file_bytes, filetype="pdf")
            except Exception as e:
                print("Erro para abrir o PDF")
                continue

            full_pdf = []

            for page in doc:
                text = page.get_text()
                full_pdf.append(text) 

            print("trying")
            doc.close()
            complete_pdf = "\n".join(full_pdf)

        # print(complete_pdf)
        return complete_pdf