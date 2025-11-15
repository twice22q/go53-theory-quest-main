import React from 'react';
import QuestionInterface from '../components/QuestionInterface';
import { useSearchParams } from 'react-router-dom';

const Practice: React.FC = () => {
  const [searchParams] = useSearchParams();
  const mode = searchParams.get('mode') || 'quick';

  return (
    <QuestionInterface mode={mode} />
  );
};

export default Practice;