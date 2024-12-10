import React, { useEffect, useState } from 'react';
import CandidateCard from '../components/Candidate';
import Candidate from '../interfaces/Candidate.interface';
import '../pages/SavedCandidates.css';

const SavedCandidates: React.FC = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);
  const [filterText, setFilterText] = useState<string>('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(saved);
  }, []);

  const deleteCandidate = (id: number) => {
    const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
  };

  const getFilteredCandidates = () => {
    return savedCandidates.filter(candidate =>
      (candidate.name?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.location?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.email?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.company?.toLowerCase() ?? '').includes(filterText.toLowerCase()) ||
      (candidate.login?.toLowerCase() ?? '').includes(filterText.toLowerCase())
    );
  };

  return (
    <div>
      <h1>Saved Candidates</h1>
      <input
        type="text"
        placeholder="Filter candidates"
        value={filterText}
        onChange={handleFilter}
      />
      {getFilteredCandidates().length === 0 ? (
        <p>No candidates match your search.</p>
      ) : (
        <ul>
          {getFilteredCandidates().map(candidate => (
            <li key={candidate.id}>
              <CandidateCard candidate={candidate} />
              <button onClick={() => deleteCandidate(candidate.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SavedCandidates;
