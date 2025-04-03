# personal-blog-platform
This is personal blog site where you can post your blogs. It also includes about page, Projects page, Contact Page, Archive and Love page.It is like portfolio+blog site.

## To get stared

```bash
# Clone this repo
git clone https://github.com/sanjivthapasvt/blog-platform.git

#Change directory to frontend
cd blog-platform/frontend

#install dependencies
npm install

#run the server
npm run dev

#make sure to create .env and add api url if you are on localhost you can use
echo VITE_API_URL=http://127.0.0.1:8000/api >> .env

#You can edit pages and component to your liking

#Let's get started with backend
cd blog-platform/backend/backend

#create virtual env for python
python -m venv venv

#activate it
source venv/bin/activate

#install dependencies
pip install -r requirements.txt

#create .env and add postgres database URL like example below or you can go to settings.py and use sqllite
touch .env #DATABASE_URL=postgresql://<username>:<password>%40%23@localhost:5432/<bdname>

#run migration
python manage.py migrate

#run server
python manage.py runserver

#Your backend should be running if everything was done you can message me if it didn't work
```


## Licensing

You are free to use any part of code or all part of code and use it to your liking but please make sure to give me proper credit.