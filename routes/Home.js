const router=require('express').Router();
const Movie=require('../models/playlist');
const {getuser}=require('../middleware/authentication')
router.get('/',async (req,res)=>{
  const uuid = req.cookies.uid;

  if (!uuid) {
    return res.redirect('/');
  }

  const user =  getuser(uuid); // Ensure getUser is an async function if it involves async operations

  if (!user) {
    return res.redirect('/');
  }

  console.log("User found: ", user);

  const moviedata = await Movie.find({ Email: user });
    return res.render('Home',{data:null,movies:moviedata})
})

router.post('/',async(req,res)=>{
    try{
    const {moviename}=req.body;
    const title = moviename
 
    const url = `http://www.omdbapi.com/?t=${title}&apikey=c4210a92`;
    const uuid = req.cookies.uid;

    if (!uuid) {
      return res.redirect('/');
    }

    const user =  getuser(uuid); // Ensure getUser is an async function if it involves async operations

    if (!user) {
      return res.redirect('/');
    }

    console.log("User found: ", user);

    const moviedata = await Movie.find({ Email: user });
    
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
    return res.render("Home",{data:data,movies:moviedata});
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });
 
    }
    catch(err){
     return res.render('Home',{data:null,movie:{}})
    }
})

module.exports=router;