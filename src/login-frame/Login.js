import React, { Component } from 'react';

export class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            passwordVisible: false
        };
    }

    togglePasswordVisibility = () => {
        this.setState(prevState => ({
            passwordVisible: !prevState.passwordVisible
        }));
    }

    render() {
        const { passwordVisible } = this.state;
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
                    <form onSubmit={this.props.login}>
                        <input type="checkbox" className="input-check" id="input-check" />
                        <label htmlFor="input-check" className="toggle">
                            <span className="text off">off</span>
                            <span className="text on">on</span>
                        </label>
                        <div className="light"></div>

                        <h2>Login</h2>
                        <div className='heading'>
                            <span className={msgClass.join(" ")}>{this.props.message}</span>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <ion-icon name="mail"></ion-icon>
                            </span>
                            <input type="email" required name='email' autocomplete="off" />
                            <label>Email</label>
                            <div className="input-line"></div>
                        </div>
                        <div className="input-box">
                            <span className="icon">
                                <i
                                    className={passwordVisible ? "fa-solid fa-eye" : "fa-solid fa-eye-slash"}
                                    onClick={this.togglePasswordVisibility}
                                ></i>
                            </span>
                            <input
                                type={passwordVisible ? "text" : "password"}
                                required
                                name="password"
                            />
                            <label>Password</label>
                            <div className="input-line"></div>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" /> Remember me</label>
                            <a href="#">Forgot Password?</a>
                        </div>
                        <button type="submit">Login</button>
                        <button type="button" id='btngoogle' onClick={this.props.Google}>Sign With With Google
                        <ion-icon name="logo-google" className="google"></ion-icon>
                        </button>
                        <div className="register-link">
                            <p>Don't have an account? <a href="#" onClick={this.props.pageSwitch}>Register</a></p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
