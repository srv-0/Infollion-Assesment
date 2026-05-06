import React from 'react';

const QuestionItem = ({ 
  question, 
  index, 
  prefix = "Q", 
  onUpdate, 
  onDelete, 
  onAddChild 
}) => {
  // Generate the label like Q1, Q1.1, etc.
  const currentLabel = `${prefix}${index + 1}`;

  return (
    <div style={{ marginLeft: '20px', borderLeft: '1px solid #ddd', paddingLeft: '10px', marginTop: '10px' }}>
      <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '5px' }}>
        <strong>{currentLabel}</strong>
        
        {/* Question Text Input */}
        <input 
          type="text" 
          placeholder="Enter question"
          value={question.text}
          onChange={(e) => onUpdate(question.id, { text: e.target.value })}
          style={{ flexGrow: 1, padding: '5px' }}
        />

        {/* Question Type Dropdown[cite: 1] */}
        <select 
          value={question.type} 
          onChange={(e) => onUpdate(question.id, { type: e.target.value })}
          style={{ padding: '5px' }}
        >
          <option value="Short Answer">Short Answer</option>
          <option value="True/False">True/False</option>
        </select>

        {/* Delete Button[cite: 1] */}
        <button 
          onClick={() => onDelete(question.id)}
          style={{ background: '#ff4d4d', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}
        >
          Delete
        </button>
      </div>

      {/* Conditional Logic: If True/False, show the answer dropdown and "Add Child"[cite: 1] */}
      {question.type === "True/False" && (
        <div style={{ marginLeft: '30px', marginTop: '5px' }}>
          <label style={{ marginRight: '10px', fontSize: '14px' }}>Condition to add sub-question:</label>
          <select 
            value={question.answer} 
            onChange={(e) => onUpdate(question.id, { answer: e.target.value })}
            style={{ padding: '3px' }}
          >
            <option value="False">Answer is False</option>
            <option value="True">Answer is True</option>
          </select>

          {/* Add Child Question Button[cite: 1] */}
          {question.answer === "True" && (
            <button 
              onClick={() => onAddChild(question.id)}
              style={{ marginLeft: '10px', background: '#4CAF50', color: 'white', border: 'none', padding: '3px 8px', cursor: 'pointer', fontSize: '12px' }}
            >
              + Add Sub-Question
            </button>
          )}
        </div>
      )}

      {/* RECURSION: Render children if they exist[cite: 1] */}
      <div className="sub-questions">
        {question.subQuestions && question.subQuestions.map((subQ, i) => (
          <QuestionItem 
            key={subQ.id}
            question={subQ}
            index={i}
            prefix={`${currentLabel}.`} // Pass the new prefix (e.g., "Q1.")[cite: 1]
            onUpdate={onUpdate}
            onDelete={onDelete}
            onAddChild={onAddChild}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionItem;