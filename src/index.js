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
    return (
        <div className="popup">
            <img src={props.imgSrc} alt="Instrument"></img>
            <h1 className="name">{props.name}</h1>
            <h2 className="brand">{props.brand}</h2>
        </div>
    )
}

// class Popup extends React.Component {
//     constructor(props) {
//         super(props);
//     }

//     render() {
//         return (
//             <div className="popup">
//                 <img src={this.props.imgSrc} alt="Instrument"></img>
//                 <h1 className="name">{this.props.name}</h1>
//                 <h2 className="brand">{this.props.brand}</h2>
//             </div>
//         )
//     }
// }

class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPopup: false,
        };
    }

    renderPopup(imgSrc, name, brand, color) {
        console.log("invoked")
        return(
            <div>
                <Popup imgSrc={this.props.imgSrc} name={this.props.name} brand={this.props.brand} color={this.props.color} />
            </div>
        ) 
    }

    render() {
        let classes = 'card';
        classes += ' ' + this.props.color;
        return (
            <div className={classes} onClick={() => this.setState({showPopup : !(this.state.showPopup)})}>
                <img src={this.props.imgSrc} alt="Instrument"></img>
                <h1 className="name">{this.props.name}</h1>
                <h2 className="brand">{this.props.brand}</h2>
                {this.state.showPopup ? this.renderPopup() : null}
            </div>
        )
    }
    
}

// function Item(props) {
//     let classes = 'card';
//     classes += ' ' + props.color;
//     return (
//         <div className={classes} onClick={renderPopup()}>
//             <img src={props.imgSrc} alt="Instrument"></img>
//             <h1 className="name">{props.name}</h1>
//             <h2 className="brand">{props.brand}</h2>
//         </div>
//     )
// }

class Cards extends React.Component {
    render() {
        let list = instruments.slice();
        let renderList = [];
        for (let i in list) {
            renderList.push(<Item key={i} imgSrc={list[i].imgSrc} name={list[i].name} brand={list[i].brand} color={list[i].color} />);
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
        let renderPopups = [];
        for(let i in instruments) {
            renderPopups.push(<Popup imgSrc={instruments[i].imgSrc} name={instruments[i].name} brand={instruments[i].brand} />)
        }
        return (
            <div className="listings">
                <Cards />
                {renderPopups}
            </div>
        )
    }
}


ReactDOM.render(
    <Listings />,
    document.getElementById('root')
  );