import React from 'react';
import './App.css';

class App extends React.Component {
  state = {
    memes: [],
    loading: false,
    text: '',
  }

  onSubmit = async (e) => { //getmemes
    e.preventDefault()
    this.setState({ loading: true })
    var key = '7ntM9FAKZtqUr6oxw8G3YQapuWnXavZK'
    var url = `http://api.giphy.com/v1/gifs/search?q=${this.state.text}&api_key=${key}`
    var r = await fetch(url)
    var json = await r.json()
    this.setState({ memes: json.data, loading: false, text: '' })
  }

  render() {
    var { memes, loading, text } = this.state
    return (
      <div className="App">
        <form className="App-header" onSubmit={this.onSubmit}>
          <input value={text}
            onChange={e => this.setState({ text: e.target.value })}
          />
          <button disabled={loading || !text} type="submit">
            Search
            </button>
        </form>
        <main>
          {memes.map(meme => {
            return <Meme key={meme.id} meme={meme} />
            function Meme(props){
              const {meme} = props
              const url = meme.images.fixed_height.url
              return (<div className="meme-wrap" onClick={()=>window.open(url, '_blank')}>
                <img height="200" alt="meme" src={url} />
              </div>)
            }
          })}
        </main>
      </div>
    );
  }
}

export default App;
