const Aila = require('../models/ailaModel');
const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/AilaDBTest';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useCreateIndex: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
 
   describe('Testing if product is being inserted', () => {
    it('addAilaTest', () => {
    const aila = {
    'ailaName': 'Golden Oak',
    'ailaPrice': '880',
    'ailaType':'Whisky',
    'ailaMl':'750'
    };
    
    return Aila.create(aila)
    .then((ailaData) => {
    expect(ailaData.ailaName).toEqual('Golden Oak');
    });
    });
   
    it('Testing if product is being deleted', async () => {
    const status = await Aila.deleteOne({_id:Object('603a134c0b41dd3d5c96b27b')});
    expect(status.ok).toBe(1);
   });
   it('Testing if product is being updated', async () => {
    return Aila.updateOne({_id :Object('605d9faaccd51f07b8e47513')}, 
   {$set : {ailaName:'Khukuri Rum'}})
    .then((ailaData)=>{
    expect(ailaData.ailaName).toEqual('Khukuri Rum')
    })
    
   });
    
   })
   