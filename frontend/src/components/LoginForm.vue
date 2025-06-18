<template>
  <div class="wrapper">
    <div class="container">
      <div class="form-container sign-in-container">
        <form @submit.prevent="loginUser">
          <h1>Login</h1>
          <input type="text" placeholder="Email or Phone" v-model="login" required />
          <input type="password" placeholder="Password" v-model="password" required />
          <button type="submit">Sign In</button>
        </form>
      </div>

      <div class="overlay-container">
        <div class="overlay">
          <div class="overlay-panel overlay-right">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button class="ghost">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      login: '',
      password: ''
    };
  },
  methods: {
    loginUser() {
      const storedUser = JSON.parse(localStorage.getItem('user'));

      if (!storedUser) {
        alert('Пользователь не найден. Зарегистрируйтесь.');
        return;
      }

      const loginMatches =
          storedUser.email === this.login || storedUser.phone === this.login;
      const passwordMatches = storedUser.password === this.password;

      if (loginMatches && passwordMatches) {
        localStorage.setItem('user', JSON.stringify(storedUser));
        this.$router.push('/profile');
      } else {
        alert('Неверный логин или пароль');
      }
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
  position: absolute;
  top: 0;
  height: 90%;
  transition: all 0.6s ease-in-out;
}

.sign-in-container {
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
}

form {
  background-color: #ffffff;
  display: flex;
  flex-direction: column;
  padding: 0 50px;
  align-items: center;
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
</style>