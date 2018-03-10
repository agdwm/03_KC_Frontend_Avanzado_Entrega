export default class DateService {
    
    constructor(){

        this.newDate = new Date();
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

    getDates(posts){

        for (let post of posts) {
            const currentDate = post.post_date_en;
            console.log("fecha:", currentDate);
            this.evaluateDate(currentDate);
        }
    }

    evaluateDate(currentDate){

        const auxDate = new Date(currentDate);

        if((this.newDate-auxDate) < this.minutoEnMs){
            console.log("Menos de 1 minuto");
            this.formatDate(this.newDate-auxDate, 'segundos');
        }else if((this.newDate-auxDate) < this.horaEnMs){
            console.log("Menos de 1 hora");
            this.formatDate(this.newDate-auxDate, 'minutos');
        }else if((this.newDate-auxDate) < this.diaEnMs){
            console.log("Menos de 1 dia");
            this.formatDate(this.newDate-auxDate, 'horas');
        }else if((this.newDate-auxDate) < this.semanaEnMs){
            console.log("Menos de 1 semana");
            this.formatDate(auxDate, 'dias');
        }else{
            console.log("Mas de 1 semana");
            this.formatDate(auxDate, 'semanas');
        }
    }

    formatDate(milisegundos,medida){
        if(medida == 'segundos'){
            console.log("OK, publicado hace ",(milisegundos/1000)+" segundos");
            //document.getElementById("menos1Minuto").innerHTML += (milisegundos/1000)+" segundos";
        }else if(medida == 'minutos'){
            console.log("OK, publicado hace ",(Math.trunc(milisegundos/60000))+" minutos");
        }else if(medida == 'horas'){
            console.log("OK, publicado hace ",Math.trunc(milisegundos/3600000)+" horas");
        }else if(medida == 'dias'){
            let fechaAux = new Date(milisegundos);
            console.log("OK, publicado el ",this.diasSemana[fechaAux.getDay()]);
        }else if(medida == 'semanas'){
            let fechaAux = new Date(milisegundos);
            console.log("OK, publicado el ",fechaAux.getDate()+"/",fechaAux.getMonth()+1
                    +"/",fechaAux.getFullYear()+" ",fechaAux.getHours()+":",fechaAux.getMinutes()
                    +":",fechaAux.getSeconds());
        }
    }

}