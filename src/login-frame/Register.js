import React, { Component } from 'react';

export class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordVisible: false,
            confirmPasswordVisible: false
        };
    }

    togglePasswordVisibility = () => {
        this.setState(prevState => ({
            passwordVisible: !prevState.passwordVisible
        }));
    }

    toggleConfirmPasswordVisibility = () => {
        this.setState(prevState => ({
            confirmPasswordVisible: !prevState.confirmPasswordVisible
        }));
    }

    render() {
        const { passwordVisible, confirmPasswordVisible } = this.state;
        let msgClass = ["text-center mt-2"];
        if (this.props.type) {
            msgClass.push("text-success");
        } else {
            msgClass.push("text-danger");
        }
        return (
            <div>
                <div className="login-light"></div>
                <div className="login-box">
                    <form onSubmit={this.props.register}>
                        <input type="checkbox" className="input-check" id="input-check" />
                        <label htmlFor="input-check" className="toggle">
                            <span className="text off">off</span>
                            <span className="text on">on</span>
                        </label>
                        <div className="light"></div>

                        <h2>Registration</h2>
                        <div className='heading'>
                            <span className={msgClass.join(" ")}>{this.props.message} </span>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" required name='email'  autocomplete="off" />
                            <label className='label'>Email</label>
                            <div className="input-line"></div>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <i className={passwordVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={this.togglePasswordVisibility}></i>
                            </span>
                            <input type={passwordVisible ? "text" : "password"} required name="password" />
                            <label className='label'>Password</label>
                            <div className="input-line"></div>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <i className={confirmPasswordVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"} onClick={this.toggleConfirmPasswordVisibility}></i>
                            </span>
                            <input type={confirmPasswordVisible ? "text" : "password"} required name="confirmpassword" />
                            <label className='label'>Confirm Password</label>
                            <div className="input-line"></div>
                        </div>

                        <button type="submit">Sign Up</button>
                    </form>
                </div>

            </div>
        )
    }
}

export default Register;
