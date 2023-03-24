import _ from 'lodash';

const firstNames = ['James', 'Robert', 'John', 'Michael', 'David', 'William', 'Richard', 'Joseph', 'Mary',
  'Jenn', 'Linda', 'Eli', 'Danny', 'Sarah', 'Gao', 'Rob', 'Kay', 'Sam', 'Charles', 'Roy', 'Xi', 'Chen',
  'Susan', 'Karen', 'Kristen', 'Ashley', 'Michelle', 'Michael', 'Josh', 'Andrew', 'Donna', 'Emily', 'Bill', 'Elon', 'Jeffrey', 'Jeff', 'Son', 'Sunny', 'Kayak', 'Bird'];

const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller', 'Lopez', 'Gomez', 'Sharma', 'Garcia', 'Jones', 'Kardashian', 'Musk', 'Jobs', 'Gates', 'White', 'Black', 'Tatiana', 'Hu', 'He', 'Xie', 'Zhu', 'Yu', 'Du', 'Ku', 'Jenner', 'Hackman', 'Bird', 'Blue', 'Muskrat', 'Cina', 'Rock', 'Stevenson', 'Rhooms', 'Daws', 'Dawson', 'Rubin', 'Sten', 'Stein', 'Board', 'Busket', 'Hallen', 'Davison', 'Shaprio', 'Peterson', 'Trent', 'McDonalds', 'Reagan', 'Rogan', 'Whiteson', 'Hellen', 'Lu', 'Kwok', 'Swan', 'Haowei'];

const tasks = ['Prepare Dinner', 'Study for Exam', 'Another task', 'Job Search', 'Coop', 'Take notes', 'Study Hard', 'Grocery List', 'FreshCo shopping liist', 'NoFrills shopping', 'Meet with Family', 'Take care of siblings', 'Talk to dad', 'Plan for dinner date', 'Go to the beach', 'Holiday shopping', 'Buy new TV', 'Buy new AirPods', 'Another task', 'Meet with Professor', 'Office Hours', 'University of Waterloo', 'My dreams', 'My plans', 'My hopes for future', 'My predictions', 'My hobbies', 'What I hate', 'Daily Journal', 'Extras', 'Buy house', 'Meet with Agent', 'Meet with Real Estate Agent', 'Shopify Songs', 'Drink Water', 'Go to church', 'Do assignments', 'Do projects', 'Properties', 'Prospects', 'Testing', 'Another test', 'Reductions', 'Whatever', 'Have fun', 'Relax', 'Chill', 'Take care of myself', 'Workout', 'Gym', 'Study Routine', 'Go shopping', 'Graph Problem', 'Programming Questions', 'Written Assignments', 'Quizzes', 'Drawing Tablet', 'Electric Vehicles', 'Radiator', 'Environment', 'Awarness', 'Spirituality', 'Meditation', 'Mindfullness', 'Toast', 'Reddit Post', 'Trade Stocks'];

const tags = ['Math 235', 'Groceries', 'Family', 'Tests', 'Exams', 'Others', 'Miscellaneous', 'Midterm', 'Online', 'Shopping', 'Lists', 'CS 341', 'CS 837', 'CO 912', 'School', 'University', 'Brother', 'Birthdays', 'MATH 237', 'Hello', 'Just a tag', 'Food', 'Extras', 'Shopping Spree', 'Diary', 'Ice cream', 'Calculator', 'What to Buy', 'Another Tag', 'Myself', 'Personal', 'Work', 'Headphones', 'CO 833', 'Graduate studies', 'Keyboard', 'Teachers', 'Thoughs', 'World Events', 'Current Affairs'];

const colors = ["C2B078", "E5BE01", "CBD0CC", "734222", "49678D", "6D6552", "DE4C8A", "AEA04B", "CB2821", "497E76", "1E213D", "49678D", "BDECB6", "59351F", "A5A5A5", "781F19", "E1CC4F", "59351F", "00BB2D", "49678D"];

const emails = ['@gmail.com', '@yahoo.com', '@aol.com', '@outlook.com', '@hotmail.com', '@uwaterloo.ca'];

export function generateUser() {
  let fName = _.sample(firstNames);
  let lName = _.sample(lastNames);
  let name = fName + " " + lName;
  let randomNum = _.random(1, 1000000);
  let username = _.lowerCase(fName) + _.lowerCase(lName) + randomNum;
  let password = 'PaSs@' + randomNum + fName;
  let email = username + _.sample(emails);
  return {
    name, username, password, email
  };
}

export function generateTask() {

}

export function generateTag() {
  let tag_name = _.sample(tags);
  let color = _.sample(colors);
  let user_id = _.random(1, 22000);
  return {
    tag_name, color, user_id
  };
}