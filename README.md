# Index-a-custum-datastructure-
You can think of it as a better version of array. In array if you want to get key by value, you will need to loop over the whole array and the time complexity becomes O(n). But in my data structure, I tried to make the time complexity as much as constant even if you want to take key by value. That is the magic of Index. That is what I had tried to make.

## Insertion
```typescript
const index=new Index();


index.insert({
  name:'tanay',
  info:'i am a self taught programmer',
  data_of_birth:'6-8-2006'
}); // must be object

index.insert({
  name:'david',
  info:'i am one of the best backend developer',
  data_of_birth:'7-8-2003'
}); // must be object

index.insert({
  name:'rahul',
  info:'i am one of the best frontend developer',
  data_of_birth:'7-8-2003'
}); // must be object

```
you can also try by consoling
```typescript
console.log(
  index.insert({
    name:'rahul',
    info:'i am one of the best frontend developer',
    data_of_birth:'7-8-2003'
  }
); // must be object)
```
you will get
```
ba293229-5df4-43a2-9136-ef0ad8594e19
```
this is the unique id for the object we had made which we will need afterwards

## Get/fetch
there are many ways to get inserted data
### 1.
```typescript
const inserted_data=index.get(unique id);
```
but i know that you dont know that unique id. You will need to store id when you are inserting. <br>
Like:-
```typescript
const uuid_of_rahul=index.insert({
  name:'rahul',
  info:'i am one of the best frontend developer',
  data_of_birth:'7-8-2003'
}); // must be object
const inserted_data=index.get(uuid_of_rahul);
```
But this not the correct ways and this way doesnt look that good. But its time complexity is constant.

### 2.
```typescript
const rahul=index.getByIndex(3);
```
looks so simple but you will need to remind index and the time complexity is O(n) and thats not good, above function work as array and thats not what we need.

### 3.
```typescript
const rahul=index.getAllOf('name','rahul');
```
this also looks simple and you dont even have to remind index but the time complexity is still O(n) and thats not what we except from Index.<br>
<br>
All this above methods are valid but not satisfying, to satisfy and to make time complexity approximatly constant, you will need to create an index like we make in mongodb if you know. By saying
```typescript
index.createIndex('name');  //indexName which is key of one of your property of your inserted  data
```
now using this index you can perfom many actions 
## Get using custom index
```typescript
const rahul=index.getByCustomId('name','rahul'); //this will give you all data related to rahul
```
using this you can get imformation of rahul in better time complexity approximately constant but not constant(greater than equal to 1) but it depends on number of indexes you had created , in our case we had created 1 index thats why time complexity of above fuction is O(1). But this function doesnt care how many data you have.
