'use client';

import Script from 'next/script';

declare global {
  interface Window {
    clarity?: (command: string, ...args: unknown[]) => void;
  }
}

export default function ClarityScript({ clarityId }: { clarityId: string }) {
  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");
        `
      }}
    />
  );
} 