import React from "react";


export function withSuspense<CP>(Component: React.ComponentType<CP>) {
    return (props: CP) => {
        return <React.Suspense fallback={<div>loading...</div>} >
            <Component {...props} />
        </React.Suspense>
    };
}