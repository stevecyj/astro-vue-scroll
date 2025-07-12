<script setup>
import LayoutWrapper from "./LayoutWrapper.vue"
</script>
<template>
  <div class="contact-section">
    <LayoutWrapper>
      <div class="container">
        <h1>Contact Us</h1>
        <p>
          Get in touch with our team. We're here to help you with any questions
          or support you may need.
        </p>
        <div class="contact-content">
          <div class="contact-info">
            <div class="info-item">
              <h3>Email</h3>
              <p>support@demo.com</p>
            </div>
            <div class="info-item">
              <h3>Phone</h3>
              <p>+1 (555) 123-4567</p>
            </div>
            <div class="info-item">
              <h3>Address</h3>
              <p>123 Demo Street, Tech City, TC 12345</p>
            </div>
          </div>
          <div class="contact-form">
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" rows="5" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </LayoutWrapper>
  </div>
</template>

<style scoped>
.contact-section {
  min-height: calc(100vh - 80px);
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
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
}

.container > p {
  font-size: 1.25rem;
  margin-bottom: 3rem;
  opacity: 0.9;
  line-height: 1.6;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  margin-top: 3rem;
  text-align: left;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-item {
  background: rgba(255, 255, 255, 0.1);
  padding: 2rem;
  border-radius: 15px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.info-item h3 {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.info-item p {
  margin: 0;
  opacity: 0.8;
}

.contact-form {
  background: rgba(255, 255, 255, 0.1);
  padding: 2.5rem;
  border-radius: 20px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.contact-form form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-form input,
.contact-form textarea {
  background: rgba(255, 255, 255, 0.9);
  border: none;
  padding: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  color: #333;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #666;
}

.contact-form button {
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid white;
  color: white;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.contact-form button:hover {
  background: white;
  color: #667eea;
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
