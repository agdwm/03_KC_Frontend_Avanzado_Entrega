export default class DateService {
    
    constructor(){

        this.fechaActual = new Date();
        this.minutoEnMs = 60000;
        this.horaEnMs = 3600000;
        this.diaEnMs = 86400000;
        this.semanaEnMs = 604800016;
        this.diasSemana = [
            "Domingo",
            "Lunes",
            "Martes",
            "Miércoles",
            "Jueves",
            "Viernes",
            "Sábado"
        ];
    }

    init() {   }

    getDates(post){
        const elemento = post.post_date_en;
        return this.evaluateDate(elemento);
    }

    evaluateDate(elemento) {
        let dateFormatted = "";
        const fechaAux = new Date(elemento);
        let milisegundos = this.fechaActual-fechaAux;

        if((this.fechaActual-fechaAux) < this.minutoEnMs){
            dateFormatted = `Publicado hace ${milisegundos/1000} segundos`;
        }else if((this.fechaActual-fechaAux) < this.horaEnMs){
            dateFormatted = `Publicado hace ${Math.trunc(milisegundos/60000)} minutos`;
        }else if((this.fechaActual-fechaAux) < this.diaEnMs){
            dateFormatted = `Publicado hace ${Math.trunc(milisegundos/3600000)} horas`;
        }else if((this.fechaActual-fechaAux) < this.semanaEnMs){
            let milisegundos = new Date(fechaAux);
            dateFormatted = `Publicado el ${this.diasSemana[milisegundos.getDay()]}`;
        }else{
            let milisegundos = new Date(fechaAux);
            dateFormatted = `Publicado el ${milisegundos.getDate()}/${milisegundos.getMonth()+1}/${milisegundos.getFullYear()}, ${milisegundos.getHours()}:${milisegundos.getMinutes()}:${milisegundos.getSeconds()}`;
        }
        return dateFormatted.toString();
    }
}