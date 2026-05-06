import React from 'react';

const ResultView = ({ data, prefix = "Q" }) => {
  return (
    <div style={{ marginTop: '1rem', marginLeft: '1rem' }}>
      {data.map((q, index) => {
        const currentLabel = `${prefix}${index + 1}`;
        return (
          <div key={q.id} style={{ marginBottom: '1rem', padding: '0.75rem', borderLeft: '2px solid #bfdbfe', backgroundColor: '#fff' }}>
            <p style={{ fontWeight: '600', color: '#1f2937', margin: 0 }}>
              {currentLabel}: {q.text || "(Empty Question)"}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', textTransform: 'uppercase', margin: '4px 0' }}>
              Type: {q.type}
            </p>

            {/* RECURSION: Render sub-questions */}
            {q.subQuestions && q.subQuestions.length > 0 && (
              <div style={{ marginTop: '0.5rem' }}>
                <ResultView 
                  data={q.subQuestions} 
                  prefix={`${currentLabel}.`} 
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ResultView;