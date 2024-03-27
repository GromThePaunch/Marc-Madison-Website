// This script is for the main website of the MM project. It is used to create an interactive header that can be resized by the user. The header will display a greeting based on the time of day and will also display a daily reminder based on the header's height. The reminder will change based on the header's height, with more urgent reminders appearing when the header is smaller. The user can resize the header by dragging the resize handle at the bottom of the header.
// The script also includes a function to update the greeting based on the time of day.
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

document.addEventListener('DOMContentLoaded', function () {
  const header = document.querySelector('.header-background');
  const handle = document.getElementById('resize-handle');
  const originalHeight = header.offsetHeight;
  const maxHeight = window.innerHeight;
  let startY, startHeight;

  handle.addEventListener('mousedown', function (e) {
    e.preventDefault();
    startY = e.clientY;
    startHeight = parseInt(document.defaultView.getComputedStyle(header).height, 10);
    document.documentElement.addEventListener('mousemove', doDrag, false);
    document.documentElement.addEventListener('mouseup', stopDrag, false);
  });

  function doDrag(e) {
    e.preventDefault();
    let newHeight = startHeight + e.clientY - startY;

    if (newHeight < originalHeight) {
      newHeight = originalHeight;
    }

    if (newHeight > maxHeight) {
      newHeight = maxHeight;
    }

    header.style.height = newHeight + 'px';

    // Define thresholds
    const firstThreshold = maxHeight / 3;
    const secondThreshold = maxHeight / 2; // Example for a lower threshold

    const dailyReminder = document.getElementById('daily-reminder');

    // Adjust the reminder based on the header's height
    if (newHeight >= secondThreshold) {
      dailyReminder.style.display = 'block';
      dailyReminder.textContent = "Time to stand up and stretch!"; // More urgent reminder
      dailyReminder.style.color = "#ff0000"; // Make the text color red for emphasis
    } else if (newHeight >= firstThreshold) {
      dailyReminder.style.display = 'block';
      dailyReminder.textContent = "Don't forget to drink water!";
      dailyReminder.style.color = "#000000"; // Default color
    } else {
      dailyReminder.style.display = 'none';
    }
  }

  function stopDrag(e) {
    e.preventDefault();
    document.documentElement.removeEventListener('mousemove', doDrag, false);
    document.documentElement.removeEventListener('mouseup', stopDrag, false);
  }

  updateGreeting();
});

document.addEventListener('DOMContentLoaded', function () {
  fetchReminders();

  document.getElementById('reminder-form').addEventListener('submit', function(e) {
      e.preventDefault();
      addOrUpdateReminder();
  });
});

function fetchReminders() {
  fetch('/api/reminders')
    .then(response => response.json())
    .then(reminders => {
      const remindersList = document.getElementById('reminders-list');
      remindersList.innerHTML = ''; // Clear existing reminders
      reminders.forEach(reminder => {
        const reminderElement = document.createElement('div');
        reminderElement.innerHTML = `
          <div>
            <h3>${reminder.title}</h3>
            <p>${reminder.description}</p>
            <p>Due: ${reminder.due_date}</p>
            <button onclick="deleteReminder('${reminder.id}')">Delete</button>
            <button onclick="populateEditForm('${reminder.id}')">Edit</button>
          </div>
        `;
        remindersList.appendChild(reminderElement);
      });
    });
}


function addOrUpdateReminder() {
  const formData = new FormData(document.getElementById('reminder-form'));
  const reminderData = Object.fromEntries(formData);
  const reminderId = document.getElementById('reminder-id').value; // Assuming you have a hidden input for the ID in your form

  const method = reminderId ? 'PUT' : 'POST';
  const url = reminderId ? `/api/reminders/${reminderId}` : '/api/reminders';

  fetch(url, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reminderData),
  })
  .then(response => response.json())
  .then(() => {
    fetchReminders(); // Refresh the list of reminders
    document.getElementById('reminder-form').reset(); // Reset the form for the next input
  });
}

function deleteReminder(reminderId) {
  fetch(`/api/reminders/${reminderId}`, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(() => {
    fetchReminders(); // Refresh the list of reminders
  });
}
function populateEditForm(reminderId) {
  fetch(`/api/reminders/${reminderId}`)
    .then(response => response.json())
    .then(reminder => {
      document.getElementById('title').value = reminder.title;
      document.getElementById('description').value = reminder.description;
      document.getElementById('due_date').value = reminder.due_date;
      document.getElementById('reminder-id').value = reminder.id; // Assuming you have a hidden input for the ID in your form
    });
}





