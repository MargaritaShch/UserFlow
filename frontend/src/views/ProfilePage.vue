<template>
  <div class="profile-page" v-if="!isDeleted">
    <aside class="profile-info">
      <h2>Profile</h2>
      <p><strong>Last Name:</strong> {{ user.lastName }}</p>
      <p><strong>First Name:</strong> {{ user.firstName }}</p>
      <p><strong>Middle Name:</strong> {{ user.middleName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Phone:</strong> {{ user.phone }}</p>
      <button @click="deleteProfile">Delete Profile</button>
    </aside>

    <main class="feed">
      <h1>Welcome back, {{ user.firstName }}!</h1>
      <div class="post" v-for="(post, index) in posts" :key="index">
        <h3>{{ post.title }}</h3>
        <p>{{ post.content }}</p>
      </div>
    </main>
  </div>
  <div v-else class="deleted-message">
    <h2>Profile deleted. Redirecting to registration...</h2>
  </div>
</template>

<script>
export default {
  name: 'ProfilePage',
  data() {
    return {
      user: {},
      isDeleted: false,
      posts: [
        { title: 'New Feature: Profile View', content: 'You can now see your personal data here.' },
        { title: 'Announcement', content: 'Stay tuned for upcoming updates in our platform.' },
        { title: 'Tips', content: 'Use a strong password and keep your info up to date!' }
      ]
    };
  },
  mounted() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    } else {
      this.$router.push('/');
    }
  },
  methods: {
    deleteProfile() {
      localStorage.removeItem('user');
      this.isDeleted = true;
      setTimeout(() => {
        this.$router.push('/');
      }, 5000);
    }
  }
};
</script>

<style scoped>
.profile-page {
  display: flex;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
}

.profile-info {
  width: 300px;
  background: linear-gradient(to right, #ff4b2b, #ff416c);
  color: white;
  padding: 40px 20px;
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.1);
}

.profile-info h2 {
  margin-bottom: 20px;
  font-size: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
}

.profile-info p {
  margin: 10px 0;
  font-size: 16px;
}

.profile-info button {
  margin-top: 20px;
  margin-left: 70px;
  padding: 15px 20px;
  background-color: #fff;
  color: #ff4b2b;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease;
  font-size: 18px;
}

.profile-info button:hover {
  background-color: #ffe5e0;
}

.feed {
  flex: 1;
  padding: 40px;
  background-color: #f6f5f7;
  overflow-y: auto;
}

.feed h1 {
  margin-bottom: 30px;
  color: #333;
}

.post {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.post h3 {
  margin-bottom: 10px;
}

.deleted-message {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Montserrat', sans-serif;
  font-size: 24px;
  color: #ff4b2b;
  background-color: #f6f5f7;
  text-align: center;
  padding: 20px;
}
</style>
