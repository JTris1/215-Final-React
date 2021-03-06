//
//
// IDEA
//
// Move add button to the items container, and then try to render an item. That way no portals are needed on the page (at least I think)

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

let list = instruments.slice();
let renderList = [];

function CartItem(props) {
    return ReactDOM.createPortal (
        <div className="cart-item">
            <div className="info">
                <h3 className="name">{props.name}</h3>
                <h4 className="brand">{props.brand}</h4>
                <h4 className="price">${props.price}</h4>
            </div>
            <button onClick={() => props.toggleShow()}>Remove</button>
        </div>,
        document.getElementById('cart-items')
    )
}

class PopupForm extends React.Component {
    addItem(name, brand, price) {
        this.props.toggleShow();

        return ReactDOM.createPortal (
            <Item key={100} name={name} brand={brand} price={price} />,
            document.getElementById('cards-wrapper')
        );
    }

    render() {
        return (
            <>
                <div className="popup-bg"></div>
                <div className="popup">
                    <div>
                        <input type="text" name="name" placeholder="Name"></input>
                        <input type="text" name="brand" placeholder="Brand"></input>
                        <input type="text" name="price" placeholder="Price"></input>
                        <button onClick={() => this.addItem()}>Add</button>
                    </div>
                </div>
            </>
        )
    }
}

function Popup(props) {
    return ReactDOM.createPortal (
        <>
            <div className="popup-bg"></div>
            <div className="popup">
                <img src={props.imgSrc} alt="Instrument"></img>
                <h1 className="name">{props.name}</h1>
                <h2 className="brand">{props.brand}</h2>
                <h2 className="price">${props.price}</h2>
                <h3 className="type">{props.type}</h3>
                <button onClick={() => props.toggleShow()}>Add to Cart</button>
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

    render() {
        return(
            this.state.show ? <button onClick={() => this.props.toggleShow()}>Add to Cart</button> : null
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
        
        for(let i in list) {
            if(list[i].name === this.props.name) {
                list.splice(i, 1);
                break;
            }
            else {
                list.push({name: this.props.name, type: this.props.type, price: this.props.price, brand: this.props.brand, imgSrc: this.props.imgSrc, color: this.props.color});
                break;
            }
        }
    }

    renderCartItem() {
        return (
            <CartItem name={this.props.name} brand={this.props.brand} price={this.props.price} toggleShow={this.toggleShow} />
        )
    }

    renderAddToCart(key) {
        return (
            <AddToCart key={parseInt(key)} name={this.props.name} brand={this.props.brand} price={this.props.price} toggleShow={this.toggleShow} />
        )
    }
    
    renderEmptyText() {
        return (
            <h1>There are no more items to display!</h1>
        )
    }

    renderPopup(imgSrc, name, brand, color) {
        return (
            <div>
                <Popup imgSrc={this.props.imgSrc} name={this.props.name} brand={this.props.brand} price={this.props.price} type={this.props.type} toggleShow={this.toggleShow} />
            </div>
        ) 
    }

    renderItem() {
        console.log("renderItem Method");
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
                <h2 className="price">${this.props.price}</h2>
                <h3 className="type">{this.props.type}</h3>
                {this.state.showPopup ? this.renderPopup() : null}
            </div>
        )
    }

    render() {
        return (
            <>
                {console.log("Render Method")}
                {this.state.show ? this.renderItem() : null}
                {list.length === 0 ? this.renderEmptyText() : null}
                {this.state.show ? this.renderAddToCart(1) : null}
                {!this.state.show ? this.renderCartItem() : null}
            </>
        )
    }
    
}

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        }

        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    createItem(key, imgSrc, name, brand, price, color, type) {
        return(
            <Item key={key} toggleShow={this.toggleShow} imgSrc={imgSrc} name={name} brand={brand} price={price} color={color} type={type}/>
        )
    }

    render() {
        for (let i in list) {
            renderList.push(
                <div className="card">
                    {this.createItem((parseInt(i) + 1), list[i].imgSrc, list[i].name, list[i].brand, list[i].price, list[i].color, list[i].type)}
                </div>)
        }

        return(
            <div id="cards-wrapper" className="cards-wrapper">
                {this.state.showForm ? <PopupForm toggleShow={this.toggleShow} /> : null}
                <button className="add-button" onClick={() => this.toggleShow()}>Add Item</button>
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

class Cart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showForm: false
        }

        this.toggleShow = this.toggleShow.bind(this);
    }

    toggleShow() {
        this.setState({
            showForm: !this.state.showForm
        });
    }

    // renderForm() {
    //     this.setState({showForm: !this.state.showForm});
    // }

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