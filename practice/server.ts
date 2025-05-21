import express, {Express, Response, Request, NextFunction} from 'express';
import fs from 'fs';

const app: Express = express();
const PORT = 5555;
app.use(express.json())
app.use(express.urlencoded())

type User = {
    id: number,
    name: string,
    username: string,
    email: string,
    address: {
      street: string,
      suite: string,
      city: string,
      zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
      name: string,
      catchPhrase: string,
      bs: string,
    },
}

app.get('/users', (req: Request, res: Response, next: NextFunction) =>{
    const users = JSON.parse(fs.readFileSync('db/users.json', 'utf-8'))
    res.send(users)
})

app.get('/users/:id', (req: Request, res: Response, next: NextFunction) =>{
    const users = JSON.parse(fs.readFileSync('db/users.json', 'utf-8'))
    console.log(users)

    const id = Number(req.params.id);
    const foundUser = users.find((x: User)=> x.id === id)

    if(!foundUser) {
        res.status(404).send('user not found')
    } else {
        res.json(foundUser)
    }
})

app.post('users/signup', (req: Request, res: Response, next: NextFunction)=> {
    const {
        name,
        username ,
        email ,
        address, 
        phone,
        website,
        company,
    } = req.body;

    const users = JSON.parse(fs.readFileSync('db/users.json', 'utf-8'))

    const newUser = {
        id: users.length + 1,
        name,
        username ,
        email ,
        address, 
        phone,
        website,
        company,
    } 

    users.push(newUser)

    fs.writeFileSync('db/users.json', JSON.stringify({users}), 'utf-8')

    res.json({msg: 'user added', users})
})

app.listen(PORT, ()=> console.log('Server is running on port ', PORT))