import React, { useState, useEffect } from 'react';
import QuestionItem from './QuestionItem';
import ResultView from './ResultView';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

function App() {
  const [questions, setQuestions] = useState(() => {
    const saved = localStorage.getItem("form_questions");
    return saved ? JSON.parse(saved) : [];
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    localStorage.setItem("form_questions", JSON.stringify(questions));
  }, [questions]);

  const createNewQuestion = () => ({
    id: Date.now().toString(),
    text: "",
    type: "Short Answer",
    answer: "False",
    subQuestions: []
  });

  const addParentQuestion = () => {
    setQuestions([...questions, createNewQuestion()]);
  };

  const handleUpdate = (id, updatedFields) => {
    const updateRecursive = (list) => {
      return list.map(q => {
        if (q.id === id) return { ...q, ...updatedFields };
        if (q.subQuestions.length > 0) return { ...q, subQuestions: updateRecursive(q.subQuestions) };
        return q;
      });
    };
    setQuestions(updateRecursive(questions));
  };

  const handleAddChild = (parentId) => {
    const addChildRecursive = (list) => {
      return list.map(q => {
        if (q.id === parentId) {
          return { ...q, subQuestions: [...q.subQuestions, createNewQuestion()] };
        }
        if (q.subQuestions.length > 0) return { ...q, subQuestions: addChildRecursive(q.subQuestions) };
        return q;
      });
    };
    setQuestions(addChildRecursive(questions));
  };

  const handleDelete = (id) => {
    const deleteRecursive = (list) => {
      return list
        .filter(q => q.id !== id)
        .map(q => ({ ...q, subQuestions: deleteRecursive(q.subQuestions) }));
    };
    setQuestions(deleteRecursive(questions));
  };

  const handleSubmit = async () => {
    if (questions.length === 0) {
      alert("Please add at least one question.");
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(questions),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        alert("Failed to submit to backend.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Server is not responding. Showing local preview anyway.");
      setIsSubmitted(true); // Still show the result view for demo purposes
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const reorderedItems = Array.from(questions);
    const [removed] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, removed);
    setQuestions(reorderedItems);
  };

  // --- THIS WAS MISSING: The UI Logic ---[cite: 1]
  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      {!isSubmitted ? (
        <>
          <h1>Dynamic Nested Form</h1>
          <button 
            onClick={addParentQuestion}
            style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}
          >
            Add New Parent Question
          </button>

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="questions-list">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {questions.map((q, index) => (
                    <Draggable key={q.id} draggableId={q.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            ...provided.draggableProps.style,
                            marginBottom: '10px',
                            background: '#fff',
                            border: '1px solid #ddd',
                            padding: '10px',
                            borderRadius: '5px'
                          }}
                        >
                          <QuestionItem 
                            question={q}
                            index={index}
                            onUpdate={handleUpdate}
                            onDelete={handleDelete}
                            onAddChild={handleAddChild}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

          {questions.length > 0 && (
            <button 
              onClick={handleSubmit}
              style={{ marginTop: '20px', background: 'green', color: 'white', padding: '10px 20px', cursor: 'pointer', border: 'none' }}
            >
              Submit Form
            </button>
          )}
        </>
      ) : (
        <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
          <h2>Review Your Hierarchy</h2>
          <ResultView data={questions} />
          <button onClick={() => setIsSubmitted(false)} style={{ marginTop: '20px' }}>
            ← Back to Editor
          </button>
        </div>
      )}
    </div>
  );
}

export default App;