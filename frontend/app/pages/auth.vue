<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isRightPanelActive = ref(false)

const loginUsername = ref('')
const loginPassword = ref('')

const registerName = ref('')
const registerEmail = ref('')
const registerPassword = ref('')

const handleLogin = async () => {
  try {
    const token = await $fetch('http://localhost/auth/login', {
      method: 'POST',
      body: {
        username: loginUsername.value,
        password: loginPassword.value
      }
    })

    localStorage.setItem('token', token)
    router.push('/feed')
  } catch {
    alert('Login failed')
  }
}

const handleRegister = async () => {
  try {
    await $fetch('http://localhost/auth/register', {
      method: 'POST',
      body: {
        username: registerName.value,   // using name as username
        password: registerPassword.value
      }
    })

    alert('Registration successful! Please login.')
    isRightPanelActive.value = false
  } catch {
    alert('Registration failed')
  }
}
</script>

<template>
  <div :class="['container', { 'right-panel-active': isRightPanelActive }]">

    <!-- SIGN UP -->
    <div class="form-container sign-up-container">
      <form @submit.prevent="handleRegister">
        <h1>Create Account</h1>

        <input v-model="registerName" type="text" placeholder="Name" required />
        <input v-model="registerEmail" type="email" placeholder="Email" required />
        <input v-model="registerPassword" type="password" placeholder="Password" required />

        <button type="submit">Sign Up</button>
      </form>
    </div>

    <!-- SIGN IN -->
    <div class="form-container sign-in-container">
      <form @submit.prevent="handleLogin">
        <h1>Sign in</h1>

        <input v-model="loginUsername" type="text" placeholder="Username" required />
        <input v-model="loginPassword" type="password" placeholder="Password" required />

        <button type="submit">Sign In</button>
      </form>
    </div>

    <!-- OVERLAY -->
    <div class="overlay-container">
      <div class="overlay">

        <div class="overlay-panel overlay-left">
          <img src="/smalltalklogo.svg" class="logo" />
          <h1>Smalltalk</h1>
          <span>Short thoughts. Real conversations.</span>
          <p>
            Nice to see you again. Share the little things — without noise or pressure.
          </p>
          <button class="ghost" @click="isRightPanelActive = false">
            Sign In
          </button>
        </div>

        <div class="overlay-panel overlay-right">
          <img src="/smalltalklogo.svg" class="logo" />
          <h1>Smalltalk</h1>
          <span>Short thoughts. Real conversations.</span>
          <p>
            A place for small updates and real voices. Say a little. Keep it simple.
          </p>
          <button class="ghost" @click="isRightPanelActive = true">
            Sign Up
          </button>
        </div>

      </div>
    </div>

  </div>
</template>