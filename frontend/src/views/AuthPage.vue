<template>
  <div>
    <RegisterForm v-if="isRegistering" @switch-to-login="isRegistering = false" />
    <LoginForm v-else @switch-to-register="isRegistering = true" />
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm.vue';
import LoginForm from '@/components/LoginForm.vue';

export default {
  name: 'AuthPage',
  components: {
    RegisterForm,
    LoginForm
  },
  data() {
    return {
      isRegistering: true
    };
  }
};
</script>
