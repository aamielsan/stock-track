import { useEffect, useState, useCallback } from 'react';
import { FetchHelpers } from 'src/types';
import { LocationType, findAllLocationType } from 'src/services/locationType';

export function useLocationTypeList(): [LocationType[], FetchHelpers] {
  // Hooks
  const [list, setList] = useState<LocationType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Methods
  const fetchList = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const res = await findAllLocationType();
      setList(res);
    } catch (e) {
      setError(e.message);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  return [list, { loading, error, refetch: fetchList }];
}
