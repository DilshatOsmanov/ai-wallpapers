<script setup>
import { useStore } from 'vuex'

const store = useStore()
// Logout
const logout = () => {
  store.dispatch('logout')
}
</script>

<template>
  <nav class="navbar navbar-default navbar-fixed-top">
    <div class="container">
      <div class="d-flex align-items-center justify-content-between w-100">
        <div id="header_topbar"></div>

        <div class="dropdown">
          <button
            type="button"
            class="header__avatar"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            JD
          </button>

          <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
            <li><a class="dropdown-item" href="#">Профиль</a></li>
            <li><button class="dropdown-item" type="button" @click="logout">Выйти</button></li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss">
.navbar-fixed-top {
  background-color: #222222;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.header__avatar {
  width: 35px;
  height: 35px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  font-size: 18px;
  font-weight: bold;
  text-transform: uppercase;
  user-select: none;
}
</style>
