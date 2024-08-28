import { useEffect, useState } from 'react';
import CodeMirrorComponent from '../components/CodeMirrorComponent';

export default function Contest() {
  const [isClient, setIsClient] = useState(false);

  // Check if the component is running on the client side
  useEffect(() => {
    if (typeof navigator !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  return (
    <>
      <h1>Old Contest Layout Parsing.</h1>

      {isClient && <CodeMirrorComponent parserType="contest" />}

      <h2>Usage:</h2>
      <h3>
        • Open the problem --&gt; Right-Click on the page  --&gt; Click View Page Source --&gt; Copy the content of the page source.<br></br>
        • Paste the copied HTML in the above editor.<br></br>
        • Click Parse to get parsed question, copy it to your clipboard and paste it in your CodeEditor.
      </h3>
    </>
  );
}
