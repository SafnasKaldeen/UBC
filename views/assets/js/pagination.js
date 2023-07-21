var table = $('#root').tableSortable({
    data: data,
    columns: columns,
    searchField: '#searchField',
    responsive: {
        1100: {
            columns: {
                formCode: 'Form Code',
                formName: 'Form Name',
            },
        },
    },
    rowsPerPage: 10,
    pagination: true,
    tableWillMount: function() {
        console.log('table will mount')
    },
    tableDidMount: function() {
        console.log('table did mount')
    },
    tableWillUpdate: function() {console.log('table will update')},
    tableDidUpdate: function() {console.log('table did update')},
    tableWillUnmount: function() {console.log('table will unmount')},
    tableDidUnmount: function() {console.log('table did unmount')},
    onPaginationChange: function(nextPage, setPage) {
        setPage(nextPage);
    }
});

$('#changeRows').on('change', function() {
    table.updateRowsPerPage(parseInt($(this).val(), 10));
})

$("#table tr").click(function(){
    $(this).addClass('selected').siblings().removeClass('selected');
    var value=$(this).find('td:first').html();
    alert(value);
  });

