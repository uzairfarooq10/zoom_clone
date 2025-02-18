import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';

export const useGetCallById = (callId: string | string[]) => {
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  const client = useStreamVideoClient();

  useEffect(() => {
    if (!client || !callId) return;

    const loadCall = async () => {
      try {
        const { calls } = await client.queryCalls({
          filter_conditions: {
            id: callId,
          },
        });

        if (calls.length > 0) {
          setCall(calls[0]);
        } else {
          // setCall(undefined);
        }
      } catch (error) {
        console.error('Error fetching call:', error);
        // setCall(undefined);
      } finally {
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, callId]);

  return { call, isCallLoading };
};
