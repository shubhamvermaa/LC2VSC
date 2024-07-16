export default function RootRoute() {
    const h1style = {fontSize: 80}
    const maindiv = {paddingLeft:20, paddingRight:20}
    const usage = {color: "red"};
    return (
        
        <div style = {maindiv}>
            <h1 style={h1style}>Hello World.</h1>
            <div>
                <h2>
                    I, <a href = "https://github.com/shubhamvermaa">Shubham Verma</a>, maintain this website that parses the LeetCode problems, allowing us 
                    to solve them on our favorite IDE's, with our template.
                    <br></br>
                    I implemented the functionality to parse any LeetCode Problem and updated the parsing algorithm of the LeetCode contest as per new tag format.
                    <br></br>
                    <br></br>
                    <div><span style = {usage}>Usage: </span>Steps are given under respective section.</div>
                    <br></br>
                </h2>
                <h1>Features:</h1>
                <h3>
                    • Supports new dynamic layout.
                    <br></br>
                    • Works best with old contest layout.
                    <br></br>
                    • Support for custom template.
                </h3>
                <div>
                    <span style = {usage}>Disclaimer: </span>
                    Problems involving LinkedList and TreeNodes are partially supported. Still you can parse the problem to get the skeleton.
                </div>
            </div>
        </div>
    )
}
