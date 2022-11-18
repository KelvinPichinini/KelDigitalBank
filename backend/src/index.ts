import app from './app';
import 'dotenv/config'

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(process.env.DB_PORT)
  console.log(process.env.DB_USER)
  console.log(process.env.DB_HOST)
  console.log(process.env.DB_PASS)
  console.log(`Server running at http://localhost:${PORT}`);
});