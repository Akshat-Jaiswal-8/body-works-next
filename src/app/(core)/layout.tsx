import React from 'react';

const NestedRouteLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className={
        'relative container mt-[calc(var(--navbar-height)+2rem)] h-full w-full overflow-x-hidden'
      }
    >
      <main className={'min-h-[50vh]'}>{children}</main>
    </div>
  );
};

export default NestedRouteLayout;
