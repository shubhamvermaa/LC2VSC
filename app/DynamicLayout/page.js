"use client"
import { useEffect, useState } from 'react';
import CodeMirrorComponent from '../components/CodeMirrorComponent';

export default function Question() {
  const [isClient, setIsClient] = useState(false);

  // Check if the component is running on the client side
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return (
    <>
      <h1>Dynamic Layout Parsing.</h1>

      {isClient && <CodeMirrorComponent parserType="dynamic" />}

      <h2>Usage:</h2>
      <h3>
        • Press Ctrl+Shift+I --&gt; go to "element" tab --&gt; Right-Click on HTML --&gt; Copy-OuterHTML.<br />
        • Paste the copied HTML in the above editor, wait for a few seconds as the dynamic layout HTML is very large in size.<br />
        • Click Parse to get parsed question, copy it to your clipboard and paste it in your CodeEditor.
      </h3>
    </>
  );
}
