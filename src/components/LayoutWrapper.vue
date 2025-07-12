<script setup>
import { StagewiseToolbar } from "@stagewise/toolbar-vue"
</script>
<template>
  <StagewiseToolbar />
  <div class="page-container">
    <nav class="navbar">
      <div class="nav-container">
        <a href="/" class="logo">DEMO</a>
        <ul class="nav-links">
          <li><a href="/">Home</a></li>
          <li><a href="/who-we-are">Who We Are</a></li>
          <li><a href="/live-casino">Live Casino</a></li>
          <li><a href="/news">News</a></li>
          <li><a href="/blog">Blog</a></li>
          <li><a href="/contact">Contact Us</a></li>
        </ul>
      </div>
    </nav>

    <main class="main-content">
      <slot />
    </main>
  </div>
</template>

<style scoped>
.page-container {
  min-height: 100vh;
  position: relative;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #333;
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  text-decoration: none;
  color: #666;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover,
.nav-links a.active {
  color: #333;
}

.main-content {
  padding-top: 80px;
}
</style>
