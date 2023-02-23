console.log('Connecting to MongoDB...');
mongoose.connect('mongodb://localhost/covid', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => console.error(err));
db.once('open', () => {
  console.log('Connected to MongoDB!');
  
  // Define the COVID data
  const data = [
    { state: 'Maharashtra', infected: 223724, recovered: 39842, death: 9171 },
    { state: 'Tamil Nadu', infected: 123456, recovered: 67890, death: 2345 },
    { state: 'Kerala', infected: 98765, recovered: 54321, death: 234 },
    { state: 'Delhi', infected: 56789, recovered: 34567, death: 456 },
    { state: 'Punjab', infected: 23456, recovered: 9876, death: 156 },
    { state: 'Uttar Pradesh', infected: 45678, recovered: 23456, death: 567 },
  ];

  // Save the COVID data to the database
  console.log('Saving data to MongoDB...');
  Covid.insertMany(data, (err, docs) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Data saved successfully!');
      console.log(docs);
    }
    db.close();
  });
});
