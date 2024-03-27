from flask import Flask, render_template, request, jsonify
import reminder_manager  # Make sure to adjust the import to your actual reminder manager script


REMINDERS_FILE_PATH = 'reminders.json'


app = Flask(__name__)


@app.route('/')
def home():
    return render_template('home.html')  # Ensure this template exists in your /templates directory

from flask import Flask, render_template, request, redirect, url_for
import reminder_manager

@app.route('/reminders', methods=['GET', 'POST'])
def reminders():
    if request.method == 'POST':
        title = request.form.get('title')
        description = request.form.get('description')
        due_date = request.form.get('due_date')
        # Handle other fields similarly

        # Assuming add_reminder function in reminder_manager accepts a dictionary
        reminder = {"title": title, "description": description, "due_date": due_date}
        reminder_manager.add_reminder(reminder)

        # Redirect to the reminders page to see the updated list
        return redirect(url_for('reminders'))

    # Make sure to load reminders using the adjusted function from reminder_manager
    reminders = reminder_manager.load_reminders()
    # Pass the list of reminders to the template
    return render_template('reminders.html', reminders=reminders)

if __name__ == '__main__':
    app.run(debug=True)
