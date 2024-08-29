import dynamic from 'next/dynamic';

const CodeMirrorComponent = dynamic(() => import('../components/CodeMirrorComponent'), {
  ssr: false
});
export default function Template() {
    return (
        <>
            <h1>Save Custom Template!</h1>
            <CodeMirrorComponent parserType = "template"/>
            <h2> Usage:</h2>
            <h3>
                • DON'T TOUCH &lt;&lt;func_def&gt;&gt; and &lt;&lt;samples&gt;&gt; as they are target point of the website.<br></br>
                • Put your template in place of comment and press Save Template.<br></br>
                • Now parsed problem will contain you template.
            </h3>
        </>
    );
} 