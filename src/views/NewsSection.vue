<script setup>
import LayoutWrapper from "@/components/LayoutWrapper.vue"
</script>
<template>
  <div class="news-section" data-page-type="normal">
    <LayoutWrapper>
      <div class="container">
        <h1>Latest News</h1>
        <p>
          Stay updated with the latest developments, announcements, and insights
          from our platform and industry.
        </p>
        <div class="news-grid">
          <article class="news-card">
            <div class="news-date">Dec 15, 2024</div>
            <h3>Platform Update 2.0</h3>
            <p>
              Enhanced user experience with new features and improved
              performance.
            </p>
          </article>
          <article class="news-card">
            <div class="news-date">Dec 10, 2024</div>
            <h3>Security Enhancement</h3>
            <p>
              Advanced security measures implemented for better user protection.
            </p>
          </article>
          <article class="news-card">
            <div class="news-date">Dec 5, 2024</div>
            <h3>New Game Releases</h3>
            <p>Exciting new games added to our live casino collection.</p>
          </article>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style scoped>
.news-section {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #8360c3 0%, #2ebf91 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
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

.news-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.news-card {
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: left;
  transition: transform 0.3s ease;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-date {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  font-weight: 500;
}

.news-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
}

.news-card p {
  margin: 0;
  font-size: 1rem;
  opacity: 0.8;
  line-height: 1.5;
}
</style>
