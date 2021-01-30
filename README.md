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
### lol
