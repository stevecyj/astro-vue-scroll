<script setup>
import LayoutWrapper from "@/components/LayoutWrapper.vue"
</script>
<template>
  <div class="blog-section">
    <LayoutWrapper>
      <div class="container">
        <h1>Our Blog</h1>
        <p>
          Discover insights, tutorials, and industry trends through our
          comprehensive blog posts and expert commentary.
        </p>
        <div class="blog-grid">
          <article class="blog-card">
            <div class="blog-category">Technology</div>
            <h3>The Future of Web Development</h3>
            <p>
              Exploring emerging trends and technologies that will shape the
              future of web development.
            </p>
            <div class="blog-meta">
              <span>Dec 12, 2024</span>
              <span>5 min read</span>
            </div>
          </article>
          <article class="blog-card">
            <div class="blog-category">Design</div>
            <h3>Creating Immersive User Experiences</h3>
            <p>
              Best practices for designing interfaces that engage and delight
              users.
            </p>
            <div class="blog-meta">
              <span>Dec 8, 2024</span>
              <span>7 min read</span>
            </div>
          </article>
          <article class="blog-card">
            <div class="blog-category">Industry</div>
            <h3>Digital Transformation Trends</h3>
            <p>
              How businesses are adapting to the digital-first world and
              leveraging new technologies.
            </p>
            <div class="blog-meta">
              <span>Dec 3, 2024</span>
              <span>6 min read</span>
            </div>
          </article>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style scoped>
.blog-section {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  padding: 2rem;
  text-align: center;
}

h1 {
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  color: #2c3e50;
}

.container > p {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.8;
  line-height: 1.6;
  color: #555;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}

.blog-card {
  background: rgba(255, 255, 255, 0.8);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  text-align: left;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.blog-category {
  display: inline-block;
  background: #667eea;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  margin-bottom: 1rem;
  text-transform: uppercase;
}

.blog-card h3 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #2c3e50;
  line-height: 1.3;
}

.blog-card p {
  margin-bottom: 1.5rem;
  color: #666;
  line-height: 1.6;
}

.blog-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #888;
}

.blog-meta span {
  font-weight: 500;
}
</style>
