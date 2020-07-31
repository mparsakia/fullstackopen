// *********************************************************************
// Collection of helper functions to assist with the blog list 4.3 - 4.5
// *********************************************************************

const dummy = (blogs) => {
  return 1;   // always returns 1
}


const totalLikes = (blogs) => {
  const result = blogs.reduce(function (acc, obj) {
    return acc + obj.likes;
  }, 0);
  return result;
};
// arr.reduce(function (acc, obj) { return acc + obj.x; }, 0); 
// this is another way of getting a "sum" instead of looping over everything with a for loop.


const favoriteBlog = (blogs) => {
  const sorted = blogs.sort((a,b) => (a.likes < b.likes) ? 1 : -1);  // sort high to low
  const topresult = sorted[0];
  const answerObj = {
    title: topresult.title,
    author: topresult.author,
    likes: topresult.likes
  }
  return answerObj;
}
// https://flaviocopes.com/how-to-sort-array-of-objects-by-property-javascript/
// return 1 communicates to sort() that object b takes precedence in sorting over obj a
// return -1 does the opposite. We can even extend this functionality to handle eq values.
// list.sort((a, b) => (a.color > b.color) ? 
// 1 : (a.color === b.color) ? ((a.size > b.size) ? 1 : -1) : -1 )


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}


