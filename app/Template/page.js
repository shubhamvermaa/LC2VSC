"use client"
import React, { useEffect, useRef } from 'react';
import CodeMirror from './../assets/codemirror';
import '../assets/codemirror/lib/codemirror.css';
import '../assets/codemirror/mode/clike/clike';
import '../assets/codemirror/theme/monokai.css';
import '../assets/codemirror/addon/edit/matchbrackets';
import '../assets/codemirror/addon/edit/closebrackets';
import '../components/CodeMirrorComponent.css'; // Create a CSS file for custom styles
export default function Template() {
    const editorRef = useRef(null);
    useEffect(() => {
            const editor = CodeMirror.fromTextArea(editorRef.current, {
            mode: 'text/x-c++src',
            theme: 'monokai',
            autoCloseBrackets: true,
            lineNumbers: true,
            matchBrackets: true,
            smartIndent: true,
            indentWithTabs: true,
            indentUnit: 4,
        });
        // editor.setSize(1000, 500);

        window.editor = editor; // For global access to the editor
        // can use editor in run2() without passing as it is global now
        getLocal();

        return () => {
            editor.toTextArea(); // Cleanup on unmount
        };
    }, []);

    function save(){
        var src = window.editor.getValue();
        if(src.indexOf("<<samples>>")==-1){
            alert("In your template, you need to have \"<<samples>>\"");
            return;
        }
        if(src.indexOf("<<func_def>>")==-1){
            alert("In your template, you need to have \"<<func_def>>\"");
            return;
        }
        localStorage.setItem("TEMPLATE", src);
    }

    function reset(){
        window.editor.setValue("");
        localStorage.removeItem("TEMPLATE");
    }

    function getLocal(){
        var temp = localStorage.getItem("TEMPLATE");
        if(temp!=null){
            window.editor.setValue(temp);
        }else{
            var temp = `
#include <bits/stdc++.h>
using namespace std;

// your template goes above <<func_def>> line.

<<func_def>>


int main() {


<<samples>>

    return 0;
}
`;
            window.editor.setValue(temp);
        }
    }
    
    const copyText = () => {
        const src = window.editor.getValue();
        const el = document.createElement('textarea');
        el.value = src;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    };
    return (
        <>
            <h1>Save Custom Template!</h1>
            <div>
                <input type="hidden" name="csrfmiddlewaretoken" value="roeeF50qMKmo7tXeQiX84YNTuib6rmV5lFGXmMrykiBY8MTbjm1c4e5MwEkltRv3" />
                <button type="button" className="Compile" onClick={save}>Save Template</button>
                <button type="button" className="Copy" onClick={copyText}>Copy</button>
                <button type="button" className="Reset" onClick={reset}>Reset</button>
                <textarea id="editor" ref={editorRef}></textarea>
            </div>
            <h2> Usage:</h2>
            <h3>
                • DON'T TOUCH &lt;&lt;func_def&gt;&gt; and &lt;&lt;samples&gt;&gt; as they are target point of the website.<br></br>
                • Put your template in place of comment and press Save Template.<br></br>
                • Now parsed problem will contain you template.
            </h3>
        </>
    );
} 