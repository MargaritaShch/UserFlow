<template>
  <div class="wrapper">
    <div class="container" id="container">
      <div class="form-container sign-up-container">
        <form @submit.prevent="registerUser">
          <h1>REGISTRATION</h1>
          <div class="social-container">
            <a href="#" class="social"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="social"><i class="fab fa-google-plus-g"></i></a>
            <a href="#" class="social"><i class="fab fa-linkedin-in"></i></a>
          </div>

          <input type="text" placeholder="Last Name" v-model="lastName" required />
          <input type="text" placeholder="First Name" v-model="firstName" required />
          <input type="text" placeholder="Middle Name" v-model="middleName" />
          <input type="email" placeholder="Email" v-model="email" required />
          <input type="text" placeholder="Phone" v-model="phone" required />
          <input type="password" placeholder="Password" v-model="password" required />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>
            <button class="ghost">Sign In</button>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    return {
      lastName: '',
      firstName: '',
      middleName: '',
      email: '',
      phone: '',
      password: ''
    };
  },
  methods: {
    registerUser() {
      const userData = {
        lastName: this.lastName,
        firstName: this.firstName,
        middleName: this.middleName,
        email: this.email,
        phone: this.phone,
        password: this.password
      };

      console.log('Registering:', userData);

      //при успешной регистарции алерт
      alert('Registration successful! Please log in.');

      //переключится на форму логина
      this.$emit('switch-to-login');
    }
  }
};
</script>

<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f6f5f7;
}

body {
  font-family: 'Montserrat', sans-serif;
  background: #f6f5f7;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin: 0;
}

.container {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
              0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 900px;
  max-width: 100%;
  min-height: 600px;
  display: flex;
}

.form-container {
  bottom: 100px;
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
}

.sign-up-container {
  left: 0;
  width: 40%;
  z-index: 2;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.overlay-container {
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  z-index: 1;
  
}

.overlay {
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  background-repeat: no-repeat;
  background-size: cover;
  color: #fff;
  position: relative;
  left: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.overlay-panel {
  text-align: center;
  padding: 0 40px;
   margin-top: -30px; 
}

form {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  align-items: center;
  margin-top: -150px; 
}

input {
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
  border-radius: 5px;
}

button {
  border-radius: 20px;
  border: 1px solid #ff4b2b;
  background-color: #ff4b2b;
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
  padding: 12px 45px;
  margin-top: 15px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  cursor: pointer;
}

button:hover {
  background-color: #ff3a1b;
}

.social-container {
  margin: 20px 0;
}

.social-container a {
  border: 1px solid #ddd;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: 40px;
  margin: 0 5px;
  color: #333;
  text-decoration: none;
}
</style>
