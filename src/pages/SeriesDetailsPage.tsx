import MediaDetailsPage from '../components/templates/MediaDetailsPage';
import type { SeriesDetails } from '../config/interfaces';

export default function SeriesDetailsPage() {
  const config = {
    mediaType: 'tv' as const,
    getTitle: (series: SeriesDetails) => series.name,
    getReleaseInfo: (series: SeriesDetails) => new Date(series.first_air_date).getFullYear().toString(),
    getAdditionalInfo: (series: SeriesDetails) => `${series.number_of_seasons} season${series.number_of_seasons > 1 ? 's' : ''}`,
    backPath: '/series',
    backLabel: 'Series'
  };

  return <MediaDetailsPage config={config} />;
}
