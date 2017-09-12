      //topics in a array
      var topics = ["Fullmetal Alchemist", "Cowboy Bebop", "Trigun", "One Piece", "Dragon Ball Z"];
      
      function displayAnimeInfo() {
      //set variables, getting an attribute for the name of the movie and 
        var anime = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + anime + "&api_key=dc6zaTOxFJmzC&limit=10";
      //call ajax function  
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {
        //Empty view div to clear out past displays, create for loop.  
          $("#anime-view").empty();
          for(var i = 0; i < response.data.length; i++){
          
        //Create variables, including new div where the rating/images go    
          var animeDiv = $("<div id='anime'>");

          var rating = response.data[i].rating;

          var pOne = $("<p>").text("Rating: " + rating);

          animeDiv.append(pOne);
          
          //create variables for gifs 

          var gifURL1 = response.data[i].images.fixed_height_still.url;
          var gifURL2 = response.data[i].images.fixed_height.url;

          //create a bunch of attributes for image  

          var image = $("<img>").attr("src", gifURL1);
          var datastill = image.attr("data-still", gifURL1);
          var dataanimate = image.attr("data-animate", gifURL2);
          var datastate = image.attr("data-state", "still");
        
          animeDiv.prepend(image);

          $("#anime-view").append(animeDiv);

          //create an on-click function to have the gif switch between animate/still states

          image.on("click", function() {
          var state = $(this).attr("data-state");
          console.log(state);

          if (state === "still"){
          state = "animate";
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", state);

          }

          else if (state === "animate"){
          state = "still";
             $(this).attr("src",  $(this).attr("data-still"));
             $(this).attr("data-state", state);
          }
        })
        }});

      }

      //rendering buttons function built based on length of the topics array and creating attributes for those buttons

      function renderButtons() {

        $("#buttons-view").empty();

        for (var i = 0; i < topics.length; i++) {

          var a = $("<button>");

          a.addClass("anime");

          a.attr("data-name", topics[i]);

          a.text(topics[i]);

          $("#buttons-view").append(a);
        }
      }

      //creates a function which pushes those which are added by button onto the array, and then empties the value.

      $("#add-anime").on("click", function(event) {
        event.preventDefault();

        var anime = $("#anime-input").val().trim();

        topics.push(anime);

        renderButtons();

        $("#anime-input").val("")
      });

      renderButtons();

      //allows anything with the anime class to run the function, including the buttons

       $(document).on("click", ".anime", displayAnimeInfo);