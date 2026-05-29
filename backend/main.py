from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

app = FastAPI(title="Pipeline Workflow Builder API")

# Setup CORS to allow requests from the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Node(BaseModel):
    id: str
    type: str
    position: Dict[str, float]
    data: Dict[str, Any]

class Edge(BaseModel):
    id: str
    source: str
    target: str
    sourceHandle: Optional[str] = None
    targetHandle: Optional[str] = None

class Pipeline(BaseModel):
    nodes: List[Node]
    edges: List[Edge]

@app.post("/pipelines/parse")
def parse_pipeline(pipeline: Pipeline):
    num_nodes = len(pipeline.nodes)
    num_edges = len(pipeline.edges)

    # 1. Build adjacency list for the directed graph
    # node.id -> list of target node.ids
    adj_list = {node.id: [] for node in pipeline.nodes}
    in_degree = {node.id: 0 for node in pipeline.nodes}

    for edge in pipeline.edges:
        # Ignore edges that reference non-existent nodes
        if edge.source in adj_list and edge.target in adj_list:
            adj_list[edge.source].append(edge.target)
            in_degree[edge.target] += 1

    # 2. Perform Topological Sort (Kahn's Algorithm) to detect cycles
    queue = [node_id for node_id, degree in in_degree.items() if degree == 0]
    visited_count = 0

    while queue:
        current = queue.pop(0)
        visited_count += 1
        
        for neighbor in adj_list[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    # 3. Check if we visited all nodes. If we did, it's a DAG.
    is_dag = visited_count == len(adj_list)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": is_dag
    }
