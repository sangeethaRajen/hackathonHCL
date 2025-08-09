let express = require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
const dbCon = require('./db');
const cors = require('cors');
const path = require('path');



let SECRET_KEY = "scwecwecwecew";

const app = express();
const corsOptions = {
  origin: 'http://localhost:5173', // your frontend origin
  credentials: true,               // allow cookies/auth headers
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'dist')));

app.get('/', (req, res) => {
   res.send('Hello World');
})

function authenticateToken(req, res, next) {
    console.log(req.cookies);
    const token = (req.cookies && req.cookies.token) || req.headers.authorization?.split(' ')[1];
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

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
    console.log(token);
    res.json({ token });

})
app.get('/products',authenticateToken, async (req, res) => {
    let prds = await dbCon.getAllProducts();
    console.log(prds);
    return res.status(201).json(prds);
})
app.post('/product',authenticateToken, (req, res) => {
    let body = req.body;
    dbCon.putProduct(body)
        .then((response)=>{
            console.log(response);
            return res.status(201).json({ message: 'Product Added' });
        })
        .catch(err => console.error('Error adding product:', err));
})



app.listen(3000, () => console.log("Server listing on port 3000"));