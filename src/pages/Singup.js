import React from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'

const Singup = () => {
    return (
         <div>
             <Form action="/auth/singup" method="post">
               <Form.Field>
                 <label>Email</label>
                 <input placeholder='heesu@blog.com' name="email" />
               </Form.Field>
               <Form.Field>
                 <label>Password</label>
                 <input type="password" placeholder='password' name="password"/>
               </Form.Field>
               <Form.Field>
                 <Checkbox label='I agree to the Terms and Conditions' />
               </Form.Field>
               <Button type='submit'>Join</Button>
             </Form>
         </div>
    );
}

export default Singup;