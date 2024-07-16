"use client"
function getCodeSlug2(foo){// random problem
	let Lines = foo.getElementsByClassName("view-lines monaco-mouse-cursor-text");// Lines[1] contains the function name
	let str = []
	let temporaryStr = Lines[1].textContent;// it contains spcecial character "u+00a0", i.e, an invisible character
	console.log(temporaryStr);
	let modifiedStr = "";// removing all the special characters
	for(let i = 0; i < temporaryStr.length; i++) {
		if(temporaryStr[i] === ' ') modifiedStr += ' ';
		else modifiedStr += temporaryStr[i];
	}
	str.push(modifiedStr);
	
	let FirstOpenParentheses = str[0].indexOf('(');

	let funcName = "";
	for(let i = FirstOpenParentheses - 1; i >= 0; i--) {
		if(str[0].charAt(i) == ' ') break;
		else funcName = str[0].charAt(i) + funcName;
	}
	return [str,funcName];
}
function getCodeSlug(foo) {// contest
	var idx1= foo.indexOf("pageData =");
	foo=foo.slice(idx1);
	var idx2 = foo.indexOf("</script>");
	foo=foo.slice(0,idx2);
	let pageData;
	eval(foo);
	var codeSlug = pageData['codeDefinition'][0]['defaultCode'];
	var funcname = pageData['metaData']['name'];
	return [codeSlug,funcname];
}

// If any future breaks happen its most probably because of the tag, class name, id changes
function getSamples(data){// for contest Questions
	var doc = new DOMParser().parseFromString(data, "text/html");
	var dd = doc.getElementsByClassName('example-block');
	if(dd.length != 0) {
		let inputs = [], outputs = [];
		for(let i=0;i<dd.length;i++){
			let inout = dd[i].getElementsByTagName('p');
			let inputString = inout[0].innerText, outputString = inout[1].innerText;

			if(inputString.indexOf("Input:") != -1) {
				let inp = inputString.slice(inputString.indexOf("Input:") + "Input:".length).trim();
				inputs.push(inp);
			} else {
				let inp = inputString.trim();
				inputs.push(inp);
			}

			if(outputString.indexOf("Output:") != -1) {
				let out = outputString.slice(outputString.indexOf("Output:") + "Output:".length).trim();
				outputs.push(out);
			} else {
				let out = outputString.trim();
				outputs.push(out);
			}
		}
		return [inputs,outputs]
	}

	// Random Question Parsing
	var d = doc.getElementsByTagName('pre');
	let inputs = [], outputs = [];
	for(let i=0;i<Math.min(4, d.length);i++){// at max four examples are assumed in a question
		var preText = d[i].innerHTML;
		var input = preText.slice(preText.indexOf("<strong>Input:</strong>")+"<strong>Input:</strong>".length,preText.indexOf("<strong>Output:</strong>")).trim()
		var output = preText.slice(preText.indexOf("<strong>Output:</strong>")+"<strong>Output:</strong>".length)
		if (output.indexOf("<strong>")!=-1){
			output = output.slice(0,output.indexOf("<strong>"));
		}
		output=output.trim();
		if(input.length > 100 || output.length > 100) continue;
		inputs.push(input);
		outputs.push(output);
	}
	return [inputs,outputs]
}

function parse_input(input_string){
	input_string = input_string.split(', ')
	var data = []
	for(let i =0;i<input_string.length;i++){
		var varname = input_string[i].split('=')[0].trim();
		var vardata = input_string[i].split('=')[1].trim();
		data.push([varname,vardata]);
	}
	return data;
}
function isInt(n){
    return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
    return Number(n) === n && n % 1 !== 0;
}
function isBool(n){
    return typeof(n) == "boolean";
}
function isStr(n){
    return typeof(n) == "string";
}
function isList(a){
	return Array.isArray(a);
}
function getDatatype(data){
	if(isInt(data)){
		return "int";
	}else if(isFloat(data)){
		return "float";
	}else if(isBool(data)){
		return "bool";
	}else if(isStr(data)){
		return "string";
	}else if(isList(data)){
		var temp = getDatatype(data[0]);
		temp = `vector<${temp}>`;
		return temp;
	}else{
		console.log("Unknown Datatype : "+data);
		return "None";
	}
}


