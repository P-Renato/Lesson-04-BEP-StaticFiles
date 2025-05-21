import express, {Express, Response, Request, NextFunction} from 'express';

const app: Express = express();

// app.use(express.json());
// app.use(express.static(path.join('public')));


app.use(express.static('public'));
const PORT = 5000;

app.get('/api/time', (req: Request,res: Response)=>{
    const currentTime = new Date().toLocaleDateString();
    res.send(currentTime)
})

app.get('/api/greeting', (req: Request,res: Response)=>{   
    res.json('Hello from the server')
})

app.use((req: Request,res: Response, next: NextFunction)=>{
    res.status(404).send('endpoint does not exist')
})


app.listen(PORT, ()=> {
    console.log('Server is running on port ', PORT)
})
