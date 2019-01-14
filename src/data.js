import Expo, { SQLite } from 'expo';
const db = SQLite.openDatabase('db.db');
export const Data = function () {
    db.transaction(tx => {
        tx.executeSql(
            `create table if not exists Category (Id integer primary key not null, Name text, Description text,
                IsDelete integer,DateCreat text,DateUpdate text);`
        );
        tx.executeSql(
            `create table if not exists Product (Id integer primary key not null,CategoryId integer, Name text,
                 Description text,Quantity text,Price text, IsDelete integer,DateCreat text,DateUpdate text);`
        );
    });
    return null;
};

export const geta = async function (id) {
    var a = {};
    await db.transaction(
        tx => {
            tx.executeSql('select * from Category where Id=?;', [id], function (tx, res) {
                a = res.rows._array;
            });
        },
    )
    return a;

}