function jsontocpp(data,index){
	var res="";
	for(let i =0;i<data.length;i++){
		var varname = data[i][0];
		var datatype = getDatatype(JSON.parse(data[i][1]));
		var vardata = data[i][1];
		vardata = vardata.replaceAll("[","{");
        vardata = vardata.replaceAll("]","}");
        vardata = vardata.replaceAll("False","false");
        vardata = vardata.replaceAll("True","true");
		res += `${datatype} ${varname}${index} = ${vardata};`
		res += "\n\t"
		//console.log(varname+" - "+vardata);
	}
	return res;
}
function jsontocpp2(data,index){
		var res="";
	
		var varname = "output_";
		var datatype = getDatatype(JSON.parse(data));
		var vardata = data;
		vardata = vardata.replaceAll("[","{");
        vardata = vardata.replaceAll("]","}");
        vardata = vardata.replaceAll("False","false");
        vardata = vardata.replaceAll("True","true");
		res += `${datatype} ${varname}${index} = ${vardata};`
		res += "\n\t"
		//console.log(varname+" - "+vardata);
	
	return res;
}

function getSampleVariables(data,index){
	var res=[];
	for(let i =0;i<data.length;i++){
		var varname = data[i][0];
		res.push(`${varname}${index}`);
	}
	return res.join(",");
}

function generateChecker(samples,funcname){
	let inputs = samples[0];
	let outputs = samples[1];
	console.log(inputs);
	console.log(outputs);
	var parsed_inputs = [];
	for(let i=0;i<inputs.length;i++){
		parsed_inputs.push(parse_input(inputs[i]));
	}
	var res="";
	for(let i=0;i<inputs.length;i++){
		var x=parsed_inputs[i];
        var y=outputs[i];
		res+=jsontocpp(x,i+1);
		res+=jsontocpp2(y,i+1);
		res+=`if(object.${funcname}(${getSampleVariables(x,i+1)})==output_${i+1}){\n\t\tcout << "Sample #${i+1} : Accepted" << endl;\n\t}else{\n\t\tcout << "Sample #${i+1} : Wrong Answer" << endl;\n\t}`
		res +="\n"
		res +="\n\t"
	}
	return res;
}

function getTemplate(){
	var temp = localStorage.getItem("TEMPLATE");
	if(temp!=null){
		return temp;
	}
	temp = `
#include <bits/stdc++.h>
using namespace std;



<<func_def>>


int main() {
	
<<samples>>


	return 0;
}
	`	
	return temp;
}

function generateCode(codeSlug,samples,funcname){
	var TEMPLATE = getTemplate();
	TEMPLATE=TEMPLATE.replace("<<func_def>>",codeSlug);
	TEMPLATE=TEMPLATE.replace("<<samples>>","\tSolution object;\n\t"+generateChecker(samples,funcname));
	return TEMPLATE;
}

export function run(){
	let data = editor.getValue();
	var codeSlug = getCodeSlug(data)[0];
	var funcname = getCodeSlug(data)[1];
	var samples = getSamples(data);
	editor.setValue(generateCode(codeSlug,samples,funcname));
}

export function run2(){// question parsing
	console.log("run2 RAN");
	// console.log(code);
	var data = editor.getValue();// editor is defined globally, from where editor is called
	var temp = new DOMParser().parseFromString(data, "text/html");
	let getCodeSlugReturn = getCodeSlug2(temp);
	var codeSlug = getCodeSlugReturn[0];
	var funcname = getCodeSlugReturn[1];
	var samples = getSamples(data);
	editor.setValue(generateCode(codeSlug,samples,funcname));
	// console.log(codeSlug);
}

