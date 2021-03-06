import Expo, { SQLite } from 'expo';
import Const from './const';
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

    // Category

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
                            if (res.insertId)
                                resolve(res.insertId);
                                
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
    checkdeleteCategory(id) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('select * from Product where CategoryId=?;', [id], function (tx, res) {
                        resolve(res.rows._array.length);
                    });
                },
            )
        });

    }

    // Product
    getAllProduct(page = 0, pageSize = 0) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    if (page === 0 && pageSize === 0) {
                        tx.executeSql('select * from Product ORDER BY Id DESC', [], function (tx, res) {
                            resolve(res.rows._array);
                        });
                    }
                    else {
                        tx.executeSql('select * from Product ORDER BY Id DESC LIMIT ?,?;', [(page - 1) * pageSize, pageSize], function (tx, res) {
                            resolve(res.rows._array);
                        });
                    }

                },
            )
        });

    }

    addProduct(model) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('insert into Product (CategoryId,Name,Description,Quantity,Price,IsDelete,DateCreat,DateUpdate) values (?,?,?,?,?,?,?,?)',
                        [model.CategoryId, model.Name, model.Description, model.Quantity, model.Price, 0, model.DateCreat, model.DateUpdate], function (tx, res) {
                            if (res.insertId)
                                resolve(res.insertId);
                        });
                },

            )
        });
    }

    deleteProduct(id) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('delete from Product where Id=?;', [id], function (tx, res) {
                        resolve(res.rows._array);
                    })

                },

            )
        });
    }

    updateproduct(model) {
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql('update Product set CategoryId=?, Name=?,Quantity=?,Price=?,Description=?,DateUpdate=? where Id=?;)',
                        [model.CategoryId, model.Name, model.Quantity, model.Price, model.Description, model.DateUpdate, model.Id], function (tx, res) {
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

    //search

    searchCategory(model) {
        let stringQuery = `select * from Category where`;
        if (!!model.Name) {
            stringQuery = stringQuery + ` Name LIKE '%${model.Name}%' and`;
        }
        if (!!model.Description) {
            stringQuery = stringQuery + ` Description LIKE '%${model.Description}%' and`;
        }
        if (!!model.DateFrom && !model.DateTo) {
            var dateNow = Const.formatDate(new Date());
            var date = Const.formatDateSaveData(model.DateFrom);
            stringQuery = stringQuery + ` DateCreat between '${date}' and '${dateNow}' and`;
        }
        if (!!model.DateFrom && !!model.DateTo) {
            var dateFrom = Const.formatDateSaveData(model.DateFrom);
            var dateTo = Const.formatDateSaveData(model.DateTo);
            stringQuery = stringQuery + ` DateCreat between '${dateFrom}' and '${dateTo}' and`;

        }

        if (stringQuery.slice(stringQuery.length - 3) === 'and')
            stringQuery = stringQuery.slice(0, stringQuery.length - 4);
        else
            stringQuery = stringQuery.slice(0, stringQuery.length - 6);
        stringQuery = stringQuery + ` ORDER BY Id DESC ;`;
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql(stringQuery, [], function (tx, res) {
                        resolve(res.rows._array);
                    });
                },

            )
        });
    }
    searchProdcut(model) {
        let stringQuery = `select * from Product where`;
        if (!!model.CategoryId && model.CategoryName !== ' ') {
            stringQuery = stringQuery + ` CategoryId =${model.CategoryId} and`;
        }
        if (!!model.Name) {
            stringQuery = stringQuery + ` Name LIKE '%${model.Name}%' and`;
        }
        if (!!model.Description) {
            stringQuery = stringQuery + ` Description LIKE '%${model.Description}%' and`;
        }
        if (!!model.DateFrom && !model.DateTo) {
            var dateNow = Const.formatDate(new Date());
            var date = Const.formatDateSaveData(model.DateFrom);
            stringQuery = stringQuery + ` DateCreat between '${date}' and '${dateNow}' and`;
            // stringQuery = stringQuery + ` DateCreat >= '${date}' and DateCreat <='${dateNow}' and`;
        }
        if (!!model.DateFrom && !!model.DateTo) {
            var dateFrom = Const.formatDateSaveData(model.DateFrom);
            var dateTo = Const.formatDateSaveData(model.DateTo);
            stringQuery = stringQuery + ` DateCreat between '${dateFrom}' and '${dateTo}' and`;
        }
        if (stringQuery.slice(stringQuery.length - 3) === 'and')
            stringQuery = stringQuery.slice(0, stringQuery.length - 4);
        else
            stringQuery = stringQuery.slice(0, stringQuery.length - 6);
        stringQuery = stringQuery + ` ORDER BY Id DESC ;`;
        return new Promise(function (resolve, reject) {
            db.transaction(
                tx => {
                    tx.executeSql(stringQuery, [], function (tx, res) {
                        resolve(res.rows._array);
                    });
                },

            )
        });

    }

}
export default new API()

