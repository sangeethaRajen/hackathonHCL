let express=require('express');
let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');
//import { MongoClient } from 'mongodb';


let products = [
    {
        "id": 1,
        "price": 200,
        "image": "hoole",
        "category": "Shoe"
    }
]

const app = express();
//app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World')
})

function authenticateToken(req, res, next) {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.user = decoded; // Attach user info to request
        next();
    } catch (err) {
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
}
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    const hashedPassword = await bcrypt.hash(password, 10);
    //users.push({ username, password: hashedPassword });
    res.status(201).json({ message: 'User registered' });

})
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username);
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });

})
app.get('/products', (req, res) => {
    console.log(products);
    res.send(products);
})
app.post('product',(re,res)=>{

})

app.listen(3000, () => console.log("Server listing on port 3000"));