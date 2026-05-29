# VectorShift AI Workflow Builder

A premium, node-based visual workflow builder for AI pipelines. Built with React Flow, Zustand, FastAPI, and tailored with a modern, glassmorphic design system.

## 🚀 Features

- **Premium UI/UX**: Dark mode by default, glassmorphic modals, and custom-styled interactive edges with animated gradients.
- **9 Custom Nodes**:
  - `InputNode` / `OutputNode`: Define pipeline boundaries.
  - `LLMNode`: Select from multiple AI models (GPT-4, Claude, LLaMA) and adjust temperature via a responsive slider.
  - `TextNode`: Advanced regex parsing automatically detects `{{variables}}` and instantly creates semantic dynamic input handles.
  - `MathNode`: Perform operations on data streams.
  - `ConditionalNode`: Logic branching for dynamic workflows.
  - `DataTransformNode`: Format and process data.
  - `APINode`: Send HTTP requests directly from the pipeline.
  - `TimerNode`: Pause execution visually.
- **Robust State Management**: Powered by Zustand. Features edge deduplication, orphan edge cleanup, and automatic canvas dimension resizing.
- **DAG Validation**: FastAPI backend algorithm uses Kahn's topological sort to parse the pipeline and detect cyclic dependencies in real-time.

## 🛠 Tech Stack

- **Frontend**: React, React Flow, Zustand, Lucide React (Icons).
- **Backend**: Python, FastAPI, Pydantic, Uvicorn.
- **Styling**: Vanilla CSS with comprehensive CSS variable tokens for rapid theming.

## 📦 Local Setup

### 1. Frontend
```bash
cd frontend
npm install
npm start
```
The app will be running at `http://localhost:3000`.

### 2. Backend
```bash
cd backend
python -m venv venv
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
The API will be available at `http://localhost:8000`.

## 🧠 Architecture Overview

The app splits the logic cleanly into two domains:

1. **Client-Side (React + Zustand)**
   - The UI orchestrates drag-and-drop interactions.
   - The `store.js` encapsulates all mutation logic (e.g. `onConnect`, `removeNode`, `removeEdge`).
   - `BaseNode` provides a unified UI wrapper ensuring consistent padding, typography, and hover states across all custom nodes.

2. **Server-Side (FastAPI)**
   - The `/pipelines/parse` endpoint receives the serialized DAG.
   - It performs a topological sort on the adjacency list.
   - If it processes all nodes without getting stuck, the pipeline is a valid Directed Acyclic Graph (`is_dag = true`), otherwise it flags it as cyclic.

## 🎨 Design Philosophy
Every element was designed to "wow" the user. No standard browser defaults were used. The canvas utilizes a sleek dot grid, connections snap seamlessly using smoothstep paths, and the floating sidebar organizes nodes into logical categories with collapsible accordions.
