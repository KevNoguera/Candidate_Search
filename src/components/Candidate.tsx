import React from 'react';
import Candidate from '../interfaces/Candidate.interface';
import '../pages/Candidate.css';

interface CandidateCardProps {
  candidate: Candidate;
}
const CandidateCard: React.FC<CandidateCardProps> = ({ candidate }) => {
  return (
    <li className="candidate-card" key={candidate.id}>
      <p></p>
      <img src={candidate.avatar_url} alt={candidate.login} width="50" />
      <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
        {candidate.login}
      </a>
      <p></p>
      <p>Name: {candidate.name || 'info is missing'}</p>
      <p></p>
      <p>Bio: {candidate.bio || 'info is missing'}</p>
      <p></p>
      <p>Location: {candidate.location || 'info is missing'}</p>
      <p></p>
      <p>Email: {candidate.email || 'info is missing'}</p>
      <p></p>
      <p>Company: {candidate.company || 'info is missing'}</p>
    </li>
  );
};

export default CandidateCard;