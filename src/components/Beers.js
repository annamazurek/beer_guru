import React, { Component } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";


class Beers extends Component {
  state = {
    items: Array.from({ length: 20 }),
    beers: [],
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
        <li className="Beers-list__item" key={beer.id}>
          <img className="Beers-list__img" src={ beer.image_url }/>
          <h2 className="Beers-list__name" title={beer.name}>{ beer.name }</h2>
          <p className="Beers-list__tag" title={beer.tagline}>{ beer.tagline }</p>
        </li>
      )
    })

    return (
      <div className="Beers">
        <ul className="Beers-list">
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.loadMore}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            { beersList }
          </InfiniteScroll>
        </ul>
      </div>
    );
  }
}

export default Beers;