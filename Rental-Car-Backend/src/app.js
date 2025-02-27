const CarRoutes = require('./routes/CarRoutes');
const dotenv = require('dotenv');

dotenv.config();

app.use('/api/cars', CarRoutes);
