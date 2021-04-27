const Item = (props) => {
    const text = props.text.split('/')
    return(
    <li>
        <img width="40" height="40" src="https://icon-library.com/images/default-profile-icon/default-profile-icon-24.jpg"></img>
        Name: 
        {"  " + text[0]}
        <br/>
        Description: 
        {"  " + text[1]}
    </li>)
}

const Box = (props) => {
    const { onChange, onKeyDown, text } = props
    return (
        <input name = "newItemText"
        type = "text"
        value = {text}
        onChange = {onChange}
        onKeyDown = {onKeyDown}
        />
    );
}

class App extends React.Component {
    state = {
        toDoList: [ "cos/opis cosia", "innecos/opis innego cosia" ],
        newItemText: "",
        newDescriptionText: "",
        displayError: false
    }

    errorText = "This value is incorrect"

    handleInputNameChange = (event) => {
        this.setState({
            newItemText: event.target.value
        })
    }

    handleInputDescriptionChange = (event) => {
        this.setState({
            newDescriptionText: event.target.value
        })
    }

    handleKey = (event) => {
        if (event.code === "Enter"){
            if (this.state.newItemText === "" 
                || this.state.newDescriptionText === ""  
                || this.state.toDoList.includes(this.state.newItemText)
                || this.state.newItemText.includes("/")
                || this.state.newDescriptionText.includes("/")) {
                this.setState({displayError: true})
            } else {
                this.setState({
                    toDoList: this.state.toDoList.concat(this.state.newItemText + "/" + this.state.newDescriptionText),
                    newItemText : "",
                    newDescriptionText : "",
                    displayError: false
                })
            }
        } else {
            this.setState({displayError: false})
        }
    }

    render() {
        const listToRender = this.state.toDoList.map(it => (
            <Item key={it} text={it}/>
        ))


        return (
            <React.Fragment>
                <h2>Developer Tinder</h2>
                <span className = "boxText">Name:</span>
                <Box
                    text = {this.state.newItemText}
                    onChange ={this.handleInputNameChange}
                    onKeyDown = {this.handleKey}
                />
            
                <span className = "boxText">Description:</span>
                <Box
                    text = {this.state.newDescriptionText}
                    onChange ={this.handleInputDescriptionChange}
                    onKeyDown = {this.handleKey}
                />
                
                {this.state.displayError && <h1 style={{color : "red"}} className="abc">{this.errorText}</h1>}
                
                <ul>
                   {listToRender}
                </ul>
            </React.Fragment>
        );
    }
}

ReactDOM.render(
    <App/>,
    document.getElementById('root')
  );