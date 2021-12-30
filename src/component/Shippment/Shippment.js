import React from 'react';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { userCOntext } from '../../App';
import './Shippment.css';

const Shippment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onSubmit = data => console.log(data);
  
    console.log(watch("example")); 

    const [LoggedInUser, setLoggedInUser] = useContext( userCOntext )
    return (
        <div className='row'>
            <div className="col-lg-6 col-md-6 col-sm-12">
            <form onSubmit={handleSubmit(onSubmit)} >

                <input defaultValue={LoggedInUser.name} {...register("name", { required: true })} placeholder='Name' className='w-100 d-block inputField'/>
                {errors.name && <span style={{color:"red"}}>This name field is required</span>}

                <input defaultValue={LoggedInUser.email} {...register("email", { required: true })} placeholder='Email' className='w-100 d-block inputField'/>
                {errors.email && <span style={{color:"red"}}>This email field is required</span>}

                <input {...register("country", { required: true })} placeholder='Country' className='w-100 d-block inputField'/>
                {errors.country && <span style={{color:"red"}}>This country field is required</span>}

                <input {...register("address", { required: true })} placeholder='Address' className='w-100 d-block inputField'/>
                {errors.address && <span style={{color:"red"}}>This address field is required</span>}

                <input type="submit" className='d-block mx-auto inputField'/>
                </form>
            </div>
        </div>
    );
};

export default Shippment;