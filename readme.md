# HeyTutor - Memotest

Please follow all the instructions wrote on this file for implements the project on your machine.

### Pre-requisites
*	Docker installed (https://docs.docker.com/engine/install/)
*	Docker Compose  installed (https://docs.docker.com/compose/install/)
*	Node.js installed. (https://nodejs.org/en/download)
*	Npm Installed.
*	Terminal or Docker desktop

### Steps 
#### Backend
* After cloning the repository you have to position in the backend folder.
* Run `docker run --rm \
    -u "$(id -u):$(id -g)" \
    -v $(pwd):/var/www/html \
    -w /var/www/html \
    laravelsail/php81-composer:latest \
    composer install --ignore-platform-reqs`
This creates a small php container to install Composer and all of dependencies in vendor folder.

> This step is important because allow us to use Laravel Sail

* You can create an alias for sail commands:

    `alias sail='[ -f sail ] && sh sail || sh vendor/bin/sail'`
* Or running directly from vendor folder:

   `./vendor/bin/sail`
* Create a .env file in root backend directory. You can copy the .env.example content file.
* Then run the command:

    `sail up --build`

* You can use to start and stop containers

     `sail up`
     `sail down`
* For detach container execution you should use:

    `sail up -d`
* Wile containers are running, you must to run database migrations and seeders to create and fill with data the required tables for this project:

    `sail artisan migrate`
    `sail artisan db:seed`
* The API runs on http://0.0.0.0:80 (The port depends of your PORT configuration in .env file)

#### Frontend
* You have to position in the frontend folder.
* There is .env.local file to config the right API URL. Please make sure is the same that the backend API URL.
* The run the commands:
`npm install`
`npm run dev`
 * The application runs on http://localhost:3000