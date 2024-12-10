import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import CandidateCard from '../components/Candidate';
import Candidate from '../interfaces/Candidate.interface';
import '../pages/CandidateSearch.css';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidates = async () => {
      setLoading(true);
      const data = await searchGithub();
      setCandidates(data);
      setLoading(false);
    };
    fetchCandidates();
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const data = await searchGithubUser(searchTerm);
    setCandidates([data]);
    setLoading(false);
  };

  const saveToLocalStorage = (candidate: Candidate) => {
    const savedCandidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    savedCandidates.push(candidate);
    localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
  };

  const handleSave = () => {
    if (candidates[currentIndex]) {
      saveToLocalStorage(candidates[currentIndex]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div>
      <h1>Candidate Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search candidates"
        />
        <button type="submit">Search</button>
      </form>
      {loading ? (
        <p>Loading...</p>
      ) : (
        candidates.map((candidate) => (
          <div key={candidate.id}>
            <CandidateCard candidate={candidate} />
            <button onClick={handleSave}>Save</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CandidateSearch;