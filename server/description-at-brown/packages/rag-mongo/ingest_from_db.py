from langchain_community.vectorstores import MongoDBAtlasVectorSearch
from langchain_community.embeddings.openai import OpenAIEmbeddings
from pymongo import MongoClient
import os

MONGO_URI = os.environ["MONGO_URI"]

# Note that if you change this, you also need to change it in `rag_mongo/chain.py`
DB_NAME = "courses"
COLLECTION_NAME = "text"
ATLAS_VECTOR_SEARCH_INDEX_NAME = "default"
EMBEDDING_FIELD_NAME = "embedding"

mongo_client = MongoClient(MONGO_URI)
db = mongo_client[DB_NAME]
my_collection = db[COLLECTION_NAME]
embeddings = OpenAIEmbeddings()

i = 0
for x in my_collection.find({}):
    if "embedding" in x:
        print('already')
        continue
    db.text.update_one({"_id": x["_id"]}, {"$set": {"embedding": embeddings.embed_query(x["text"])}})
    i += 1
    print(i)

print('done')