

class Const {
    formatDate(type, date = new Date()) {
        let newDate = new Date(date);
        let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        let month = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        if (type === 'read') {
            let getDay = newDate.getDay();
            let t = '';
            switch (getDay) {
                case 0:
                    t = 'CN';
                    break;
                case 1:
                    t = 'T2';
                    break;
                case 2:
                    t = 'T3';
                    break;
                case 3:
                    t = 'T4';
                    break;
                case 4:
                    t = 'T5';
                    break;
                case 5:
                    t = 'T6';
                    break;
                case 6:
                    t = 't7';
                    break;
            }
            return `${t}-${day}-${month}-${year}`;
        }
        else
            return `${year}-${month}-${day}`;
    }

    formatDateSaveData(date) {
        let newDate = date.split('-');
        return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
    }

}

export default new Const()