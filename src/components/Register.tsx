import { Button, TextField } from '@mui/material';
import { FormEvent, useEffect, useState } from 'react'
import '../styles/register.scss'
import { useNavigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const details = localStorage.getItem('details');
        if (details) {
            navigate('/dashboard');
        }

    }, [navigate])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (isNaN(Number(phoneNumber))) {
            alert("Enter a valid Number");
            return;
        }
        if (phoneNumber.length !== 10) {
            alert("Phone Number must be 10 digit");
            return;
        }
        if (name.trim() === '' || email.trim() === '') {
            alert("Enter the required fields");
            return;
        }
        const details = {
            name,
            phoneNumber,
            email
        };

        localStorage.setItem('details', JSON.stringify(details));
        alert("Registerd Successfully");
        navigate('/dashboard');
    }
    console.log(phoneNumber)
    return (
        <div className='register__container'>
            <h1>Enter your details</h1>
            <form onSubmit={handleSubmit} className='form__container'>
                <TextField required id="name" label="Name" aria-label='Name' variant="outlined" onChange={(e) => setName(e.target.value)} />
                <TextField required id="phone" label="Phone Number" aria-label='Phone Number' variant="outlined" onChange={(e) => {
                    e.target.value.startsWith("+91") ? setPhoneNumber(e.target.value.slice(3)) :
                        setPhoneNumber(e.target.value)
                }
                } />
                <TextField required id="email" label="Email" variant="outlined" type='email' onChange={(e) => setEmail(e.target.value)} />
                <Button variant="contained" type='submit'>Register</Button>
            </form>

        </div>
    )
}

export default Register