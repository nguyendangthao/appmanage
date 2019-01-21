

class Const {
    formatDate(type, date = new Date()) {
        let newDate = new Date(date);
        let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        let month = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        if (type === 'read')
            return `${day}-${month}-${year}`;
        else
            return `${year}-${month}-${day}`;
    }

    formatDateSaveData(date) {
        let newDate = date.split('-');
        return `${newDate[2]}-${newDate[1]}-${newDate[0]}`;
    }

}

export default new Const()