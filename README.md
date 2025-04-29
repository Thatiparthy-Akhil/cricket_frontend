🏏 Cricket CMS – Frontend
This is the React-based frontend for the Cricket CMS application. It provides a responsive user interface to view live cricket scores, players, and news articles. Users can log in to interact with the content, while admins can post and manage articles.

For deployement i used Azure:
link:https://gray-cliff-08a709010.6.azurestaticapps.net
![image](https://github.com/user-attachments/assets/54584a4a-4e16-49c7-a28a-404d7903d482)


Features
🔐 JWT-based user login & logout

🏏 Display of real-time live match scores (from CricAPI)

🧑‍💼 List of international cricket players with country info

📰 Dynamic articles section for news and updates

❤️ Like articles (for authenticated users)

🎨 Modern responsive UI using Material UI and custom CSS

🔗 Secure API communication with backend

screenshots:
project structure:
![alt text](<Screenshot 2025-04-22 142427.png>)

login
![alt text](<Screenshot 2025-04-22 141012.png>)
Homepage:
![alt text](<Screenshot 2025-04-22 141203.png>)

![alt text](<Screenshot 2025-04-22 141218.png>)
Articles:
when user login:
![image](https://github.com/user-attachments/assets/d160ec96-0a98-4aba-b198-c2ec1dca87bd)
when admin login:
admin can create, update and delete the articles
![image](https://github.com/user-attachments/assets/89cd1b0e-6c7e-499c-9e60-0e2cc6aad6d4)


players:
![alt text](<Screenshot 2025-04-22 141246.png>)
livescores:
![alt text](<Screenshot 2025-04-22 141304.png>)

Tech Stack
React (Functional components)

React Router for navigation

Material UI + Custom CSS

Axios for API calls

JWT for auth management (stored in localStorage)

CricAPI for live match and player data

Setup Instructions:
FronEnd link:
1.git clone https://github.com/Thatiparthy-Akhil/cricket_frontend.git
Backend Link:
2.git clone https://github.com/Thatiparthy-Akhil/cricket-cms.git
cd cricket-frontend

2. install dependencies
   npm install

3. start backend server:
   node server.js

4. start frontend server:
   npm run dev
