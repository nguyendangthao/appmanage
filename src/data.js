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
    getAllCategory(page = 0, pageSize = 0) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    if (page === 0 && pageSize === 0) {
                        tx.executeSql('select * from Category ORDER BY Id DESC', [], function (tx, res) {
                            resolve(res.rows._array);
                        });
                    }
                    else {
                        tx.executeSql('select * from Category ORDER BY Id DESC LIMIT ?,?;', [(page - 1) * pageSize, pageSize], function (tx, res) {
                            resolve(res.rows._array);
                        });
                    }

                },
            )
        });

    }

    addCategory(model) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('insert into Category (Name,Description,IsDelete,DateCreat,DateUpdate) values (?,?,?,?,?)',
                        [model.Name, model.Description, 0, model.DateCreat, model.DateUpdate], function (tx, res) {
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

    UpdateCategory(model) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('update Category set Name=?,Description=?,DateUpdate=? where Id=?;)',
                        [model.Name, model.Description, model.DateUpdate, model.Id], function (tx, res) {
                            var resuft;
                            if (!res.insertId)
                                resuft = true;
                            else
                                resuft = false;
                            resolve(resuft);
                        });
                },

            )
        });
    }


}
export default new API()

