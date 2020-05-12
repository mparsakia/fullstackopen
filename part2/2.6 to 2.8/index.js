import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const PhoneBookEntry = (props) => {
  console.log(props);
  return (
    <div>
      <li>{props.name}</li>
      <li>{props.number}</li>
    </div>
  )
}

const App = (props) => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('Enter a name')
  const [newNumber, setNewNumber] = useState('Enter a phone number')
  const [sfilter, searchState] = useState('')
  const [showAll, setShowAll] = useState(true)

  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)

    // a way to find out if a name is already in the book
    if (persons.find(x => x.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
      // dont execute the of the code to add a person, below
    }

    const personObj = { name: newName, number: newNumber };

    setPersons(persons.concat(personObj));
    setNewName(''); // clear the input field after submission (no default txt)
    setNewNumber(''); // clear the input field after submission (no default txt)

  }

  const handleChanges = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value); // Allows us to edit the input area
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  }

  const handleSearch = (event) => {
    console.log(event.target.value);
    setShowAll(event.target.value);
  }

  // const peopleDisplay = showAll ? persons : 
  //                       persons.filter(entry => entry.name.search(sfilter.toLowerCase()));


  const peopleDisplay = persons;

  return (
    <div>

      <h2>Phonebook</h2>

      <i>name filter:  </i><input onChange={handleSearch} />

      <h2>add new entry:</h2>
      <form onSubmit={addPerson}>
        <div>name: <input value={newName} onChange={handleChanges} /> </div>
        <div>number: <input value={newNumber} onChange={handleNumberChange} /></div>
        <div> <button type="submit">add</button> </div>
      </form>
      <ul>
        {peopleDisplay.map(entry => <PhoneBookEntry key={entry.name} {...entry} />)}
      </ul>

      {/* using ...entry will let us pass the entire obj into the JSX call [... = spread operator]*/}
      <br /><br />
      <hr></hr>
      <small>debug newName: {newName}</small>
      <br></br>
      <small>debug newNumber: {newNumber}</small>

    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))




// https://reactjs.org/docs/thinking-in-react.html
// How to setup the filter, code copied from link above.

// class ProductCategoryRow extends React.Component {
//   render() {
//     const category = this.props.category;
//     return (
//       <tr>
//         <th colSpan="2">
//           {category}
//         </th>
//       </tr>
//     );
//   }
// }

// class ProductRow extends React.Component {
//   render() {
//     const product = this.props.product;
//     const name = product.stocked ?
//       product.name :
//       <span style={{color: 'red'}}>
//         {product.name}
//       </span>;

//     return (
//       <tr>
//         <td>{name}</td>
//         <td>{product.price}</td>
//       </tr>
//     );
//   }
// }

// class ProductTable extends React.Component {
//   render() {
//     const filterText = this.props.filterText;
//     const inStockOnly = this.props.inStockOnly;

//     const rows = [];
//     let lastCategory = null;

//     this.props.products.forEach((product) => {
//       if (product.name.indexOf(filterText) === -1) {
//         return;
//       }
//       if (inStockOnly && !product.stocked) {
//         return;
//       }
//       if (product.category !== lastCategory) {
//         rows.push(
//           <ProductCategoryRow
//             category={product.category}
//             key={product.category} />
//         );
//       }
//       rows.push(
//         <ProductRow
//           product={product}
//           key={product.name}
//         />
//       );
//       lastCategory = product.category;
//     });

//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>Name</th>
//             <th>Price</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     );
//   }
// }

// class SearchBar extends React.Component {
//   constructor(props) {
//     super(props);
//     this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
//     this.handleInStockChange = this.handleInStockChange.bind(this);
//   }

//   handleFilterTextChange(e) {
//     this.props.onFilterTextChange(e.target.value);
//   }

//   handleInStockChange(e) {
//     this.props.onInStockChange(e.target.checked);
//   }

//   render() {
//     return (
//       <form>
//         <input
//           type="text"
//           placeholder="Search..."
//           value={this.props.filterText}
//           onChange={this.handleFilterTextChange}
//         />
//         <p>
//           <input
//             type="checkbox"
//             checked={this.props.inStockOnly}
//             onChange={this.handleInStockChange}
//           />
//           {' '}
//           Only show products in stock
//         </p>
//       </form>
//     );
//   }
// }

// class FilterableProductTable extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       filterText: '',
//       inStockOnly: false
//     };

//     this.handleFilterTextChange = this.handleFilterTextChange.bind(this);
//     this.handleInStockChange = this.handleInStockChange.bind(this);
//   }

//   handleFilterTextChange(filterText) {
//     this.setState({
//       filterText: filterText
//     });
//   }

//   handleInStockChange(inStockOnly) {
//     this.setState({
//       inStockOnly: inStockOnly
//     })
//   }

//   render() {
//     return (
//       <div>
//         <SearchBar
//           filterText={this.state.filterText}
//           inStockOnly={this.state.inStockOnly}
//           onFilterTextChange={this.handleFilterTextChange}
//           onInStockChange={this.handleInStockChange}
//         />
//         <ProductTable
//           products={this.props.products}
//           filterText={this.state.filterText}
//           inStockOnly={this.state.inStockOnly}
//         />
//       </div>
//     );
//   }
// }


// const PRODUCTS = [
//   {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
//   {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
//   {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
//   {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
//   {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
//   {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
// ];

// ReactDOM.render(
//   <FilterableProductTable products={PRODUCTS} />,
//   document.getElementById('container')
// );
