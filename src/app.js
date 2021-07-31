// const mongoose=require("mongoose");

// // create a connection and datanase too if not exist
// mongoose.connect("mongodb://localhost:27017/CourseDB",{ useNewUrlParser: true, useUnifiedTopology: true }).then( ()=>{
//     console.log('connection successful')
// } ).catch( (err)=>{
//     console.log(err) 
// });


// define schema (structrue of document). add default values and validators
// const languageSchema = new mongoose.Schema( {
//     name: {type: String, //validating name
//         required:true  
//     }, 
//     type:String,
//     author:String,
//     active:Boolean,
//     videos:Number,
//     date:{
//         type:Date,
//         default:Date.now
//     }

// } );

// create a model. with it, we can create,update delete collection. collection name should be 
// pascal convention(first letter is capital) singular then it will be converted into plural, 
// Language will be Languages. 

// const Language = new mongoose.model("Language",languageSchema); //Language is a class

// create or insert one document using async and await........................................................

// const  createDocs = async()=>{
//     try{
//         const totalLanguage=new Language({
//             name: "angular",
//             type:"frontend",
//             author:"suresh adhikari",
//             active:false,
//             videos:10
//         });
//       const result= await totalLanguage.save();
//       console.log(result);
//     }catch(err){
//         console.log(err);
//     }
    
// }
// createDocs();
// .................................................................................................................

// create or insert multiple document using async and await ........................................................

// const createDocs = async ()=>{
//  try {
//      const totalLanguage = new Language({
//             name: "angular",
//             type:"frontend",
//             author:"suresh adhikari",
//             active:false,
//             videos:10
//      });
//       const database = new Language({
//             name: "mongodb",
//             type:"database",
//             author:"suresh adhikari",
//             active:false,
//             videos:10
//     });
//        const mongoose = new Language({
//             name: "mongoose",
//             type:"database",
//             author:"suresh adhikari",
//             active:false,
//             videos:10
//      });
//        const mongoSchema = new Language({
//             name: "mongoSchema",
//             type:"database",
//             author:"suresh adhikari",
//             active:false,
//             videos:10
//      });
     
//     const result= await Language.insertMany([totalLanguage,database,mongoose,mongoSchema]);
//     console.log(result);
     
//  } catch (error) {
//      console.log(error);
//  }  
// }
// createDocs();

// ..................................................................................................................




// ................................database connection using async and await............................
const mongoose=require("mongoose");
const validator=require('validator');
const dbConnection = async ()=>{
    try {
      const connection= await mongoose.connect(
          "mongodb://localhost:27017/testDB",{useNewUrlParser:true, useUnifiedTopology:true, useCreateIndex:true}
          );
        console.log("connected");
    } catch (error) {
        console.log(error);   
    }
}
dbConnection();
// .....................................creating Schema with validation...................................

const testSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true, //same email prevention
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("email must be in it's format"); //if not email throw, msg
            }
        }
    },
    contact:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    isLogin:{
        type:Boolean,
        required:true
    },
    projectDone:{
        type:Number,
        required:true,
        validate(value){ 
            if(value < 0){
                throw new Error("nagative value is not allowed"); //custom validation
            }
        }
        //another way to validate
        // validate:{
        //     validator:function(value){
        //         return value.length < 0
        //     },
        //     message:"nagative value is not allowed"
        // }
    },
    date:{
        type:Date,
        default:Date.now()
    }
});

// create a collection using model
const TestData = new mongoose.model("test",testSchema);

// create a single doc
// const createSingleDoc = async()=>{
//     try {
//         const createDoc = new TestData({
//             name:"suresh",
//             email:"aloneas47@gmail.com",
//             contact:9813299677,
//             address:"rnp-12",
//             isLogin:false
           
//         });
//         const result= await createDoc.save();
//         console.log(result);

//     } catch (error) {
//         console.log(error); 
//     }
// }
// createSingleDoc();

// create a multiple doc
const createMultipleDoc = async()=>{
    try {
        const financialDoc = new TestData({
            name:"bikash",
            email:"bikash@gmail.com",
             contact:9813299688,
             address:"rnp-13",
             isLogin:true,
             projectDone:50

        });

        const markettingDoc = new TestData({
            name:"pratiusha",
            email:"pratiusha@gmail.c",
             contact:9813299688,
             address:"rnp-12",
             isLogin:true,
             projectDone:70
        });

        const productionDoc = new TestData({
            name:"pratiush",
            email:"pratiush@gmail.com",
             contact:9813299699,
             address:"rnp-11",
             isLogin:false,
             projectDone:80
        });
        const hiringDoc = new TestData({
            name:"samarpan",
            email:"samarpan@gmail.com",
             contact:9813299699,
             address:"rnp-11",
             isLogin:true,
             projectDone:90
        });
        
        const result = await TestData.insertMany([financialDoc, markettingDoc, productionDoc,hiringDoc]);
        console.log(result);
    
    } catch (error) {
        console.log(error);
    }
}
createMultipleDoc(); 

// read data from database using async and await
// const getData = async()=>{
//     try {
//         const result = await TestData.find({isLogin:true}).select({name:1}).limit(3).skip(1);
//         console.log(result);
//     } catch (error) {
//         console.log(error);
//     }
// }
// getData();

// advance query in mongodb
const getData = async()=>{
    try {
        const result = await TestData
        // read data using oerator..............
       // .find({projectDone:{$gte:50}}) //greaterthan or equalto 50
       // .find({email:{$in:["pratiush@gmail.com","bikash@gmail.com"]}}) //using $nin operator show specfied
      // .find({email:{$in:["pratiush@gmail.com","bikash@gmail.com"]}}) //using $nin operator not show specfied
        //read data using logical operator
       // .find({$or:[{name:"pratiush"},{address:"rnp-11"}]}) //must meet atleast one expression
        //.find({$and:[{name:"pratiush"},{address:"rnp-11"}]}) //must meet both expression
        .find({$and:[{name:"pratiush"}]})
       // .countDocuments(); //show number of matched docs
        //.sort({name:1}); // 1 means accending order
        .sort({name:-1}); // -1 means decending order
        // .select({name:1});
        console.log(result);


    } catch (error) {
        console.log(error);
    }
}
// getData();

// update doc

const updateDoc = async(_id) => {
    try {
        const result = await TestData.findByIdAndUpdate( {_id}, {$set:{ //testData.updateOne also works but not show data in console
            email:"bikash4747@gmail.com",
            address:"ratnanagar 12"
        }},{
            // add when show updated data
            new:true,
            useFindAndModify:false
        }
        
    );
    console.log(result);

    } catch (error) {
        console.log(error);
    }

} 
// updateDoc("6103d381d0be39043c75add0");


// delete doc

const deleteDoc=async(_id)=>{
    try {
        // const result = await TestData.deleteMany( {_id},(_id) ); //testData.deleteOne also works but not show deleted data in console
        result = await TestData.deleteMany( {_id:{ //delete many using operator
            $in:["6103d381d0be39043c75add2","6103d3df3235f2043e961839"]
        }});
        console.log(result);
        
    } catch (error) {
        console.log(error);
    }


}
// deleteDoc("6103d3df3235f2043e961839","6103d381d0be39043c75add2");
// deleteDoc();

