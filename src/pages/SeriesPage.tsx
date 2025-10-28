import MediaListPage from '../components/templates/MediaListPage';
import SeriesCard from '../components/atoms/SeriesCard';
import { buildPath } from '../routes/paths';
import type { Series } from '../config/types';

export default function SeriesPage() {
  return (
    <MediaListPage<Series>
      mediaType="tv"
      title="Series"
      renderCard={(series, onClick) => (
        <SeriesCard
          key={series.id}
          series={series}
          onClick={onClick}
        />
      )}
      getItemYear={(series) => 
        series.first_air_date ? new Date(series.first_air_date).getFullYear() : null
      }
      getDetailsPath={(id) => buildPath.seriesDetails(id)}
    />
  );
}