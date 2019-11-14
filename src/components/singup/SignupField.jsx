import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'



const SignupField = () => {

    return ( 
        <>
            <Form action="/auth/singup" method="post">
               <Form.Field>
                 <label>Email</label>
                 <input className="accfield" placeholder='heesu@blog.com' name="email" />
               </Form.Field>
               <Form.Field>
                 <label>Password</label>
                 <input className="accfield" type="password" placeholder='password' name="password"/>
               </Form.Field>
               <Form.Field>
                 <label>NickName</label>
                 <input className="accfield" placeholder='NickName' name="nick" />
               </Form.Field>
               <Form.Field>
                 <Checkbox label='I agree to the Terms and Conditions' />
               </Form.Field>
               
               <Button type='submit'>Join</Button>
             </Form>
        </>
    ) 
}

export default SignupField;