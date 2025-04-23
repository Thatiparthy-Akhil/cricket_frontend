🏏 Cricket CMS – Frontend
This is the React-based frontend for the Cricket CMS application. It provides a responsive user interface to view live cricket scores, players, and news articles. Users can log in to interact with the content, while admins can post and manage articles.

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
![alt text](<Screenshot 2025-04-22 141234.png>)

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
