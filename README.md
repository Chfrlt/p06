# JustStreamIt web app

***
This project is part of the python developer course on [Openclassrooms](http:/openclassrooms.com).

The goal is to create a REST API application allowing the view and classification of a list of movie drawn from a local API.

***

* **[Setup](#Setup)**
  * [Virtual environment creation](#Create-a-virtual-environment)
  * [Database creation](#Create-&-populate-the-database)
* **[Usage](#Usage)**
* **[Content](#Content)**


## **Setup**

***

</br>
A Python installation is required.

> The code was written using python 3.10.2. User discretion is advised when using an earlier version.

Assuming a git installation, clone the repository using:

    $git clone https://github.com/Chfrlt/P6

</br>

### **Create a virtual environment**

</br>

> The following instructions are the ones recommended for python 3.6 or greater. If your python installation is an earlier version, please consult the associated documentation.

Create a virtual environnement using:

    $python -m venv <env_name>

To activate it:

* On Windows:

        $env_name/Script/activate

* On Linux/Mac:

        $source env_name/bin/activate

</br>

### **Create & populate the database**

</br>
Start by cloning the API, using:

    $git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR

Install the python dependencies using:

    $pip install -r requirements.txt

Populate the database using:

    python manage.py create_db

## **Usage**

***

Run the server using:

    $python manage.py runserver

Then proceed the html file (**front.html**)

## **Content**

The website displays a carousel for 4 categories. By default, these categories are: 

> * Best rated movies
> * Action
> * Drama
> * Mystery

For each of the category, seven (*value by default*) movies are displayed.

Lastly, you can click on an image to display a modal that shows the movie's details.