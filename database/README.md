# DB作り方等


```
sqlite3
```
```
.open file:///workspace/Esc-bot/database/Esc-bot.db
```
## point
```
create table point(id,user_name,user_id,point,createdAt,updatedAt);
```
```
sequelize model:create --freezeTableName --name point --attributes "user_name:string,user_id:string,point:integer"
```