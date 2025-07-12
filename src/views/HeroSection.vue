<script setup>
import LayoutWrapper from "@/components/LayoutWrapper.vue"
const handleClick = () => {
  console.log("clicked")
}
</script>
<template>
  <div class="hero-section">
    <LayoutWrapper>
      <div class="container">
        <h1>Welcome to Our Platform</h1>
        <p>
          Experience the future of online entertainment with cutting-edge
          technology and immersive experiences.
        </p>
        <button class="cta-button" @click="handleClick">Get Started</button>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style scoped>
.hero-section {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.container {
  max-width: 800px;
  padding: 2rem;
}

h1 {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  line-height: 1.6;
}

.cta-button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.cta-button:hover {
  background: white;
  color: #667eea;
}
</style>
