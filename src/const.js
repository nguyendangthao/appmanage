

class Const {
    formatDate(date) {
        let newDate = new Date(date);
        let day = newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate();
        let month = newDate.getMonth() + 1 < 10 ? '0' + (newDate.getMonth() + 1) : newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        return `${day}-${month}-${year}`;
    }

}

export default new Const()