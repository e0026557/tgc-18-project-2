# **CoffeeTalk**

![Screenshots of CoffeeTalk's homepage](readme/mockup.png)

Link to demo : [CoffeeTalk](https://tgc-coffeetalk.netlify.app/)

## Summary

Specialty coffee making is an art, often involving many rounds of experimentation to achieve the "perfect" cup of coffee. In the process to reach this goal, many variables such as coffee rest period and water temperature have to be considered and controlled for. While every coffee bean is different and replicating the same cup of coffee is very hard, having access to relevant recipes can help narrow down the right variables to adjust, making the process less tedious and waste less coffee beans along the way. 

CoffeeTalk is a web application that aims to be a platform where coffee enthusiasts can share their coffee recipes and make use of the shared knowledge to improve their coffee-making experience without wasting precious coffee beans and spending large amount of time and effort on tedious trial-and-errors.

---

## UI/UX

### Strategy

#### Organisational Goals

As a coffee hobbyist who likes to experiment new coffee recipes to enhance my coffee-making experience, I often find myself spend large amount of time searching for coffee recipes across multiple sources such as Facebook groups and YouTube videos. However, most recipes found either use a different setup or are not detailed enough, making it difficult to re-create. Thus, a centralized informational site where coffee recipes are categorised by various coffee-related categories will be beneficial for those who are getting into coffee or are looking for coffee recipes that fit their coffee-making setups.

#### User Goals

The users of CoffeeTalk are mainly people who have an interest in specialty coffee and coffee-brewing. The aim of users is to be able to find coffee recipes that suit their coffee preferences and setup with ease. The coffee recipes should also be standardised to specify setups and basic recipe details for users to be able to follow along. Also, users would also want to be able to contribute their coffee recipes to be shared with the CoffeeTalk community who share the same interests as them. 

| User Stories | Accceptance Criteria |
| ----------- | ----------- |
| As a coffee enthusiast, I want to find coffee recipes that adopt a similar setup as mine so that I can try out | Coffee recipes should be able to be searched by the various equipment used in a particular coffee-making setup |
| As a coffee enthusiast, I want to be able to save my favorite coffee recipes for future reference | Coffee recipes should be able to be bookmarked and accessed by user |
| As someone who is getting into specialty coffee, I want to be able to find coffee recipes that are detailed enough for me to follow along and get started with | Coffee recipes posted on CoffeeTalk should adopt a fixed structure for specifying setups and details to make it easy for users to follow along |

### Structure and Skeleton

#### Database
![ERD Diagram](readme/ERD-diagram.png)

Entity-Relationship Diagram (ERD) is drawn to demostrate the various relationships between entities for the website prior to modelling the database in MongoDB.

An Express server is set up and deployed to [Heroku](https://www.heroku.com/), where API endpoints are accessible via the base URL at [https://coffeetalk-api.herokuapp.com/](https://coffeetalk-api.herokuapp.com/).

#### Sitemap
![Sitemap](readme/sitemap.png)

#### Wireframes
[Wireframes](readme/wireframes.pdf)


### Design Decisions

#### Color scheme

![Screenshot of color scheme](readme/color-scheme.png)

The color scheme chosen revolves around a brown-based primary color as it represents the color of coffee, which is the theme of the website. Brown also implies friendliness and simplicity, which matches the look that the website aims to achieve.

#### Fonts

*Inter* is the font family used for the website as it maintains great readability whether used at small or large sizes. It also helps to create space between lines of text, which is ideal for long text used in coffee recipes.

---

## Features

| Features | Description |
| ----------- | ----------- |
| Search / filter coffee recipes | This feature allows users to search and filter coffee recipes by recipe name (case-insensitive), setup, and minimum average rating. |
| Dynamic form input | This feature is implemented in *Create* and *Edit* pages, where users can dynamically add/remove input fields for *additional ingredients*,  *additional equipment*, and *steps* by clicking on the '+' and '-' buttons. Adding a new dynamic form field is achieved by appending an empty string as an element to the back of an array, whereas removing a dynamic form field is achieved by splicing the last element of the array. |
| Coffee bean information (Offcanvas) | This feature allows users to be able view detailed information about each coffee bean in a separate offcanvas by clicking on the *More Info* button next to each dropdown select option. | 
| What's new section | This feature provides user with a quick look at the latest 3 coffee recipes posted to CoffeeTalk |
| What's popular section | This feature provides user with a quick look at the top 3 coffee recipes by average rating |
| Add to favorites | This feature allows users to bookmark their favorite coffee recipes and access them via the *Favorites* page |
| Average rating | This feature calculates the average rating for each coffee recipe based on the ratings in reviews posted |

---

## Limitations and Future Implementations

1. Implement form steps for *Create* and *Edit* pages
    - Current limitation: 
      - The current forms for creating and editing recipes are very long and on a single page, making it daunting for users to fill in.
    
    - Future implementation:
      - To divide the large form into smaller form steps to make it easier for users to fill in.

2. Allow users to edit and delete reviews
    - Current limitation:
      - Due to time constraint, users currently can only post reviews for coffee recipes.

    - Future implementation:
      - Allow users the option to edit and delete the reviews they had posted.

3. Allow users to post, edit and delete entries for coffee beans, grinders, and brewers
    - Current limitation:
      - Due to time constraint, users currently can only post and edit coffee recipes with the pre-defined selection of coffee beans, grinders, and brewers.

    - Future implementation:
      - Create forms for users to post, edit and delete entries for coffee beans, grinders, and brewers.

---

## Technologies Used

### Backend

1. Javascript

2. [Express](https://expressjs.com/)

3. [MongoDB Node Driver](https://www.mongodb.com/docs/drivers/node/current/)
    - To communicate with MongoDB database

4. [cors](https://www.npmjs.com/package/cors)
    - Middleware to enable Cross-Origin Resource Sharing (CORS)

5. [dotenv](https://www.npmjs.com/package/dotenv)
    - To allow loading of environment variables from .env file

6. [Bcrypt](https://www.npmjs.com/package/bcrypt)
    - For hashing and validating email


### Frontend

1. HTML

2. CSS

3. Javascript

4. [React](https://reactjs.org/)

5. [Bootstrap 5](https://getbootstrap.com/docs/5.0/getting-started/introduction/) 
    - Used for styling website

6. [React Bootstrap](https://react-bootstrap.github.io/)
    - Used for styling website

7. [Axios](https://github.com/axios/axios)
    - Used to communicate with Express server to create, read, update and delete data in database

8. [Font Awesome](https://fontawesome.com/)
    - Used for icons displayed in website

---

## Testing

The website is tested for responsiveness using Developer Tools on Chrome browser for mobile, tablet and desktop screen widths.
The test cases can be found [here](readme/test-cases.pdf).

---

## Deployment

### Frontend

The website is hosted using [Netlify](https://www.netlify.com/), deployed directly from the main branch of this Github repository.
For the detailed deployment steps, you can refer to the blog post on Netlify [here](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/).


### Backend

The Express server is hosted using [Heroku](https://www.heroku.com/), deployed directly from the main branch of the Github repository [here](https://github.com/e0026557/tgc-18-project-2-api).
For the detailed deployment steps, you can refer to the documentation on Heroku [here](https://devcenter.heroku.com/articles/git#deploy-your-code).

---

## Credits and Acknowledgement

### Logo :
- [Adobe Express Logo Maker](https://www.adobe.com/express/create/logo) - Used to generate brand logo for website

### Fonts :
- [Google Fonts](https://fonts.google.com/) - Used for fonts displayed in website 

### Icons :
- [Font Awesome](https://fontawesome.com/) - Used for icons displayed in website

### CSS Spinner :
- [SpinKit](https://tobiasahlin.com/spinkit/) - Adapted CSS spinner for use in website

### Regular Expressions
- [w3resource](https://www.w3resource.com/javascript/form/email-validation.php) - Used Regex for email validation

- [StackOverflow](https://stackoverflow.com/questions/3809401/what-is-a-good-regular-expression-to-match-a-url) - Used Regex for URL validation

### Dynamic Form Input :
- [FreeCodeCamp](https://www.freecodecamp.org/news/build-dynamic-forms-in-react/) - For dynamic form input implementation idea

### Images :
- [Unsplash](https://unsplash.com/) - For coffee images used in website

### Screenshot :
- [CreateMockup.com](https://www.createmockup.com/generate/) - Used to generate responsive website mockup for README file