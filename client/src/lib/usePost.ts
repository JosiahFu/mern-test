import { useCallback } from 'react';

function usePost<T>(requestUri: string) {
    const sendFunction = useCallback((value: T) => {
        fetch(requestUri, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(value),
        });
    }, [requestUri]);

    return sendFunction;
}

export { usePost };
