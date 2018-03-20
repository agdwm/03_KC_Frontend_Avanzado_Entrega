export default class PaginationService {

    constructor(pagination){
        $.extends(pagination, {
            pageSize: 6, //nº elementos por pagina
            showGoInput: true,
            showGoButton: true,
            showBeginingOnOmit: false,
            showEndingOnOmit: false,
            pageRange: 1,
            prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
            nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
        })
    }
}