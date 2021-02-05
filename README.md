# Index-a-custum-datastructure-
You can think of it as a better version of array. In array if you want to get key by value, you will need to loop over the whole array and the time complexity becomes O(n). But in my data structure, I tried to make the time complexity as much as constant even if you want to take key by value. That is the magic of Index. That is what I had tried to make.

## Get started
### CDN
```cdn
https://cdn.jsdelivr.net/gh/tanay-pingalkar/Index-a-custum-datastructure-@main/index.js
```
this is the lattest cdn. Npm package is not yet realeased.
```html
<script src='https://cdn.jsdelivr.net/gh/tanay-pingalkar/Index-a-custum-datastructure-@main/index.js'></script>
```
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
looks so simple and time complexity is also constant but you will need to remind index  and thats not good, above function work as array and thats not what we need.

### 3.
```typescript
const rahul=index.getAllOf('name','rahul');
```
this also looks simple and you dont even have to remind index but the time complexity is still O(n) and thats not what we except from Index.<br>
<br>
## Creating index
All this above methods are valid but not satisfying, to satisfy and to make time complexity approximatly constant, you will need to create an index like we make in mongodb if you know. By saying
```typescript
index.createIndex('name');  //indexName which is key of one of your property of your inserted  data
```
But make sure to create index before inserting data or all you previous data will lost.
now using this index you can perfom many actions 
### Get using custom index
```typescript
const rahul=index.getByCustomIndex('name','rahul'); //this will give you all data related to rahul
```
using this you can get imformation of rahul in better time complexity approximately constant but not constant(greater than equal to 1) but it depends on number of indexes you had created , in our case we had created 1 index thats why time complexity of above fuction is O(1). But this function doesnt care how many data you have.


## Updating values
to update value there are also many ways but each method varies form each other in terms of time complexity and usage.
### 1.
```typescript
index.update(uuid,new-value,key(optional));
```
example:-
```typescript
index.update(uuid,'i am backend developer','info');
```
or
```typescript
index.update(uuid,{
    name:'rahul',
    info:'i am one of the best frontend developer',
    data_of_birth:'7-8-2003'
});//this method is use to update many values;
```
Using update method you will need to know uuid which you can get when you insert data.But if you dont know uuid then you will not be able to use this method.By the way, the good thing about this method is that time complexity id constant.
### 2.
```typescript
index.updateByIndex(index,new-value,key(optional));
```
Example:-
```typescript
index.updateByIndex(3,'7-8-2003','date_of_birth');
```
This will update 3rd object in index. You can also skip "key" and can specify whole object which is going to replace. 
This method also has constant time complexity but you will still need to remind index value like in array.
### 3.
```typescript
index.updateAllOf(searchKey,searchValue,new-update,key(optional));
```
Example:-
```typescript
index.updateAllOf('name','rahul','7-8-2003','date_of_birth');
```
this method will update date_of_birth of rahul and you dont even have to know uuid nor index. But the problem here is that it time complexity is O(n)
because it is looping over whole object and comparing every object to the given object like array. But Index have better way to solve this problem by creating index.
### 4.Using Custom Index
first of all we will need to create index. Actually we had created index before but with index name "date_of_birth" but now we want find name Rahul and then update his date of 
birth.To do that type(WARNING:-type this before inserting data):-
```typescript
index.createIndex('name');//thats it but very important
```
now to update
```typescript
index.updateByCustomIndex('name','rahul','7-8-2003','date_of_birth')
//                      _____|     |        |__          |___
//                      |          |          |             |
//                [idex Name] [index value]  [new value]  [key(optional)]
```
