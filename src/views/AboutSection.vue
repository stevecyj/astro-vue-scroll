<script setup>
import LayoutWrapper from "@/components/LayoutWrapper.vue"
</script>
<template>
  <div class="about-section">
    <LayoutWrapper>
      <div class="container">
        <h1>Who We Are</h1>
        <p>
          We are a team of passionate innovators dedicated to creating
          exceptional digital experiences that transform the way people interact
          with technology.
        </p>
        <div class="features-grid">
          <div class="feature">
            <h3>Innovation</h3>
            <p>Pushing boundaries with cutting-edge technology</p>
          </div>
          <div class="feature">
            <h3>Excellence</h3>
            <p>Delivering superior quality in everything we do</p>
          </div>
          <div class="feature">
            <h3>Trust</h3>
            <p>Building lasting relationships through reliability</p>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style scoped>
.about-section {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
}

.container {
  max-width: 1000px;
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
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.feature {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.feature h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.feature p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
}
</style>
