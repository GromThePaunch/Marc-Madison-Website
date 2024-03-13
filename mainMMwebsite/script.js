function updateGreeting() {
    const hour = new Date().getHours();
    const greeting = document.getElementById('dynamic-greeting');
    
    if (hour < 12) {
      greeting.innerText = 'Good Morning';
    } else if (hour < 18) {
      greeting.innerText = 'Good Afternoon';
    } else {
      greeting.innerText = 'Good Evening';
    }
  }
  
  // Run the function as soon as the page loads
  document.addEventListener('DOMContentLoaded', updateGreeting);
  