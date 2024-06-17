from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
import uvicorn
from langchain_nvidia_ai_endpoints import NVIDIAEmbeddings, ChatNVIDIA
from langchain_community.vectorstores import FAISS
from langchain.chains import ConversationalRetrievalChain
from langchain_core.prompts import PromptTemplate
import os
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)
os.environ['NVIDIA_API_KEY'] = '*******'

# Initialize heavy objects outside of endpoint calls
embedder = NVIDIAEmbeddings(model="snowflake/arctic-embed-l")

llm = ChatNVIDIA(model="ai-llama2-70b", temperature=0.1, max_tokens=1000, top_p=1.0)
prompt_template = """Use the following pieces of context to answer the question at the end.
{context}
Question: {question}
Answer:"""
PROMPT = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
class Question(BaseModel):
    text: str
class Name(BaseModel):
    text: str
@app.post("/set_context/")
def set_context(name : Name):
    global qa_chain, docsearch
    path = '/mnt/c/Users/ojasd/Desktop/coding_projects/document_retrieval_system/embeddings/'+name.text
    docsearch = FAISS.load_local(folder_path=path, embeddings=embedder, allow_dangerous_deserialization=True)
    qa_chain = ConversationalRetrievalChain.from_llm(
    llm=llm,
    retriever=docsearch.as_retriever(),
    chain_type="stuff",
    combine_docs_chain_kwargs={'prompt': PROMPT}
)
    return {"status": "Success", "message": "Context set successfuly"}
@app.get("/list_embeddings/")
def list_embeddings():
    embeddings_path = '/mnt/c/Users/ojasd/Desktop/coding_projects/document_retrieval_system/embeddings/'
    try:
        # List only directories within the specified path
        directories = [d for d in os.listdir(embeddings_path) if os.path.isdir(os.path.join(embeddings_path, d))]
        return {"documents": directories}
    except Exception as e:
        return JSONResponse(status_code=500, content={"message": "Error accessing the embeddings directory", "error": str(e)})

@app.post("/generate_answer/")
def generate_answer(question: Question):
    try:
        result = qa_chain({"question": question.text, "chat_history": ""})
        return {"answer": [result.get("answer")]}
    except Exception as e:
        print("Failed to generate answer:", str(e))
        return JSONResponse(status_code=500, content={"message": "Error processing the request", "error": str(e)})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8100)
