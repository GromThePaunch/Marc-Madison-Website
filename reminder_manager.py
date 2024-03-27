import json, os

# Function to load reminders from the file
def load_reminders():
    try:
        with open('reminders.json', 'r') as file:
            data = json.load(file)
            # Convert the dictionary of dictionaries into a list of dictionaries
            reminders_list = list(data.values())
            return reminders_list
    except FileNotFoundError:
        return []

# Function to save reminders to the file
def save_reminders(reminders):
    with open('reminders.json', 'w') as file:
        json.dump(reminders, file, indent=4)

# Function to add a new reminder
def add_reminder():
    reminders = load_reminders()

    title = input("Enter the title of the reminder: ")
    description = input("Enter the description of the reminder: ")
    date = input("Enter the date of the reminder (YYYY-MM-DD): ")
    time = input("Enter the time of the reminder (HH:MM): ")
    recurrence = input("Enter the recurrence of the reminder (daily, weekly, monthly, yearly): ")
    day = input("Enter the day of the week (Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday): ")
    completed = input("Enter if the reminder is completed (True or False): ")

    reminder = {
        'title': title,
        'description': description,
        'date': date,
        'time': time,
        'recurrence': recurrence,
        'day' : day,
        'completed' : completed
    }

    # Assign a new, unique ID (simple example, consider using uuid for production)
    new_id = max([int(r.get("id", 0)) for r in reminders.values()]) + 1
    reminder["id"] = str(new_id)

    reminders[title] = reminder
    save_reminders(reminders)
    print("Reminder added successfully!")
    
# Function to view all reminders
def view_reminders(reminders):
    for reminder in reminders.values():
        print(f"ID: {reminder['id']}")
        print(f"Title: {reminder['title']}")
        print(f"Description: {reminder['description']}")
        print(f"Due Date: {reminder['due_date']}")
        print(f"Recurrence: {reminder['recurrence']}")
        print(f"Day: {reminder['day']}")
        print(f"Completed: {reminder['completed']}")
        print("------------------------")

# Function to update a reminder
def update_reminder(reminders):
    title = input("Enter the title of the reminder to update: ")
    if title in reminders:
        description = input("Enter the new description of the reminder: ")
        date = input("Enter the new date of the reminder (YYYY-MM-DD): ")
        time = input("Enter the new time of the reminder (HH:MM): ")

        reminder = {
            'title': title,
            'description': description,
            'date': date,
            'time': time
        }

        reminders[title] = reminder
        save_reminders(reminders)
        print("Reminder updated successfully!")
    else:
        print("Reminder not found.")

# Function to delete a reminder
def delete_reminder(reminders):
    title = input("Enter the title of the reminder to delete: ")
    if title in reminders:
        del reminders[title]
        save_reminders(reminders)
        print("Reminder deleted successfully!")
    else:
        print("Reminder not found.")

# Main program
def main():
    reminders = load_reminders()

    while True:
        print("Reminder Manager")
        print("1. Add Reminder")
        print("2. View Reminders")
        print("3. Update Reminder")
        print("4. Delete Reminder")
        print("5. Exit")

        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            add_reminder(reminders)
        elif choice == '2':
            view_reminders(reminders)
        elif choice == '3':
            update_reminder(reminders)
        elif choice == '4':
            delete_reminder(reminders)
        elif choice == '5':
            break
        else:
            print("Invalid choice. Please try again.")

if __name__ == '__main__':
    main()
