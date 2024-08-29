import dynamic from 'next/dynamic';

const CodeMirrorComponent = dynamic(() => import('../components/CodeMirrorComponent'), {
  ssr: false
});
export default function Contest() {
    return (
        <>
            <h1>Old Contest Layout Parsing.</h1>
            <CodeMirrorComponent parserType = "contest"/>
            <h2>Usage:</h2>
            <h3>
                • Open the problem --&gt; Right-Click on the page  --&gt; Click View Page Source --&gt; Copy the content of the page source.<br></br>
                • Paste the copied HTML in the above editor.<br></br>
                • Click Parse to get parsed question, copy it to your clipboard and paste it in your CodeEditor.
            </h3>
        </>
    )
}