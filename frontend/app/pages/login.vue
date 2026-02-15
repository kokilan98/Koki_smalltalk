<template>
  <div class="login-container">
    <h1>Login</h1>

    <form @submit.prevent="handleLogin">
      <input v-model="username" type="text" placeholder="Username" required />
      <input v-model="password" type="password" placeholder="Password" required />

      <button type="submit">Login</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  try {
    const response = await $fetch('http://localhost/auth/login', {
      method: 'POST',
      body: {
        username: username.value,
        password: password.value
      }
    })

    localStorage.setItem('token', response)

    router.push('/feed')
  } catch (err: any) {
    error.value = 'Invalid username or password'
  }
}
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 100px auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

input {
  padding: 10px;
}

button {
  padding: 10px;
}

.error {
  color: red;
}
</style>