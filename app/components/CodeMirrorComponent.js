"use client"
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
        if(parserType == "template") getLocal();
        return () => {
            editor.toTextArea(); // Cleanup on unmount
        };
    }, []);

    const compileNow = () => {
        // Implement your compile function here
        if(parserType == "dynamic") run2();
        else if(parserType == "template") save();
        else run();
        // alert('Compile function not implemented');
    };
    
    const resetNow = () => {
        window.editor.setValue('');
    };
    
    // template logic
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
        <div>
            <input type="hidden" name="csrfmiddlewaretoken" value="roeeF50qMKmo7tXeQiX84YNTuib6rmV5lFGXmMrykiBY8MTbjm1c4e5MwEkltRv3" />
            <button type="button" className="Compile" onClick={compileNow}>{parserType == "dynamic"? "Parse Problem" : (parserType == "contest" ? "Parse Contest" : "Save Template")}</button>
            <button type="button" className="Copy" onClick={copyText}>Copy</button>
            <button type="button" className="Reset" onClick={parserType == "template" ? reset : resetNow}>Reset</button>
            <textarea id="editor" ref={editorRef}></textarea>
        </div>
    );
};
