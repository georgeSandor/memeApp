import React, {Component} from 'react';

class MemeGenerator extends Component {
    constructor() {
        super()
        this.state = {
            topText: "",
            bottomText: "",
            image: <img src="http://i.imgflip.com/1bij.jpg" alt=""/>,
            randomImg: "http://i.imgflip.com/1bij.jpg",
            allMemeImgs: [],
            topText: "",
            bottomText:""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleGenerate = this.handleGenerate.bind(this)
    }

    componentDidMount() {
        fetch('https://api.imgflip.com/get_memes')
        .then(response => response.json())
        .then((response) => {
           const {memes} = response.data;
           this.setState({
               allMemeImgs: memes
           })
      })
    }

    handleChange(event) {
        const {name,value} = event.target;
        this.setState({ [name]: value });
    }

    handleGenerate(event) {
        event.preventDefault();
        let allImages = this.state.allMemeImgs.map((element) => {
            return element.url;
        })
        let randomImgPicker = allImages[Math.floor(Math.random() * allImages.length)];
        this.setState({
            randomImg: randomImgPicker
        })
    }

    render() {
        return (
            <div>
                <form className="meme-form">
                    <input 
                        type="text" 
                        name="topText"
                        placeholder="Top Text" 
                        value={this.state.topText} 
                        onChange={this.handleChange}></input>

                    <input 
                        type="text" 
                        name="bottomText" 
                        placeholder="Bottom Text"
                        value={this.state.bottomText} 
                        onChange={this.handleChange}></input>

                    <button onClick={this.handleGenerate}>Generate</button>
                </form>
                <div className="meme">
                    <img src={this.state.randomImg} alt="" />
                    <h2 className="top">{this.state.topText}</h2>
                    <h2 className="bottom">{this.state.bottomText}</h2>
                </div>
            </div>
        )
    }
}

export default MemeGenerator