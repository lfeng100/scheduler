## adds tasks to the database
import random

tasks = ['Prepare Dinner', 'Study for Exam', 'Another task', 'Job Search', 'Coop', 'Take notes', 'Study Hard', 'Grocery List', 'FreshCo shopping liist', 'NoFrills shopping', 'Meet with Family', 'Take care of siblings', 'Talk to dad', 'Plan for dinner date', 'Go to the beach', 'Holiday shopping', 'Buy new TV', 'Buy new AirPods', 'Another task', 'Meet with Professor', 'Office Hours', 'University of Waterloo', 'My dreams', 'My plans', 'My hopes for future', 'My predictions', 'My hobbies', 'What I hate', 'Daily Journal', 'Extras', 'Buy house', 'Meet with Agent', 'Meet with Real Estate Agent', 'Shopify Songs', 'Drink Water', 'Go to church', 'Do assignments', 'Do projects', 'Properties', 'Prospects', 'Testing', 'Another test', 'Reductions', 'Whatever', 'Have fun', 'Relax', 'Chill', 'Take care of myself', 'Workout', 'Gym', 'Study Routine', 'Go shopping', 'Graph Problem', 'Programming Questions', 'Written Assignments', 'Quizzes', 'Drawing Tablet', 'Electric Vehicles', 'Radiator', 'Environment', 'Awarness', 'Spirituality', 'Meditation', 'Mindfullness', 'Toast', 'Reddit Post', 'Trade Stocks']
firstNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Mary',
  'Jenn', 'Linda', 'Eli', 'Danny', 'Sarah', 'Gao', 'Rob', 'Kay', 'Sam', 'Charles', 'Roy', 'Xi', 'Chen',
  'Susan', 'Karen', 'Kristen', 'Ashley', 'Michelle', 'Michael', 'Josh', 'Andrew', 'Donna', 'Emily', 'Bill', 'Elon', 'Jeffrey', 'Jeff', 'Son', 'Sunny', 'Kayak', 'Bird']
lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Lopez', 'Gomez', 'Sharma', 'Garcia', 'Jones', 'Kardashian', 'Musk', 'Jobs', 'Gates', 'White', 'Black', 'Tatiana', 'Hu', 'He', 'Xie', 'Zhu', 'Yu', 'Du', 'Ku', 'Jenner', 'Hackman', 'Bird', 'Blue', 'Muskrat', 'Cina', 'Rock', 'Stevenson', 'Rhooms', 'Daws', 'Dawson', 'Rubin', 'Sten', 'Stein', 'Board', 'Busket', 'Hallen', 'Davison', 'Shaprio', 'Peterson', 'Trent', 'McDonalds', 'Reagan', 'Rogan', 'Whiteson', 'Hellen', 'Lu', 'Kwok', 'Swan', 'Haowei']
description = ['adorable', 'adventurous', 'aggressive','angry', 'annoyed', 'annoying', 'anxious', 'brainy', 'brave', 'breakable', 'bright','busy','calm',
               'careful','cautious','charming','cheerful','clean','clear','clever','cloudy','clumsy','colorful','combative','comfortable','concerned','condemned','confused','cooperative',
               'courageous','crazy','creepy','crowded','curious','cute','dangerous','defeated','defiant','delightful','depressed','determined','different','difficult','disgusted','distinct','disturbed','dizzy', 'dull']
status = ['Completed', 'Not Started', 'In Progress']

# gets creates a list of all entries that would later be inputted to the database
def get_tasks():
    all = []
    for i in range(5000):
        total="('"
        total+=str(tasks[random.randint(0,(len(tasks))-1)])
        total+="','"
        total+=str(description[random.randint(0,(len(description))-1)])
        total+="','"
        total+=str(status[random.randint(0,(len(status))-1)])
        total+="','"
        total+="2022-12-"
        total+=str(random.randint(1, 30))
        total+=" 11:59:59"
        total+="','"
        total+=str(random.randint(1,5));
        total+="','"
        total+="2022-11-28 02:40:"
        time = random.randint(10, 55)
        total+=str(time)
        total+="','"
        total+="2022-11-28 02:40:"
        total+=str(time+2)
        total+="','"
        total+=str(random.randint(2, 22820))
        total+="')"
        all.append(total)
    return all

# establishes a connection with the database and enters all tasks
def populateTasks():
    import mysql.connector
    
    con = mysql.connector.connect(user='webapp', password='cs348user',
                                  host='129.153.61.57',
                                  database='cs348')
    c = con.cursor()
    
    val = get_tasks()

    for i in range(15000):
        sql = r"""INSERT INTO cs348.Tasks(task_name, description, status, due_date, priority, createdAt, updatedAt, UserUserId) VALUES """
        sql += str(val[i])
        sql += ";"
        # print(sql)
        c.execute(sql)
        con.commit()
    c.close()


tasklst = get_tasks()
populateTasks()






