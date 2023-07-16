# Text

# Capstone API Requirements

In this document, we will provide a detailed explanation of the API endpoints that will be used to build the capstone application. Each API endpoint will be mapped to different use cases and user journeys to ensure the desired functionality of the application.

## Articles Endpoints

- `GET /articles`: Retrieves a list of articles.

  - Input: None
  - Output:
    - Description: Returns a list of articles.
    - Format: JSON array of article objects.

- `GET /articles/{id}`: Retrieves a specific article based on the provided ID.

  - Input:
    - `id` (path parameter): The ID of the article to retrieve.
  - Output:
    - Description: Returns the details of the specified article.
    - Format: JSON object representing the article.

## Matches Endpoints

- `GET /matches`: Retrieves a list of matches.

  - Input: None
  - Output:
    - Description: Returns a list of matches.
    - Format: JSON array of match objects.

- `GET /matches/{id}`: Retrieves a specific match based on the provided ID.

  - Input:
    - `id` (path parameter): The ID of the match to retrieve.
  - Output:
    - Description: Returns the details of the specified match.
    - Format: JSON object representing the match.

## Sports Endpoints

- `GET /sports`: Retrieves a list of sports.

  - Input: None
  - Output:
    - Description: Returns a list of sports.
    - Format: JSON array of sport objects.

- `GET /sports/{id}`: Retrieves a specific sport based on the provided ID.

  - Input:
    - `id` (path parameter): The ID of the sport to retrieve.
  - Output:
    - Description: Returns the details of the specified sport.
    - Format: JSON object representing the sport.

## Teams Endpoints

- `GET /teams`: Retrieves a list of teams.

  - Input: None
  - Output:
    - Description: Returns a list of teams.
    - Format: JSON array of team objects.

- `GET /teams/{id}`: Retrieves a specific team based on the provided ID.

  - Input:
    - `id` (path parameter): The ID of the team to retrieve.
  - Output:
    - Description: Returns the details of the specified team.
    - Format: JSON object representing the team.

## Users Endpoints

- `GET /user`: Retrieves details of the currently authenticated user.

  - Input: None
  - Output:
    - Description: Returns the profile information of the currently authenticated user.
    - Format: JSON object representing the user's profile.

- `GET /user/preferences`: Retrieves the preferences of the currently authenticated user.

  - Input: None
  - Output:
    - Description: Returns the preferences of the currently authenticated user.
    - Format: JSON object representing the user's preferences.

- `PATCH /user/preferences`: Updates the preferences of the currently authenticated user.

  - Input:
    - Request body:
      - `preferences` (object): The updated preferences of the user.
  - Output:
    - Description: Returns a success message indicating that the user's preferences have been updated.
    - Format: JSON object containing a success message.

- `PATCH /user/password`: Updates the password of the currently authenticated user.

  - Input:
    - Request body:
      - `current_password` (string): The current password of the user.
      - `new_password` (string): The new password to be set for the user.
  - Output:
    - Description: Returns a success message indicating that the user's password has been updated.
   

 - Format: JSON object containing a success message.

- `POST /users/sign_in`: Authenticates the user by signing them in.

  - Input:
    - Request body:
      - `email` (string): The email of the user.
      - `password` (string): The password of the user.
  - Output:
    - Description: Returns a success message indicating that the user has been authenticated.
    - Format: JSON object containing a success message.

- `POST /users`: Creates a new user.

  - Input:
    - Request body:
      - `name` (string): The name of the user.
      - `email` (string): The email of the user.
      - `password` (string): The password of the user.
  - Output:
    - Description: Returns a success message indicating that the user has been created.
    - Format: JSON object containing a success message.

**Note:** The API endpoints mentioned above are based on the provided API Documentation. It is crucial to ensure that the API endpoints are correctly integrated and adhere to the specified functionality as per the user stories.

Please refer to the [WD301 Capstone API Documentation](https://wd301-capstone-api.pupilfirst.school/index.html) for detailed information on request/response formats, authentication, and error handling.

It is expected that the implementation fulfills the requirements mentioned above and integrates the API endpoints seamlessly to provide the necessary data and functionality for the capstone application.

Ensure that the API endpoints align with the user stories and the proposed features to achieve the desired outcome and deliver an efficient and user-friendly capstone project.