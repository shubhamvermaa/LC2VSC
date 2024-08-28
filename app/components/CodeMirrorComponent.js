import {run2} from '../assets/main'
import {run} from '../assets/main'
import React, { useEffect, useRef } from 'react';
import CodeMirror from './../assets/codemirror';
import '../assets/codemirror/lib/codemirror.css';
import '../assets/codemirror/mode/clike/clike';
import '../assets/codemirror/theme/monokai.css';
import '../assets/codemirror/addon/edit/matchbrackets';
import '../assets/codemirror/addon/edit/closebrackets';
import './CodeMirrorComponent.css'; // Create a CSS file for custom styles
export default function CodeMirrorComponent({parserType}) {
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

        return () => {
            editor.toTextArea(); // Cleanup on unmount
        };
    }, []);
    const compileNow = () => {
        // Implement your compile function here
        if(parserType == "dynamic") run2();
        else run();
        // alert('Compile function not implemented');
    };
    
    const resetNow = () => {
        window.editor.setValue('');
    };
    
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
        <div>
            <input type="hidden" name="csrfmiddlewaretoken" value="roeeF50qMKmo7tXeQiX84YNTuib6rmV5lFGXmMrykiBY8MTbjm1c4e5MwEkltRv3" />
            <button type="button" className="Compile" onClick={compileNow}>{parserType == "dynamic"? "Parse Problem" : "Parse Contest"}</button>
            <button type="button" className="Copy" onClick={copyText}>Copy</button>
            <button type="button" className="Reset" onClick={resetNow}>Reset</button>
            <textarea id="editor" ref={editorRef}></textarea>
        </div>
    );
};
