$(document).ready(function () {

  let indexCount = $(".index-no");
  indexCount.each((count, element) => {
    $(element).html(count + 1);
  });
  //////////////////////////////////////////////////// Adding of row using jquery code below ///////////////////////////////////////////////////////////////////
  $("#Add-Box").on("click", function () {
    let rowAdd = `<tr>
    <td data-label="ID" class="index-no"></td>
    <td data-label="Name"><input type="text" placeholder="Enter Your Name" class="name-val"/></td>
    <td data-label="Subject"><input type="text" placeholder="Subject name"class="subject-val"/></td>
    <td data-label="Marks"><input type="number" placeholder="Marks" class="mark-val"/></td>
    <td data-label="Result"><button class="btn btn-primary pass-btn" type="button"> Pass</button><button class="btn btn-danger fail-btn" type="button">Fail</button></td>
    <td data-label="Add/Remove"><button class="rem-style rem">Remove</button></td>
    </tr>`;
    tableBody = $("table tbody");
    tableBody.append(rowAdd);
    $("#Table_1 tbody tr:last-child").hide().fadeIn("slow");
    let indexCount = $(".index-no");
    indexCount.each((count, element) => {
      $(element).html(count + 1);
    });
    $(".fail-btn").each(function(index) {
      $(this).on("click", function() {
        $(this).css("background-color", "red");
        $(".pass-btn").eq(index).css("background-color", "cyan");
        $(this).parent().parent().removeClass("showcontent");
      });
    });
    
    $(".pass-btn").each(function(index) {
      $(this).on("click", function() {
        $(this).css("background-color", "#16FF00");
        $(".fail-btn").eq(index).css("background-color", "#f387ab");
        $(this).parent().parent().addClass("showcontent");
      });
    });
  
  });
  
  //////////////////////////////////////////////// Removing of Rows Code below //////////////////////////////////////////////////////////////////////////////////
  $("#Table_1").on("click", ".rem", function () {
    if(!confirm("Are You Sure to Delete This Row")){
      return;
    }
    $(this).closest("tr").remove();
    let indexCount = $(".index-no");
    indexCount.each((count, element) => {
      $(element).html(count + 1);
    });


  });

  ///////////////////////////////////////////////// Adding new table code below  //////////////////////////////////////////////////////////////////////
  function saveTable(){
  $(".saved-btn").on("click",()=>{
    const table = $("#SavedTable");
    table.empty();
  
    const row1 = $("<tr>");
    const Newcell = $("<th>").text("Id");
    const Newcell1 = $("<th>").text("Name");
    const Newcell2 = $("<th>").text("Subject");
    const Newcell3 = $("<th>").text("Marks");
    const Newcell4 = $("<th>").text("Result");
    row1.append(Newcell, Newcell1, Newcell2, Newcell3, Newcell4);
    table.append(row1);
  
    let new_val = 1;
    const name_val = $(".name-val");
    const subject_val = $(".subject-val");
    const mark_val = $(".mark-val");
  
    for (let i = 0; i < name_val.length; i++) {
      if (name_val[i].parentElement.parentElement.classList.value == "showcontent") {
        const row = $("<tr>");
        const Cell1 = $("<td>").text(new_val);
        const Cell2 = $("<td>").text(name_val[i].value);
        const Cell3 = $("<td>").text(subject_val[i].value);
        const Cell4 = $("<td>").text(mark_val[i].value);
        const Cell5 = $("<td>").text("Pass");
        // console.log(name_val)
        // console.log(subject_val)
  
        if (mark_val[i].value >= 33) {
          row.addClass("pass-col");
        } else {
          row.addClass("tab-col");
          Cell5.text("Fail");
        }
  
        row.append(Cell1, Cell2, Cell3, Cell4, Cell5);
        table.append(row);
  
        new_val++;
      }
    }
    new_val = 1;
  
    const sort = $("#sort");
    sort.css("display", "block");
    
  })
  }
  /////////////////////////////////// Adding Of color on click of pass fail //////////////////
  $(".fail-btn").each(function(index) {
    $(this).on("click", function() {
      $(this).css("background-color", "red");
      $(".pass-btn").eq(index).css("background-color", "cyan");
      $(this).parent().parent().removeClass("showcontent");
    });
  });
  
  $(".pass-btn").each(function(index) {
    $(this).on("click", function() {
      $(this).css("background-color", "#16FF00");
      $(".fail-btn").eq(index).css("background-color", "#f387ab");
      $(this).parent().parent().addClass("showcontent");
    });
  });

////////////////////////////////////// Search function code below ////////////////////////////
  $("#myInput").on("input", function() {
    var value = $(this).val();
    $("#SavedTable tr").each(function(index) {
      if (index !== 0) {
        let id = $(this).find("td:nth-child(2)").text();
        console.log(value);
          if (id.indexOf(value) !=0) {
              $(this).hide();
          }
          else {
              $(this).show();
          }

      }
    });
  })

  /////////////////////////////////// Adding of Percentage Table ////////////////////////////
  function percetTable(){
 $(".saved-btn").on('click',(()=>{
    let name_val = $(".name-val");
    let mark_val = $(".mark-val");
    let table = $("#PercentageTable");
    table.empty();
  
    let markArr = [];
    let nameArr = [];
    let nameCount = [];
    for (let i = 0; i < name_val.length; i++) {
      markArr.push(mark_val[i].value);
      nameArr.push(name_val[i].value.toLowerCase());
    }
  
    const uniqueNames = new Set(nameArr);
    Array.from(uniqueNames).forEach((uniquename, uindex) => {
      count = 0;
      nameArr.forEach((name) => {
        if (uniquename == name) {
          count++;
          nameCount[uindex] = count;
        }
      });
    });
  
    const keyValueObject = {};
    for (let i = 0; i < mark_val.length; i++) {
      keyValueObject[name_val[i].value] = parseInt(mark_val[i].value);
    }
  
    acc = {};
    nameArr.map((name, index) => {
      acc[name] = (acc[name] || 0) + keyValueObject[name];
    });
  
    let keyVal = Object.keys(acc);
    let valValue = Object.values(acc);
  
    let row1 = table[0].insertRow(0);
    let Newcell = row1.insertCell(0);
    let Newcell1 = row1.insertCell(1);
    let Newcell2 = row1.insertCell(2);
    let Newcell3 = row1.insertCell(3);
    Newcell.innerHTML = `<th>Id</th>`;
    Newcell1.innerHTML = `<th>Name</th>`;
    Newcell2.innerHTML = `<th>Marks</th>`;
    Newcell3.innerHTML = `<th>Percentage</th>`;
    let new_val = 1;
    for (let i = 0; i < keyVal.length; i++) {
      // if (name_val[i].parentElement.parentElement.classList.value == "showcontent") {
        let row = table[0].insertRow(-1);
        let Cell1 = row.insertCell(0);
        let Cell2 = row.insertCell(1);
        let Cell3 = row.insertCell(2);
        let Cell4 = row.insertCell(3);
  
        if (mark_val[i].value >= 33) {
          Cell1.parentElement.classList.add("pass-col");
        }
        Cell1.innerHTML = `<tr><td>${new_val}</td>`;
        Cell2.innerHTML = `<td>${keyVal[i]}</td>`;
        Cell3.innerHTML = `<td>${valValue[i]}</td>`;
        Cell4.innerHTML = `<td> ${valValue[i] / nameCount[i]}%</td> </tr>`;
        if (mark_val[i].value <= 33) {
          Cell1.parentElement.classList.add("tab-col");
        }
        new_val++;
      // }
    }
    let PercentTableHead = $("#percentTable");
    PercentTableHead.show();
  }))
}

  ////////////////////////////////// form validation below /////////////////////////////////
  $('input[type="number"]').on('keypress', function(event) {
    let char = event.key;
    if (char === 'e' || char === 'E') {
      event.preventDefault();
    }
  });
 
$(".saved-btn").on('click',(()=>{
  let $form = $('#Table_1')
  let $allInputs = $form.find('input')
  $allInputs.each(function(){
    if($(this).val() == ""){
      Swal.fire('Please Fill All Values First')
      return
    }
    saveTable()
    percetTable()
    return
  })
}))

$('input[type="number"]').on('change', function(){
  let nam = parseInt($(this).val());
  if (nam < 0 || nam > 100) {
    Swal.fire("You Cannot add value less than 0 or greater than 100.");
    $(this).val('');
  }
});

$('input[type="text"]').on('keyup', function(event){
  let inputValue = $(this).val();
  if (/\d/.test(inputValue)) {
    $(this).val('');
  }
});


///////////////////////////////// Sort by name and subject code below //////////////////////
$(".sort-btn").click(function(){
  $("#SavedTable tr").sort(function(a, b){
    return $(a).find("td:eq(1)").text().localeCompare($(b).find("td:eq(1)").text());
  }).appendTo("#SavedTable");
});

$("#SortSub").click(function(){
  $("#SavedTable tr").sort(function(a, b){
    return $(a).find("td:eq(2)").text().localeCompare($(b).find("td:eq(2)").text());
  }).appendTo("#SavedTable");
});

  //////////////////////////////////////////// Adding Of Timer Code Below /////////////////////////////////////////////////////////////////////////////////////
  var totalSeconds = 360;
  setInterval(() => {
    totalSeconds -= 1;
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = Math.floor(totalSeconds - minutes * 60);
    let time = minutes + ":" + seconds;
    $("#TimeCount").html(time);

    // timer restart
    if (totalSeconds == 0) {
      Swal.fire("Click Me If You Want to Restart...").then((result) => {
        if (result.isConfirmed) {
          totalSeconds = 360;
          totalSeconds -= 1;
          let minutes = Math.floor(totalSeconds / 60);
          let seconds = Math.floor(totalSeconds - minutes * 60);
          let time = minutes + ":" + seconds;
          $("#TimeCount").html(time);
        }
      });
    }
  }, 1000);

  /////////////////////////////////////////////////// Animation Code Below ///////////////////////////////////////////////////////////////////////////////////
  $("#Table_1 tbody").hide().fadeIn(2000);
  $(".heading").hide().fadeIn(1000);
  $("footer").hide().fadeIn(1000);
  $("#Add-Box").hide().fadeIn(1000);
  var table = $("#Table_1");
  table.animate(
    {
      "margin-top": "100px",
    },
    500,
    function () {
      table.animate(
        {
          "margin-top": "0px",
        },
        500
      );
    }
  );
});
