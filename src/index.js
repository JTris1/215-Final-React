import { render } from '@testing-library/react';
import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';

let instruments = [
    {
        name: "American Professional II Stratocaster",
        type: "Guitar",
        price: 1699.99,
        brand: "Fender",
        imgSrc: "assets/img/fender-amprofessional2-thumbnail.jpg",
        color: "red"
    },
    {
        name: "YC61 61-Key Stage Keyboard",
        type: "Keyboard",
        price: 1999.99,
        brand: "Yamaha",
        imgSrc: "assets/img/yamaha-keyboard-thumbnail.jpg",
        color: "green"
    },
    {
        name: "EM100C Messiah Dreadnought Cutaway",
        type: "Guitar",
        price: 3999.00,
        brand: "Maton",
        imgSrc: "assets/img/maton-em100c.webp",
        color: "blue"
    },
    {
        name: "Player Plus Nashville Telecaster",
        type: "Guitar",
        price: 1129.99,
        brand: "Fender",
        imgSrc: "assets/img/fender-playerplus-thumbnail.jpg",
        color: "red"
    },
    {
        name: "Rydeen 5-Piece Shell Pack - 22 in. Bass Drum",
        type: "Drums",
        price: 419.99,
        brand: "Yamaha",
        imgSrc: "assets/img/yamaha-drums-thumbail.jpg",
        color: "green"
    },
    {
        name: "All-Blackwood EBW-70C Dreadnought",
        type: "Guitar",
        price: 1999.00,
        brand: "Maton",
        imgSrc: "assets/img/maton-ebw70c.webp",
        color: "blue"
    }
];

function Popup(props) {
    return ReactDOM.createPortal (
        <>
            <div className="popup-bg"></div>
            <div className="popup">
                <img src={props.imgSrc} alt="Instrument"></img>
                <h1 className="name">{props.name}</h1>
                <h2 className="brand">{props.brand}</h2>
                <button>Add to Cart</button>
            </div>
        </>,
        document.getElementById('portal')
    )
}

class AddToCart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: true
        };
    }

    addToCart() {
        this.props.toggleShow();
        
    }

    render() {
        return(
            this.state.show ? <button onClick={() => this.addToCart()}>Add to Cart</button> : null
        );
    }
}

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
            show: true,
        };

        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({
            show: !this.state.show
        });
    }

    renderAddToCart(key) {
        return (
            <AddToCart key={parseInt(key)} toggleShow={this.toggleShow} />
        )
    }

    renderPopup(imgSrc, name, brand, color) {
        return (
            <div>
                <Popup imgSrc={this.props.imgSrc} name={this.props.name} brand={this.props.brand} color={this.props.color} />
            </div>
        ) 
    }

    renderItem() {
        let classes = 'content';
        classes += ' ' + this.props.color;
        return(
            <div className={classes} onClick={() => this.setState({showPopup : !(this.state.showPopup)})}>
                <img
                    src={this.props.imgSrc} 
                    alt="Instrument">
                </img>
                <h1 className="name">{this.props.name}</h1>
                <h2 className="brand">{this.props.brand}</h2>
                {this.state.showPopup ? this.renderPopup() : null}
            </div>
        )
    }

    render() {
        return (
            <>
                {this.state.show ? this.renderItem() : null}
                {this.state.show ? this.renderAddToCart(1) : null}
            </>
        )
    }
    
}

class Cards extends React.Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         show: true
    //     };

    //     // this.toggleShow = this.toggleShow.bind(this);
    // }

    // toggleShow() {
    //     this.setState({
    //         show: !this.state.show
    //     });
    //     console.log("toggleShow()")
    // }

    createItem(key, imgSrc, name, brand, color) {
        return(
            <Item key={key} toggleShow={this.toggleShow} imgSrc={imgSrc} name={name} brand={brand} color={color}/>
        )
    }

    // createAddToCart(key) {
    //     return(
    //         <AddToCart key={parseInt(key)} toggleShow={this.toggleShow} />
    //     )
    // }

    render() {
        let list = instruments.slice();
        let renderList = [];
        for (let i in list) {
            renderList.push(
                <div className="card">
                    {this.createItem((parseInt(i) + 1), list[i].imgSrc, list[i].name, list[i].brand, list[i].color)}
                    {/* {this.createAddToCart(parseInt(i) * -1)} */}
                </div>)
        }

        return(
            <div className="cards-wrapper">
                {renderList}
            </div>
        );
    }
}

class Listings extends React.Component {
    render() {
        return (
            <div className="listings">
                <Cards />
            </div>
        )
    }
}

class CartItem extends React.Component {
    render() {
        return ReactDOM.createPortal (
            <div className="cart-item">
                <div className="info">
                    <h3 className="name">{this.props.name}</h3>
                    <h4 className="brand">{this.props.brand}</h4>
                    <h4 className="price">{this.props.price}</h4>
                </div>
                <button>Remove</button>
            </div>,
            document.getElementById("cart-items")
        )
    }
}

class Cart extends React.Component {
    render() {
        return (
            <div className="cart">
                <div className="header">
                    <h1>Cart</h1>
                </div>
                <div id="cart-items">
                    {/* ADDED THROUGH PORTAL */}
                </div>
            </div>
        )
    }
}


ReactDOM.render(
    <>
        <Listings />
        <Cart />
    </>,
    document.getElementById('root')
  );