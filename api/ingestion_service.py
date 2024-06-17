from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests
from bs4 import BeautifulSoup
import numpy as np
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
import os
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
# upload your own API key
os.environ['NVIDIA_API_KEY'] = '*******'
embedder = NVIDIAEmbeddings(model="snowflake/arctic-embed-l")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
class Document(BaseModel):
    text: str
    id: str

class ArticleURL(BaseModel):
    url: str

def fetch_article(url: str) -> str:
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    article_text = ' '.join([p.text for p in soup.find_all('p')])
    return article_text

@app.post("/process_text/")
def process_text(document: Document):
    try:
        text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,  # Maximum characters in each chunk
        chunk_overlap=0,  # No overlap between chunks
        length_function=len  # Use the length of the string as the chunking criterion
    )

        # Split text into manageable chunks
        chunks = text_splitter.split_text(document.text)
        dest_embed_dir = '/mnt/c/Users/ojasd/Desktop/coding_projects/document_retrieval_system/embeddings/' + document.id
        docsearch = FAISS.from_texts(chunks, embedding=embedder)
        docsearch.save_local(folder_path=dest_embed_dir)
        return {"status": "Success", "message": "Text processed and embeddings stored."}
    except Exception as e:
        print("Failed to process text: ", str(e))
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/process_article/")
def process_article(article_url: ArticleURL):
    try:
        # Fetch and extract article text
        article_text = fetch_article(article_url.url)
        # Follow the same procedure as in processing direct text
        return {"text" : article_text}
    except Exception as e:
        print("Failed to process article: ")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
