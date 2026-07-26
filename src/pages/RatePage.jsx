import React from 'react';

const RatePage = () => {
  return (
    <>
      <div className="min-h-screen w-full flex items-center justify-center bg-gray-50"><div className="rounded-xl border bg-card text-card-foreground shadow w-full max-w-md mx-4"><div className="p-6 pt-6"><div className="flex mb-4 gap-2"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-alert h-8 w-8 text-danger" aria-hidden="true"><circle cx="12" cy="12" r="10"></circle><line x1="12" x2="12" y1="8" y2="12"></line><line x1="12" x2="12.01" y1="16" y2="16"></line></svg><h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1></div><p className="mt-4 text-sm text-gray-600">Did you forget to add the page to the router?</p></div></div></div><div role="region" aria-label="Notifications (F8)" tabIndex="-1" style={{ pointerEvents: 'none' }}><ol tabIndex="-1" className="fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]"></ol></div>
    </>
  );
};

export default RatePage;