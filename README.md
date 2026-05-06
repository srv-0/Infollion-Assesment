# Dynamic Nested Form Builder (MERN Stack)
A full-stack application that allows users to create hierarchical question forms with infinite nesting capabilities. Built as part of the Infollion technical assessment.

## Features
Recursive Nesting: Supports infinite levels of sub-questions based on logical triggers.

Logical Conditional Rendering: Sub-questions appear only when a "True/False" question type is selected and the condition "Answer is True" is met.

Dynamic Auto-Numbering: Automatically generates hierarchical labels (e.g., Q1, Q1.1, Q1.1.1).

Drag-and-Drop (Bonus): Reorder parent questions seamlessly using @hello-pangea/dnd.

State Persistence (Bonus): Uses localStorage to ensure form progress is saved even after page refreshes.

Backend Integration: Submits the final hierarchical JSON structure to a Node.js/Express server.

## Tech Stack
Frontend: React.js, Vite, CSS (Inline/Tailwind).

Backend: Node.js, Express.js, CORS.

Utilities: @hello-pangea/dnd, Body-Parser.

## Installation and Setup
### 1. Clone the Repository
Bash
git clone <your-repo-link>
cd <your-repo-folder>
### 2. Backend Setup
Bash
cd server
npm install
node index.js
The server will run on http://localhost:5000.

### 3. Frontend Setup
Bash
cd client
npm install
npm run dev
The app will run on http://localhost:5173 (or the port shown in your terminal).

## How to Use
Click "Add New Parent Question" to start the form.

Choose the "True/False" type for any question.

Set the answer condition to "True" to reveal the "+ Add Sub-Question" button.

Drag and drop questions to reorder them.

Click "Submit Form" to view the hierarchical summary and send data to the backend.

## Deliverables
GitHub Repository: Contains both /client and /server projects.

JSON Structure: The backend logs a recursive JSON tree representing the form hierarchy.
