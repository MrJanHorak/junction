import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styles from './SignupForm.module.css'

// Services
import * as authService from '../../services/authService'

// Components
import PasswordField from '../MaterialUI/PasswordField'
import TextField from '../MaterialUI/TextField'

const SignupForm = props => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConf: '',
    avatar: props.avatar,
    location: '',
  })

  const handleChange = e => {
    props.updateMessage('')
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      await authService.signup(formData)
      props.handleSignupOrLogin()
      navigate('/')
    } catch (err) {
      props.updateMessage(err.message)
    }
  }

  const { name, email, password, passwordConf, avatar, location } = formData

  const isFormInvalid = () => {
    return !(name && email && password && password === passwordConf && avatar && location)
  }

  return (
    <form
      autoComplete="off"
      onSubmit={handleSubmit}
      className={styles.container}
    >
      <div className={styles.inputContainer}>
        <TextField value={name} editable={true} label="Name" name="name" handleChange={handleChange}/>
      </div>
      <div className={styles.inputContainer}>
        <TextField value={email} editable={true} label="Email" name="email" handleChange={handleChange}/>
      </div>
      <div className={styles.inputContainer}>
        <PasswordField name="password" value={password} handleChange={handleChange}/>
      </div>
      <div className={styles.inputContainer}>
        <PasswordField name="passwordConf" value={passwordConf} handleChange={handleChange}/>
      </div>
      <div className={styles.inputContainer}>
        <TextField value={location} editable={true} label="Location" name="location" handleChange={handleChange}/>
      </div>
      <div className={styles.inputContainer}>
        <img src={props.avatar} alt="dicebears avatar" style={{width: "150px"}}/>
        <button name="avatar" type="button" value={props.avatar} onClick={(e) => {
          props.resetSeed() 
          handleChange(e)}
          } >New Avatar</button>
      </div>
      <div className={styles.inputContainer}>
        <button disabled={isFormInvalid()} className={styles.button}>
          Sign Up
        </button>
        <Link to="/">
          <button>Cancel</button>
        </Link>
      </div>
    </form>
  )
}

export default SignupForm
