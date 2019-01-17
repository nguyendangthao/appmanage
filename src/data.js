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
};

class API {
    getAllCategory(page = 1, pageSize = 5) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('select * from Category ORDER BY Id DESC LIMIT ?,?;', [(page - 1) * pageSize, pageSize], function (tx, res) {
                        resolve(res.rows._array);
                    });
                },
            )
        });

    }

    addCategory(model) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('insert into Category (Name,Description,IsDelete,DateCreat,DateUpdate) values (?,?,?,?,?)',
                        [model.name, model.description, 0, model.dateCreat, model.dateUpdate], function (tx, res) {
                            if (res.insertId) {
                                tx.executeSql('select * from Category where Id=?;', [res.insertId], function (tx, res) {
                                    resolve(res.rows._array);
                                })
                            };
                        });
                },

            )
        });
    }

    deleteCategory(id) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('delete  from Category where Id=?;', [id], function (tx, res) {
                        resolve(res.rows._array);
                    })

                },

            )
        });
    }

}
export default new API()

