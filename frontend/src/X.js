import React, { useEffect } from 'react';

const X = () => {
   
    // example fetch request from the example route in /backend/app.js:
    useEffect(() => {
        fetch('http://localhost:5000/api/message')
            .then(res => res.text())
            .then(text => console.log(text));
    });

    return (
        <div>x</div>
    )
}

export default X;