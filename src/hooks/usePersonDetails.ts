/**
 * 👤 HOOK: usePersonDetails
 * =========================
 * Hook para obtener detalles completos de una persona (actor/director).
 * Incluye biografía y filmografía.
 */

import { useState, useEffect } from 'react';
import { tmdb } from '../config/tmdb';
import type { PersonDetails, MovieCredit, TVCredit } from '../config/types';

interface UsePersonDetailsResult {
  person: PersonDetails | null;
  movieCredits: MovieCredit[];
  tvCredits: TVCredit[];
  loading: boolean;
  error: string | null;
}

export function usePersonDetails(personId: string): UsePersonDetailsResult {
  const [person, setPerson] = useState<PersonDetails | null>(null);
  const [movieCredits, setMovieCredits] = useState<MovieCredit[]>([]);
  const [tvCredits, setTvCredits] = useState<TVCredit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonDetails = async () => {
      if (!personId) return;

      setLoading(true);
      setError(null);

      try {
        const [personData, creditsData] = await Promise.all([
          tmdb.get(`/person/${personId}`),
          tmdb.get(`/person/${personId}/movie_credits`)
        ]);

        setPerson(personData);
        
        const sortedMovieCredits = creditsData.cast
          .filter((credit: MovieCredit) => credit.poster_path)
          .sort((a: MovieCredit, b: MovieCredit) => {
            if (b.popularity !== a.popularity) {
              return b.popularity - a.popularity;
            }
            return new Date(b.release_date || '').getTime() - new Date(a.release_date || '').getTime();
          })
          .slice(0, 20); 

        setMovieCredits(sortedMovieCredits);

        try {
          const tvCreditsData = await tmdb.get(`/person/${personId}/tv_credits`);
          const sortedTvCredits = tvCreditsData.cast
            .filter((credit: TVCredit) => credit.poster_path)
            .sort((a: TVCredit, b: TVCredit) => {
              if (b.popularity !== a.popularity) {
                return b.popularity - a.popularity;
              }
              return new Date(b.first_air_date || '').getTime() - new Date(a.first_air_date || '').getTime();
            })
            .slice(0, 10); 

          setTvCredits(sortedTvCredits);
        } catch (tvError) {
          console.warn('Error fetching TV credits:', tvError);
          setTvCredits([]);
        }

      } catch (err) {
        setError('Error loading person details. Please try again.');
        console.error('Error fetching person details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPersonDetails();
  }, [personId]);

  return { person, movieCredits, tvCredits, loading, error };
}