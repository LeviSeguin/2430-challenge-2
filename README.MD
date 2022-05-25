This portfolio builder allows users to create, view, and delete their own portfolios. Tap new portfolio to make a portfolio, and tap saved portfolios
to view saved portfolios. By tapping a saved portfolio, you can view it. Long pressing on a saved portfolio will delete it.

While I didn't have time to get SQLite working, this app uses an array to store the users portfolios. A Portfolio object is created and pushed into an
array, and when a user deletes a portfolio, it is spliced out of the array. 

Different routes are used to display each page, as well as a route for viewing a portfolio.