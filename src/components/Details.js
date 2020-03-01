import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Details extends Component {
  state = {
    beer: {
      food_pairing: []
    },
    similarBeers: [],
  }

  componentDidMount(){
    let id = this.props.match.params.beer_id;
    let url = `https://api.punkapi.com/v2/beers/${id}`;
    
    fetch(url)
      .then(res => res.json())
      .then(res => {
        this.setState({
          beer: res[0]
        })
      })
      .then(res => {
        const {ibu, abv, ebc, id} = this.state.beer;

        let url = `https://api.punkapi.com/v2/beers?ibu_lt=${ibu+10}&ibu_gt=${ibu-10>=0?ibu-10:1}&abv_lt=${abv+4}&abv_gt=${abv-4>=0?abv-4:1}&ebc_lt=${ebc+8}&ebc_gt=${ebc-10>=0?ebc-10:1}`
    
        fetch(url)
          .then(res => res.json())
          .then(res => {
            const similarBeersList = res.filter(similar => similar.id !== id);
            let random3Beers = Array.from({length: 3}, () => similarBeersList[Math.floor(Math.random()*similarBeersList.length)]);

            this.setState({
              similarBeers: random3Beers
            })
          })
          .catch(err => console.error(err))
      })
     
  }

  handleClick = (e) => {
    e.stopPropagation()
    this.props.history.push('/beer_guru');
  }

  render(){
    const { beer } = this.state;
    const foodPair = beer.food_pairing;
    const foodPairList = foodPair.map(food => {
      return (
        <li className="Details__pairing-item"> { food }</li>
      )
    })

    const simBeers = this.state.similarBeers.map(beer => {
      return(
        <Link to={'/beer_guru/' + beer.id}>
          <div className="Details__similar-beer">
            <img src={beer.image_url} className="Details__similar-img" alt={"Beer: " + beer.name}/>
            <p className="Details__similar-name" title={ beer.name }>{beer.name}</p>
          </div>
        </Link>
      )
    })

    return (
      <div className="Details--background-grey" onClickCapture={this.handleClick} id="popup">
        <div className="Details">
        
          <div className="Details-main">
            <img className="Details__img" src={ beer.image_url } alt={'Bottle of beer: ' + beer.name} />
            <section>
              <h3 className="Details__header">{ beer.name }</h3>
              <p className="Details__tag">{ beer.tagline }</p>
              <span className="Details__params"><strong>IBU:</strong> { beer.ibu }</span>
              <span className="Details__params"><strong>ABV:</strong> { beer.abv }%</span>
              <span className="Details__params"><strong>EBC:</strong> { beer.ebc }</span>
              <p className="Details__desc">{ beer.description }</p>
              <p className="Details__pairing">Best served with:</p>
              <ul className="Details__pairing-list">
                { foodPairList }
              </ul>
            </section>
          </div>

          <section className="Details__similar">
            <h4 className="Details__similar-header">You might also like:</h4>
              <div className="Details__similar-container">
                { simBeers }
              </div>
          </section>
        </div>
      </div>

    )
  } 
}

export default Details;