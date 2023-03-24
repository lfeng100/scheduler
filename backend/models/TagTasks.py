## just run this file to populate TagTasks table - databse connection + scripts are all set up


# get_tags() gets a list of all tags currently in the database
def get_tags():
    import mysql.connector

    con = mysql.connector.connect(user='webapp', password='cs348user',
                                  host='129.153.61.57',
                                  database='cs348')
    c = con.cursor()

    tags = []    
    # get a list of all tags
    c.execute("""SELECT * FROM Tags""")
    
    # append Tags
    for row in c:
        tags.append(row[0]) 
    c.close()
    return tags

# get_tasks() gets a list of all tasks currently in the databse 
def get_tasks():
    import mysql.connector
    
    con = mysql.connector.connect(user='webapp', password='cs348user',
                                  host='129.153.61.57',
                                  database='cs348')
    c = con.cursor()

    tags = []    
    # get a list of all tasks
    c.execute("""SELECT * FROM Tasks""")
    
    # append Tags
    for row in c:
        tags.append(row[0]) 
    c.close()
    return tags

# getval(tags, tasks) creates random entries of dates, tags and tasks to add to the tagtasks table
def getval(tags, tasks):    
    import random
    tagtasks = []
    for i in range(10000):
        total = "('"
        total+="2022-11-28 02:40:"
        time = random.randint(10, 55)
        total+=str(time)
        total+="','"
        total+="2022-11-28 02:40:"
        total+=str(time+2)
        total+="',"
        total+= str(tags[random.randint(1, 11000)])
        total+=","
        total+= str(tasks[random.randint(1, (len(tasks) - 1))])
        total+=")"
        tagtasks.append(total)
        # print(total)
    return tagtasks
        
# populateTagTasks(tags,tasks) runs establishes a connection to the database and writes
#       SQL queries to populate the data
def populateTagTasks(tags, tasks):
    import mysql.connector
    
    con = mysql.connector.connect(user='webapp', password='cs348user',
                                  host='129.153.61.57',
                                  database='cs348')
    c = con.cursor()
    
    val = getval(tags, tasks)

    for i in range(15000):
        sql = "INSERT INTO cs348.TagTasks (createdAt, updatedAt, TagTagId, TaskTaskId) VALUES "
        sql += str(val[i])
        sql += ";"
        # print(sql)
        c.execute(sql)
        con.commit()
    c.close()


taglst = get_tags()
tasklst = get_tasks()
# print(getval(taglst, tasklst))
populateTagTasks(taglst, tasklst)
