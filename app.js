const express = require('express');
const ejs = require('ejs');
const app = express();


const aboutStartingContent = `The :first-child selector allows you to target the first element immediately inside another element. It is defined in the CSS Selectors Level 3 spec as a “structural pseudo-class”, meaning it is used to style content based on its relationship with parent and sibling content`;

const contactStartingContent = `The :first-child selector allows you to target the first element immediately inside another element. It is defined in the CSS Selectors Level 3 spec as a “structural pseudo-class”, meaning it is used to style content based on its relationship with parent and sibling content`


const posts = [];
let errorelem = ''; //if user left anything in the blog

let time = ''

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {


    posts.forEach((elem, index) => {
        if (elem.posttitle == '' || elem.postbody == '') {
            if (elem.posttitle == '') {
                errorelem = 'title'
            } else {
                errorelem = 'content'
            }
            posts.splice(index, 1)
            res.redirect('/postfailure')
        }

    })

    res.render('index', {
        heading: "Blogs",
        postarr: posts,

    })


})

app.get('/about', (req, res) => {
    res.render('about', {
        heading: "About",
        aboutContent: aboutStartingContent
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        heading: "Contact",
        contactContent: contactStartingContent
    })
})

app.get('/compose', (req, res) => {
    res.render('compose', {
        heading: "Compose"
    })
})

app.post('/compose', (req, res) => {

    let date = new Date();

    time = date.toLocaleTimeString();

    const post = {
        posttitle: req.body.posttitle,
        postbody: req.body.postbody,
        currenttime: time
    }

    posts.push(post);
    res.redirect('/')
})

app.get('/postfailure', (req, res) => {
    res.render('postfailure', {
        errorelem
    })
})


// express routing parameters

app.get('/:dynamicblog', (req, res) => {


    posts.forEach(element => {
        if (element.posttitle == req.params.dynamicblog) {
            res.render('dynamicblog', {
                element
            });
        }
    });

})

app.listen(3000, () => {
    console.log("server is runnnig on port 3000");
}) 