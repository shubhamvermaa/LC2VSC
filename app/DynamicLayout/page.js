
import CodeMirrorComponent from '../components/CodeMirrorComponent';
export default function Question() {
    return (
        <>
            <h1>Dynamic Layout Parsing.</h1>
            <CodeMirrorComponent parserType = "dynamic"/>
            <h2>Usage:</h2>
            <h3>
                • Press Ctr+Shift+I --&gt; go to "element" tab --&gt; Right-Click on HTML --&gt; Copy-OuterHTML.<br></br>
                • Paste the copied HTML in the above editor, wait for few seconds as the dynamic layout HTML is very large in size.<br></br>
                • Click Parse to get parsed question, copy it to your clipboard and paste it in your CodeEditor.
            </h3>
        </>
    )
}
