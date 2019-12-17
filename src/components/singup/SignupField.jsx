import React from 'react';
import { Checkbox, Form } from 'semantic-ui-react'
import {Link} from 'react-router-dom';
import {Input ,Button} from '../../lib/AuthInput';


const SignupField = () => {

    return ( 
        <>
        <h2 style={{fontSize:50,marginBottom:30}}>Create Free Account</h2>
            <form action="/auth/singup" method="post">
               <Input name="email" />
               <Input type="password" name="password"/>
               <Input name="Nickname" />
               <Form.Field>
                 <Checkbox label='I agree to the Terms and Conditions' />
               </Form.Field>
               
               <Button width="15%" height="40px" type='submit'>Join</Button>
             </form>
        </>
    ) 
}

export default SignupField;