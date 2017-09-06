
var delay = 500;
$(document).ready(function() {
	$(".block h1").bind("click", function(event){
		//alert("hello");
		var parent = $(event.target).parent();
		var p = parent.find("p");
		if ($(p).is(":visible")) $(p).slideUp(delay);
		else $(p).slideDown(delay);
	});
	
/*	$("#check_login").bind("click", function(event){
		//alert("true");
		$.ajax({
			url: "login.php",
			type: "POST",
			data: ("login=" + $("#name").val()),
			dataType: "text",
			success: function(result){
				$("#name").next().remove();
				//alert(result);
				if (result == "1") $("#name").after("<span> Login free</span>");
				else $("#name").after("<span> Login busi</span>");
			}
		});
	});*/
});

var arr = [], box, ei,ej;						
function swap(arr,i1,j1,i2,j2){				
	t = arr[i1][j1];
	arr[i1][j1] = arr[i2][j2];
	arr[i2][j2] = t;
}
window.onload = function() {				
	box = document.getElementById("box");
	newGame();				
	document.getElementById("reset").onclick = newGame;						
}
function cellClick(event) {
	var event = event || window.event,
		el = event.srcElement || event.target,
		/*
		 * получаем номер строки и столбца, на пересечении которых
		 * расположена ячейка. Мы записали их ранее в её id ячейки.
		*/
		i = el.id.charAt(0),
		j = el.id.charAt(2);
		/*
		 * Если пустая ячейка расположена в одном стобце или строке
		 * с ячейкой, по которой кликнули, и расстояние между
		 * этими ячейками 1, то меняем их содержимое местами
		 */		
	if((i == ei && Math.abs(j - ej) == 1) || (j == ej && Math.abs(i - ei) == 1)){					
		document.getElementById(ei + " " + ej).innerHTML = el.innerHTML;
		el.innerHTML = "";
		//Запоминаем положение пустой ячейки
		ei = i;
		ej = j;
		var q = true;
		//Проверяем не в выигрышной ли комбинации находятся ячейки.
		for(i = 0; i < 4; ++i)
			for(j = 0; j < 4; ++j)
				if(i + j != 6 && document.getElementById(i + " " + j).innerHTML != i*4 + j + 1){
					q = false;
					break;
				}
				if(q) alert("Victory!");
			}
}

function newGame(){			
	for(i = 0; i < 4; ++i){
		arr[i] = []
		for(j = 0; j < 4; ++j){
			if(i + j != 6)
				arr[i][j] = i*4 + j + 1;
			else
				arr[i][j] = "";
		}
	}
	ei = 3;
	ej = 3;
	for(i = 0; i < 1600; ++i)
		switch(Math.round(3*Math.random())){
			/*
			 * 0 соответсвует верхней соседней костяшке, 1 - правой  и т.д.
			 * обратим внимание что обмен местами, например,
			 * с верхней костяшкой возможен, если "пустое место"
			 * не ноходится у верхней границы игрового поля. Аналогично и для
			 * других соседних костяшек. При обмене изменяем переменные ei и ej.
			 */	
			case 0: if(ei != 0) swap(arr,ei,ej,--ei,ej); break; // up
			case 1: if(ej != 3) swap(arr,ei,ej,ei, ++ej); break; // right
			case 2: if(ei != 3) swap(arr,ei,ej,++ei,ej); break; // down
			case 3: if(ej != 0) swap(arr,ei,ej,ei,--ej); // left
		}
	var table = document.createElement("table"), //Cоздаём таблицу	
		tbody = document.createElement("tbody");					
	table.appendChild(tbody);
	for(i = 0; i < 4; ++i){
		var row = document.createElement("tr"); //Добавляем в неё строки
		for(j = 0; j < 4; ++j){
			var cell = document.createElement("td"); //Cоздаём ячейки
				cell.id = i + " " + j; 
				/*
				 * Привязываем к событию, происходящему
				 * при клике по ячейке таблицы функцию
				 * cellClick 
				 */				
				cell.onclick = cellClick;
				//Записываем в ячейку соответсвующий эл-т массива
				cell.innerHTML = arr[i][j];
				row.appendChild(cell);// Добавляем ячейку в строку
		}
		tbody.appendChild(row);// Добавляем строку в итаблицу			
	}
	/*
	 * Проверяем, нет ли у
		<div id="box"> дочернего эл-та.
	 * То есть таблицы. Она уже будет на странице
	 * если  функция newGame вызвана нажатием
	 * кнопки "New game", а не при загрузки страницы.
	*/
	if(box.childNodes.length == 1)
		box.removeChild(box.firstChild);//Удаляем таблицу, если она есть	
	box.appendChild(table);	// Запихиваем в box table</div>
}

var LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

/*window.onload = function () {
  document.body.onkeydown = function (e) {
    var e = e || window.event,
      keyCode = e.keyCode;
    
    switch (keyCode) {
      case LEFT :
        // обрабатываем нажатие клавиши "влево"
        break;
      case UP :
        // обрабатываем нажатие клавиши "вверх"
        break;
      case RIGHT :
        // обрабатываем нажатие клавиши "вправо"
        break;
      case DOWN :
        // обрабатываем нажатие клавиши "вниз"
        break;
      default :
         // если нажато что-то другое завершаем выполнение ф-и
        return false;
    }
    
    return false;    
  }
}*/