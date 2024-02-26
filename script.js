let URL = new XMLHttpRequest();
URL.open("GET", "https://raw.githubusercontent.com/Rajavasanthan/jsondata/master/pagenation.json");
URL.send();
URL.onload = function () {
	let data = JSON.parse(URL.response);
	console.log(data);
	let table = document.createElement("table");
	table.setAttribute("id", "myTable");

	let thead = document.createElement("thead");

	let tr = document.createElement("tr");
	let th1 = document.createElement("th");
	th1.setAttribute("width","10%");
	th1.innerHTML = "ID";
	let th2 = document.createElement("th");
	th2.setAttribute("width","45%");
	th2.innerHTML = "Name";
	let th3 = document.createElement("th");
	th3.setAttribute("width","45%");
	th3.innerHTML = "eMail";

	let tbody = document.createElement("tbody");

	tr.append(th1, th2, th3);
	thead.appendChild(tr);

	data.forEach(ele => {
		let tr = document.createElement("tr");
		let td1 = document.createElement("td");
		td1.innerHTML = ele.id;
		let td2 = document.createElement("td");
		td2.innerHTML = ele.name;
		let td3 = document.createElement("td");
		td3.innerHTML = ele.email;

		tr.append(td1, td2, td3);
		tbody.appendChild(tr);
	});
	table.append(thead, tbody);
	document.body.append(table);

	var items = table.getElementsByTagName('tr');
	var itemsPerPage = 10; // Change this value to adjust items per page
	var pageCount = Math.ceil((items.length - 1) / itemsPerPage); // subtract 1 for excluding header row

	function displayPage(page) {
		var startIndex = (page - 1) * itemsPerPage + 1; // add 1 to exclude header row
		var endIndex = startIndex + itemsPerPage;

	// Hide all items first
		for (var i = 1; i < items.length; i++) { // start from index 1 to exclude header row
			items[i].style.display = 'none';
		}

	// Display items for current page
		for (var i = startIndex; i < endIndex && i < items.length; i++) {
			items[i].style.display = '';
		}
	}

	function setupPagination() {
		var center = document.createElement('div');
		center.setAttribute('class', 'center');
		var pagination = document.createElement('div');
		pagination.setAttribute('class', 'pagination');
		center.appendChild(pagination);
		document.body.append(center);

		for (var i = 1; i <= pageCount; i++) {
			var link = document.createElement('a');
			link.href = '#';
			link.textContent = i;

			link.onclick = (function (page) {
				return function () {
					displayPage(page);
					var current = pagination.querySelector('.active');
					if (current) current.classList.remove('active');
					this.classList.add('active');
				};
			})(i);

			if (i === 1) link.classList.add('active');
			pagination.appendChild(link);
		}
	}
	displayPage(1);
	setupPagination();
};
