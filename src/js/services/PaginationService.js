export default class PaginationService {

    constructor(){ }

    paginate(itemsLength, items, htmlContainer, self){

        $("#pagination").pagination({
            dataSource: function(done){
                let result = [];

                for (var i = 1; i < itemsLength; i++) {
                    result.push(i);
                }
                done(result); //nº total de elementos
            },
            pageSize: 9, //nº elementos por pagina
            showGoInput: true,
            showGoButton: true,
            showBeginingOnOmit: false,
            showEndingOnOmit: false,
            pageRange: 1,
            prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
            nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
            callback: function(data, pagination){
                var html = self.renderPaginatedPosts(data, items);
                $(htmlContainer).html(html);
            }
        })
    }
}