let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const dbCon = require('./db');
const cors = require('cors');

let SECRET_KEY = "scwecwecwecew";

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

function authenticateToken(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    console.log("------",token);
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log("in verify");
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
}
app.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    dbCon.add({ email: email, password: hashedPassword })
        .then((response) => {
            console.log(response);
            if (!response.success)
                res.status(409).json({ message: 'User already registered' });
            else {
                console.log('User added');
                res.status(201).json({ message: 'User registered' });
            }

        })
        .catch(err => console.error('Error adding user:', err));
    //users.push({ username, password: hashedPassword });


})
app.post('/login',  async (req, res) => {
    const { email, password } = req.body;
    console.log(email);
    let user = await dbCon.get(email);
    console.log(user);
    //const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user[0].password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    console.log(token);
    res.json({ token });

})
app.get('/products', async (req, res) => {
    let prds = await dbCon.getAllProducts();
    console.log(prds);
    return res.status(201).json(prds);
})
app.post('/product', (req, res) => {
    let body = req.body;
    dbCon.putProduct(body)
        .then((response)=>{
            console.log(response);
            return res.status(201).json({ message: 'Product Added' });
        })
        .catch(err => console.error('Error adding product:', err));
})

function db() {
    const dbURI = 'mongodb://localhost:27017/hcl';

    mongoose.connect(dbURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => {
            console.log('Connected to MongoDB!');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB:', err);
        });
}

app.listen(3000, () => console.log("Server listing on port 3000"));