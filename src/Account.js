import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './Account.css'
import Home from "./Home";
import { Axios } from "axios";

const Account = () => {

    const history = useNavigate()

    const {userID} = useParams()

    const [filtered, setFiltered] = useState([])
    const [products, setProducts] = useState([])
    const [users, setUsers] = useState([])
    const [searchInput, setSearchInput] = useState("")

    useEffect(()  => {
        Axios.get('http://localhost:3001/api/products/select').then((response) => {
            console.log(response.data)
            setProducts(response.data)
        })    
        setSearchInput(userID)
        console.log("Username", searchInput)
        if(searchInput) { //if get a search input, check if it matches any product
            const filteredSearch = products.filter((prod) => (
                prod.UserID === userID))
            console.log(filteredSearch)
            setFiltered(filteredSearch) //if a match is found, return the result
        }
    }, [])

    const handleDelete = (productID) => {
        products.map((prod) => {
            if(prod.ProductID === productID){
                if(prod.Quantity>1){
                    prod.Quantity = prod.Quantity-1
                    Axios.put('http://localhost:3001/api/products/update', 
                    {
                        Quantity: prod.Quantity, 
                        ProductID: productID
                    })
                }
                else{
                    const url = 'http://localhost:3001/api/products/delete/' + productID
                    Axios.delete(url)
                }
            }
        })
    }

    return ( 
        <div className="account">
            <h1>Account</h1>
            <h2>Items You're Selling</h2>
                <section className="productDisplay">
                    {filtered.map(({ProductID, Price, Quantity , Name, Img}) =>(
                        <article key={ProductID} className="box">
                            <img src={Img} alt={Name} title={Name}/>
                            <h3>{Name}</h3>
                            <p>price: {Price}</p>
                            <p>quantity: {Quantity}</p>
                            {/* need to add functions to buttons */}
                            <button className="delete" onClick = {() => {handleDelete(ProductID)}}>Delete</button>
                        </article>
                        
                    ))}
                    <button className="button" onClick={() => {}}>+</button>
                </section>
                <div className = "logout-btn">
                    <button onClick={() => {history(-1)}}>Log Out</button>
                </div>
        </div>
     );
}
 
export default Account;