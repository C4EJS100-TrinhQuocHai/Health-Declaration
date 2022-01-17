import React, { Component } from 'react';
import {Grid,Header,Icon,Form, Segment, Button,Message} from 'semantic-ui-react'
import{Link} from 'react-router-dom'
import './Login.css'

class Login extends Component {
    render() {
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{maxWidth:450}}>
                    <Header as='h2' icon color='violet'>
                        <Icon name='code branch'color='violet'></Icon>
                        Login for Health Declaration
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                            <Form.Input fluid name='email' icon='mail' iconPosition='left'
                            placeholder="Email Address" type='email'>   
                            </Form.Input>
                            <Form.Input fluid name='password' icon='lock' iconPosition='left'
                            placeholder="password" type='password'>   
                            </Form.Input>
                        </Segment>
                        <Button color='violet' fluid size='large' className=''> Login</Button>
                    </Form>
                    <Message error>
                        <h3>Error</h3>
                        error message 
                    </Message>
                    <Message>
                        Don't have an count ? <Link to='/register'>Register </Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Login;