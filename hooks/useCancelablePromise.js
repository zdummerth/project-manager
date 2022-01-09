import React, { useRef, useEffect } from 'react'

//https://rajeshnaroth.medium.com/writing-a-react-hook-to-cancel-promises-when-a-component-unmounts-526efabf251f

export function makeCancelable(promise) {
    let isCanceled = false
    const wrappedPromise = new Promise((resolve, reject) => {
        promise
            .then((val) => (isCanceled ? reject({ isCanceled }) : resolve(val)))
            .catch((error) => (isCanceled ? reject({ isCanceled }) : reject(error)));
    });
    return {
        promise: wrappedPromise,
        cancel() {
            isCanceled = true;
        },
    };
}

export function useCancellablePromise() {
    const promises = useRef();

    useEffect(
        () => {
            promises.current = promises.current || [];
            return function cancel() {
                promises.current.forEach(p => p.cancel());
                promises.current = [];
            };
        }, []
    );

    function cancellablePromise(p) {
        const cPromise = makeCancelable(p);
        promises.current.push(cPromise);
        return cPromise.promise;
    }

    return { cancellablePromise };
}