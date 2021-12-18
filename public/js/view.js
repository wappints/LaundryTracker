let $ = require('jquery')  // jQuery now loaded and assigned to $
let count = 1
$('#click-counter').text(count.toString())
$('#countbtn').on('click', () => {
   count ++ 
   $('#click-counter').text(count)
}) 