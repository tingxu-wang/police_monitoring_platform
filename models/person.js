var mongoose=require('mongoose')

mongoose.connect('mongodb://localhost/control')//使用control集合

var personSchema=new mongoose.Schema({
  name:String,//人名
  locationStr:String,//经纬度字符串 格式为:"12,11" x和y值中间用英文逗号隔开
  type:String//人员类别 0为市民 1为民警
},{
  collection:'person'
})

var PersonModel=mongoose.model('person',personSchema)

function Person(person){
  this.locationStr=person.locationStr
  this.name=person.name
  this.type=person.type
}

module.exports=Person

Person.prototype={
  save:function(callback){
    var person={
      name:this.name,
      locationStr:this.locationStr,
      type:this.type
    }
    var personModel=new PersonModel(person)

    var promise=personModel.save()
    promise.then((err,person)=>{
      if(err){
        return callback(err)
      }
      callback(null,person)
    })
  },
  get:function(name,callback){
    PersonModel.findOne({name},(err,person)=>{
      if(err){
        return callback(err)
      }
      callback(null,person)
    })
  }
}
