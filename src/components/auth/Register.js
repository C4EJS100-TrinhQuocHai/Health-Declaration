import React, { Component } from 'react';
import {Grid,Header,Icon,Form, Segment, Button,Message} from 'semantic-ui-react'
import{Link} from 'react-router-dom'
import firebase from '../../firebase';
import md5 from 'md5'

class Register extends Component {
    state={
        username:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        loading:false, // thông tin nhận biết đang nạp hay đang thực hiện 
        errors:[],
        userRef:firebase.database().ref('users') // tham chiếu đến cơ sở dữ liệu firebase.
    }
    handleChange=(event)=>{
        const{name,value}=event.target;
        this.setState({
            [name]:value
        })
    }
    handleSubmit=(event)=>{
        event.preventDefault();
        if(this.isFormValid()){
            const{username,email,password,errors}=this.state;
            this.setState({
                error:[],
                loading:true
            })
            firebase.auth()
            .createUserWithEmailAndPassword(email,password)
            .then((createUser)=>{
                console.log(createUser);
                createUser.user.updateProfile({
                    displayName:username,
                    photoURL:`http://gravatar.com/avatar/${md5(createUser.user.email)}>d=identicon`
                }).then(()=>{
                    this.saveUser(createUser).then(()=>{
                        console.log('user save');
                        this.setState({
                            loading:false
                        })
                        this.props.history.push('/login');
                    })
                })
            }).catch(err=>{
                console.log(err);
                this.setState({
                    errors:[...errors,err],
                    loading:false

                })
            })
        }
    }
    saveUser=(createdUser)=>{
        return this.state.userRef.child(createdUser.user.uid).set({
            name:createdUser.user.displayName,
            avatar: createdUser.user.photoURL
        })
            
        
    }
    isFormValid=()=>{
        let errors=[]
        let error;
        const{username,password,email,passwordConfirmation} = this.state;
        if(!username.length || !email.length || !password.length || !passwordConfirmation.length ){
            error={message:'Fill in all fields!'};
            this.setState({
                errors:errors.concat(error)
            })
        }else if( password.length<6 || passwordConfirmation.length<6 || password!==passwordConfirmation ){
            error={message:'Password is invalid!'};
            this.setState({
                errors:errors.concat(error)
            })
        }else if(passwordConfirmation!==password){
            error={message:'Password is invalid!'};
            this.setState({
                errors:errors.concat(error)
            })
        }
        return true;
    }
    displayErrors=(errors)=>errors.map((error,i)=>(
        <p key={i}> {error.message}</p>
    ));
    handleInputError=(errors,inputName)=>{
        return errors.some(error=>error.message.toLowerCase().includes(inputName)) ? 'error' :'';
    }
    
    render() {
        const{username,password,email,passwordConfirmation,loading} = this.state;
        return (
            <Grid textAlign='center' verticalAlign='middle' className='app'>
                <Grid.Column style={{maxWidth:450}}>
                    <Header as='h2' icon color='orange'>
                        <Icon name='puzzle piece'color='orange'></Icon>
                        Register for Health Declaration
                    </Header>
                    <Form size='large'onSubmit={this.handleSubmit}>
                        <Segment stacked>
                            <Form.Input fluid name='username' icon='user' iconPosition='left'
                                placeholder="Username" type='username' value={username}
                                onChange={this.handleChange}
                                className={this.handleInputError(this.state.errors,'username')}
                             >
                            </Form.Input>
                            <Form.Input fluid name='email' icon='mail' iconPosition='left'
                                placeholder="Email Address" type='email' value={email}
                                onChange={this.handleChange}
                                className={this.handleInputError(this.state.errors,' email')}
                                >
                            </Form.Input>
                            <Form.Input fluid name='password' icon='lock' iconPosition='left'
                                placeholder="Password" type='password' value={password}
                                onChange={this.handleChange}
                                className={this.handleInputError(this.state.errors,'password')}
                                >
                            </Form.Input>
                            <Form.Input fluid name='passwordConfirmation' icon='repeat' iconPosition='left'
                                placeholder="passwordConfirmation" type='password' value={passwordConfirmation}
                                onChange={this.handleChange}
                                className={this.handleInputError(this.state.errors,'passwordConfirmation')}
                                >
                            </Form.Input>
                        </Segment>
                        <Button className={loading ? 'loading' : ''} color='orange' fluid size='large' > Submit </Button>
                    </Form>
                   { this.state.errors.length>0 && <Message error>
                        <h3>Error</h3>
                        {this.displayErrors(this.state.errors)}
                    </Message>}
                    <Message>
                        Don't have an count ? <Link to='/login'>Login </Link>
                    </Message>
                </Grid.Column>
            </Grid>
        );
    }
}

export default Register;