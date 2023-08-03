
import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from '../form.module.css';
//import Authentication from "../Authentication";


const Signup = () => {
    const [first_name, setfirstname] = useState("");
    const [last_name, setlastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch("http://localhost:5000/me/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                first_name,
                last_name,
                email,
                password,
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                alert("Sign up successful!");
            })
            .catch((error) => {
                console.error("Error signing up:", error);
                alert("Sign up failed!");
            });
    };


    return (
        <form onSubmit={handleSubmit}>
            <div className={styles['wrapper']}>
                <div className={styles['header']}>
                    <div className={styles['title']}>Sign up with your email</div>
                    <div className={styles['login']}>Already have an account? <Link to={'/login'}>Login</Link></div>
                </div>
                <div className={styles['form']}>
                    <input
                        type="text"
                        placeholder={'First Name'}
                        value={first_name}
                        onChange={(event) => setfirstname(event.target.value)}

                    />
                    <input
                        type="text"
                        placeholder={'Last Name'}
                        value={last_name}
                        onChange={(event) => setlastname(event.target.value)}

                    />
                    <input
                        type="email"
                        placeholder={'Email'}
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}

                    />
                    <input
                        placeholder={'Password'}
                        type={'password'}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <button
                        type="submit"
                        className={'btn1'}
                    >
                        Sign Up
                    </button>
                </div>
            </div>
        </form>
    )


}

export default Signup;



// const Signup = () => {
//     const [first_name, setfirstname] = useState("");
//     const [last_name, setlastname] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         fetch("http://localhost:5000/me/signup", {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 first_name,
//                 last_name,
//                 email,
//                 password,
//             }),
//         })
//             .then((response) => response.json())
//             .then((data) => {
//                 console.log(data);
//                 alert("Sign up successful!");
//             })
//             .catch((error) => {
//                 console.error("Error signing up:", error);
//                 alert("Sign up failed!");
//             });
//     };


//     const form =
//         <div className={styles['wrapper']}>
//             <div className={styles['header']}>
//                 <div className={styles['title']}>Sign up with your email</div>
//                 <div className={styles['login']}>Already have an account? <Link to={'/login'}>Login</Link></div>
//             </div>
//             <div className={styles['form']}>
//             <input
//                         type="text"
//                         placeholder={'First Name'}
//                         value={first_name}
//                         onChange={(event) => setfirstname(event.target.value)}

//                     />
//                     <input
//                         type="text"
//                         placeholder={'Last Name'}
//                         value={last_name}
//                         onChange={(event) => setlastname(event.target.value)}

//                     />
//                     <input
//                         type="email"
//                         placeholder={'Email'}
//                         value={email}
//                         onChange={(event) => setEmail(event.target.value)}

//                     />
//                     <input
//                         placeholder={'Password'}
//                         type={'password'}
//                         value={password}
//                         onChange={(event) => setPassword(event.target.value)}
//                     />
//                     <button
//                         type="submit"
//                         className={'btn1'}
//                         onSubmit={handleSubmit}
//                     >
//                         Sign Up
//                     </button>
//             </div>
//         </div>

//     return <Authentication data={form}/>
// }

// export default Signup;







