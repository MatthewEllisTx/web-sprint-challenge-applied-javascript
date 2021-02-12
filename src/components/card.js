// import { response } from "msw/lib/types";
// I don't know what this does but it caused an error

const Card = (article, category) => {
  // TASK 5
  // ---------------------
  // Implement this function, which should return the markup you see below.
  // It takes as its only argument an "article" object with `headline`, `authorPhoto` and `authorName` properties.
  // The tags used, the hierarchy of elements and their attributes must match the provided markup exactly!
  // The text inside elements will be set using their `textContent` property (NOT `innerText`).
  // Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
  //
  // <div class="card">
  //   <div class="headline">{ headline }</div>
  //   <div class="author">
  //     <div class="img-container">
  //       <img src={ authorPhoto }>
  //     </div>
  //     <span>By { authorName }</span>
  //   </div>
  // </div>
  //

  const {headline, authorPhoto, authorName} = article;

  const cardDiv = document.createElement('div');
  const headlineDiv = document.createElement('div');
  const authorDiv = document.createElement('div');
  const imgDiv = document.createElement('div');
  const img = document.createElement('img');
  const authorSpan = document.createElement('span');

  cardDiv.classList.add('card', category);
  headlineDiv.className = 'headline';
  authorDiv.className = 'author';
  imgDiv.className = 'img-container';

  headlineDiv.textContent = headline;
  img.src = authorPhoto;
  authorSpan.textContent = authorName;

  cardDiv.append(headlineDiv, authorDiv);
  authorDiv.append(imgDiv, authorSpan);
  imgDiv.appendChild(img);

  cardDiv.addEventListener('click', function(){
    console.log(headline);
  })

  return cardDiv;
}

const cardAppender = (selector) => {
  // TASK 6
  // ---------------------
  // Implement this function that takes a css selector as its only argument.
  // It should obtain articles from this endpoint: `https://lambda-times-api.herokuapp.com/articles`
  // However, the articles do not come organized in a single, neat array. Inspect the response closely!
  // Create a card from each and every article object in the response, using the Card component.
  // Append each card to the element in the DOM that matches the selector passed to the function.
  //

  fetch('https://lambda-times-api.herokuapp.com/articles')
    .then( response => response.json())
    .then( response => {
      const parentNode = document.querySelector(selector);
      const tabs = document.querySelectorAll('.tab');

      for(let topic in response.articles){

        response.articles[topic].forEach( article => {
          parentNode.appendChild( Card(article, topic) );
        })

        // I did this in tab.js originally, but node.js messed it up. I figured I didn't want to deal with formatting
        // and I figured that if buttons changed it would at least kind of match up with the topic (hence .indexOf)
        //also this works because in index.js card.js is called after tabs.js
        tabs.forEach( tab => {
          // console.log(tab, topic);
          if(tab.textContent.indexOf(topic) != -1){
            tab.addEventListener('click', function(){
              document.querySelectorAll('.card').forEach( card => {
                if(Array.from(card.classList).indexOf(topic) != -1){
                  card.style.display = 'flex';
                } else {
                  card.style.display = 'none';
                }

              })
            })
          }
        })

      }
    })

}

export { Card, cardAppender }
