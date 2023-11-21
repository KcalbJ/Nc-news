const express = require('express');
const { getAllTopics } = require('./controllers/topics-controller');

const { handle404, handleCustomErrors, handleServerErrors, handlePsqlErrors } = require('./errors/error-handlers');
const { getEndpoints } = require('./controllers/endpoint-controller');
const { getArticleById, getAllArticles, patchArticleById } = require('./controllers/ariticles-controller');
const { getCommentsByArticleId, postCommentByArticleId } = require('./controllers/comments-controller');



const app = express()

app.use(express.json())
app.get('/api/topics', getAllTopics)
app.get('/api', getEndpoints)
app.get('/api/articles/:article_id', getArticleById)
app.get('/api/articles', getAllArticles)
app.get('/api/articles/:article_id/comments' ,getCommentsByArticleId )

app.post('/api/articles/:article_id/comments', postCommentByArticleId)
app.patch('/api/articles/:article_id', patchArticleById)

app.all("*", handle404);
app.use(handlePsqlErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);


module.exports = app;