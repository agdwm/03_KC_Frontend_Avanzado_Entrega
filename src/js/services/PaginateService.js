export default class PaginateService {

    constructor(){
        this.pageSize = 9;
        this.showGoInput = true;
        this.showGoButton = true;
        this.showBeginingOnOmit = false;
        this.showEndingOnOmit = false;
        this.pageRange = 1;
        this.prevText = '<i class="glyphicon glyphicon-chevron-left"></i>';
        this.nextText = '<i class="glyphicon glyphicon-chevron-right"></i>';
    }

    paginate(itemsLength, items, htmlContainer, self){

        $("#pagination").pagination({
            dataSource: function(done){
                let result = [];

                for (var i = 1; i < itemsLength; i++) {
                    result.push(i);
                }
                done(result); //nº total de elementos
            },
            pageSize: this.pageSize, //nº elementos por pagina
            showGoInput: this.showGoInput,
            showGoButton: this.showGoButton,
            showBeginingOnOmit: this.showBeginingOnOmit,
            showEndingOnOmit: this.showEndingOnOmit,
            pageRange: this.pageRange,
            prevText: this.prevText,
            nextText: this.nextText,
            callback: function(data, pagination){
                var html = self.renderPaginatedPosts(data, items);
                $(htmlContainer).html(html);
            }
        })
    }
}