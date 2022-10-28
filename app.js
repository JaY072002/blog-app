const express = require('express');
const ejs = require('ejs');
const app = express();

const homeStartingContent = `lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen bu`;

const aboutStartingContent = `lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It hu`;

const contactStartingContent = `lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stas containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsu`


const posts = [];
let errorelem = ''; //if user left anything in the blog


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
        postarr: posts
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
    const post = {
        posttitle: req.body.posttitle,
        postbody: req.body.postbody
    }

    posts.push(post);
    res.redirect('/')
})

app.get('/postfailure', (req, res) => {
    res.render('postfailure', {
        errorelem
    })
})

app.listen(3000, () => {
    console.log("server is runnnig on port 3000");
}) 