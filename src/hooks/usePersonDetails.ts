import { useState, useEffect } from 'react';
import { personService } from '../services/personService';
import type { Person, MovieCredits, SeriesCredits } from '../types/domain';

export function usePersonDetails(personId: number | undefined) {
  const [person, setPerson] = useState<Person | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCredits | null>(null);
  const [tvCredits, setTvCredits] = useState<SeriesCredits | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!personId) return;

    const fetchPersonData = async () => {
      try {
        setLoading(true);
        setError(null);

        const [personData, movieCreditsData, tvCreditsData] = await Promise.all([
          personService.getPersonDetails(personId),
          personService.getPersonMovieCredits(personId),
          personService.getPersonTvCredits(personId),
        ]);

        setPerson(personData);
        setMovieCredits(movieCreditsData);
        setTvCredits(tvCreditsData);
      } catch {
        setError('Error loading person information.');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonData();
  }, [personId]);

  return { person, movieCredits, tvCredits, loading, error };
}
