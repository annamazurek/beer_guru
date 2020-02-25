import React, { Component } from 'react';

class Beers extends Component {
  state = {
    beers: [],
    per: 20,
    page: 1,
    // totalPages: null,
    // scrolling: false
  }

  componentDidMount() {
    this.loadBeers();
    this.scrollListener = window.addEventListener('scroll', (e) => {
      this.handleScroll(e);
    })
  }

  handleScroll = (e) => {
    // const { scrolling, totalPages, page } = this.state;
    // if (scrolling) return;
    // if (totalPages <= page) return;
    const lastLi = document.querySelector('.Beers-list > li:last-child');
    // lastLiOffset = distance of the current element relative to the top of the offsetParent node + the inner height of an element in pixels
    const lastLiOffset = lastLi.offsetTop + lastLi.clientHeight;
    // pageOffset = the number of pixels the document is currently scrolled along the vertical axis + the interior height of the window in pixels
    const pageOffset = window.pageYOffset + window.innerHeight;
    let bottomOffset = 20;
    if(pageOffset > lastLiOffset - bottomOffset) this.loadMore();
    console.log(11)
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
          { beersList }
        </ul>
      </div>
    );
  }
}

export default Beers;