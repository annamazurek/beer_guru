import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import InfiniteScroll from "react-infinite-scroll-component";


class Beers extends Component {
  state = {
    beers: [],
    items: Array.from({ length: 20 }),
    per: 20,
    page: 1,
    // totalPages: null,
    // scrolling: false
  }

  componentDidMount() {
    this.loadBeers();
  }

  loadBeers = () => {
    const { per, page, beers } = this.state;
    const url = `https://api.punkapi.com/v2/beers?page=${page}&per_page=${per}`;
    fetch(url)
      .then(res => res.json())
      .then(res => {
          this.setState({
            beers: [...beers, ...res],
            // scrolling: false,
            // totalPages: res.total_pages
          })
        })
  }

  loadMore = () => {
    const loader = document.querySelector('.loader');
    loader.removeAttribute('hidden');

    this.setState(prevState => ({
      items: this.state.items.concat(Array.from({ length: 20 })),
      page: prevState.page + 1,
      // scrolling: true
    }), this.loadBeers)
  }

  render() {
    const beers = this.state.beers;
    const beersList = beers.map(beer => {
      return (
        <Link to={'/' + beer.id}>
          <li className="Beers-list__item" key={beer.id}>
            <img className="Beers-list__img" src={ beer.image_url } alt={'Bottle of beer: ' + beer.name} />
            <h2 className="Beers-list__name" title={beer.name}>{ beer.name }</h2>
            <p className="Beers-list__tag" title={beer.tagline}>{ beer.tagline }</p>
          </li>
        </Link>
      )
    })

    return (
        <div className="Beers">
          <ul className="Beers-list">
            <InfiniteScroll
              dataLength={this.state.items.length}
              next={this.loadMore}
              hasMore={true}
              loader={<div className="loader"></div>}
              scrollThreshold={.95}
            >
              { beersList }
            </InfiniteScroll>
          </ul>
        </div>
    );
  }
}

export default Beers;