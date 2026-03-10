
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

export default function CRUDTest2(){
    
    return (
        <>
            <CreateAndRead />
        </>
    )
}

export function CreateAndRead(){

    const [Number, setNumber] = useState(0) //set the number to send
    const [items, setItems] = useState([]); //store values from server

    // on load fn to request data from the server 
    useEffect(()=> {async function fetchData(){
        const response = await fetch(
            "http://localhost:8080/read"
        );
        const data = await response.json();
        console.log(data)
        setItems(data);
        }
        const data = fetchData();
    }, []);

    function handleSubmit(e){
        e.preventDefault();
        console.log("sending over number: ",{Number})
        async function fetchData() {

            const response = await fetch(
                "http://localhost:8080/create", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(
                        {Number: Number}),
                }
            );

            const data = await response.json();
            console.log("Server response:", data);
        }
        fetchData();
    }
    return (
        <>
            <h1>Submit to server</h1>
            <form id="messageForm" onSubmit={handleSubmit} method="post">
                <label htmlFor="message">Send a 1 to the server</label>
                <button type="submit" onClick={()=>setNumber(1)}>1</button>
            </form>

            <h1>Items</h1>
            <ul>
                {items.slice(-5).map((item)=> (
                    <li key={item.id}>{item.id}:{item.number}</li>
                ))}
            </ul>
        </>
    )
}