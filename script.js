const gridButton= document.getElementById('grid');
const listButton=document.getElementById('list');
    const searchInput = document.getElementById('searchInput');
    const sortMarketCapBtn = document.getElementById('sortMarketCapBtn');
    const sortPercentageChangeBtn = document.getElementById('sortPercentageChangeBtn');
    var div1 = document.getElementById('crypto');
    var div2 = document.getElementById('table');

  
    let cryptoData = []; // Holds the original data fetched from the API
    var Num;
  
    // Fetch data using .then method
  
    // Fetch data using async/await method
    fetchData(1);
    function fetchData(divNum) {
      const apiURL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';
  
      fetch(apiURL)
        .then(response => response.json())
        .then(data => {
          cryptoData = data; // Store the fetched data
          
          if (divNum === 1) {
              Num=1;
            console.log(divNum);
            div1.style.display='block'; 
            div2.style.display = "none";
            gridButton.classList.add("btn");
            listButton.classList.remove("btn");
            
            
           
            renderGrid(data);
          } else if(divNum===2){
            Num=2
            console.log(divNum)
            div1.style.display = "none";
            div2.style.display = "block";
            div2.classList.add("btn");
            listButton.classList.add("btn");
            gridButton.classList.remove("btn");

            renderTable(data)
          }
    

        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
    
  
  
    function renderTable(data) {

      const tableBody = document.getElementById('cryptoTableBody');
  
      // Clear existing table data
      while (tableBody.firstChild) {
        tableBody.firstChild.remove();
      }
  
      data.forEach(crypto => {
        const row = document.createElement('tr');
        const { name, id, image, symbol, current_price, total_volume, price_change_percentage_24h } = crypto;
        const priceChangePercentage = parseFloat(price_change_percentage_24h).toFixed(2);
        const td1=document.createElement('td');
        td1.setAttribute('data-label','LOGO')
        const img = document.createElement('img');
        img.setAttribute('width','30px');
        img.setAttribute('height','30px');

        
        img.src=image;
        td1.append(img);
        const td2=document.createElement('td');
        td2.setAttribute('data-label','ID')
        td2.textContent=id;
        const td3=document.createElement('td');
        td3.setAttribute('data-label','Name')
        td3.textContent=name;
        const td4=document.createElement('td');
        td4.textContent=symbol;
        td4.setAttribute('data-label','SYMBOL')
        const td5=document.createElement('td');
        td5.setAttribute('data-label','CURRENT PRICE')
        td5.textContent=current_price;
        const td6=document.createElement('td');
        td6.setAttribute('data-label','PRICE CHANGE IN %')
        td6.textContent=price_change_percentage_24h;
        if(price_change_percentage_24h<0){
          td6.style.color="red";
        }
        else{
          td6.style.color="green";
        }
        row.append(td1);
        row.append(td2);
        row.append(td3);
        row.append(td4);
        row.append(td5);
        row.append(td6);

        
        



        // row.innerHTML = `
        //     <td><img src="${image}" alt="${name}" width="32" height="32"></td>
        //     <td>${id}</td>

        //   <td>${name}</td>
        //   <td>${symbol}</td>
        //   <td>$${current_price}</td>
        //   <td>${priceChangePercentage}%</td>
        // `;
  
        tableBody.appendChild(row);
       // document.getElementById('crypto-grid').style.display="none";
      });
    }
  
    function filterData() {
      const searchText = searchInput.value.toLowerCase();
      const filteredData = cryptoData.filter(crypto => crypto.name.toLowerCase().includes(searchText));
//console.log(divNum);
      if (Num === 1) {
       // console.log(divNum);
        div1.style.display='block';
        div2.style.display = "none";
        renderGrid(filteredData);
      } else if(Num===2){
        //console.log(divNum)
        div1.style.display = "none";
        div2.style.display = "block";
        renderTable(filteredData)
      }


    }
  
    function sortData(sortBy) {
      const sortedData = [...cryptoData];
  
      if (sortBy === 'market_cap') {
        sortedData.sort((a, b) => a.market_cap - b.market_cap);
      } else if (sortBy === 'percentage_change') {
        sortedData.sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
      }
      if (Num === 1) {
       // console.log(divNum);
        div1.style.display='block';
        div2.style.display = "none";
        renderGrid(sortedData);
      } else if(Num===2){
        ///.log(divNum)
        div1.style.display = "none";
        div2.style.display = "block";
        renderTable(sortedData)
      }
  
    }
  
    searchInput.addEventListener('input', filterData);
    sortMarketCapBtn.addEventListener('click', () => sortData('market_cap'));
    sortPercentageChangeBtn.addEventListener('click', () => sortData('percentage_change'));
  
  

  
  // Function to render the grid with data
  function renderGrid(data) {

    const cryptoGrid = document.getElementById('crypto-grid');
    cryptoGrid.innerHTML = '';
  
    data.forEach(coin => {
      const cryptoCard = document.createElement('div');
      cryptoCard.classList.add('crypto-card');
      const image = document.createElement('div');
      image.classList.add('image');
  
      const img= document.createElement('img');
      img.src = coin.image;
      img.alt = coin.name;
      image.append(img);

  
      const name = document.createElement('h3');
      name.textContent = coin.name;
  
      const symbol = document.createElement('p');
      symbol.textContent = coin.symbol;
  
      const price = document.createElement('p');
      price.textContent = `Price: $${coin.current_price}`;
      const volume = document.createElement('p');
      volume.textContent = `Volume: $${coin.total_volume}`;
  
      const marketCap = document.createElement('p');
      marketCap.textContent = `Market Cap: $${coin.market_cap}`;
  
      const percentageChange = document.createElement('p');
      const span = document.createElement('span');
      span.textContent= `${coin.price_change_percentage_24h}%`;
      percentageChange.textContent = `Percentage Change (24h):`;
      if(coin.price_change_percentage_24h<0){
        span.style.color="red";
      }
      else{
        span.style.color="green";
      }
      percentageChange.append(span);

  
      cryptoCard.appendChild(image);
      cryptoCard.appendChild(name);
      cryptoCard.appendChild(symbol);
      cryptoCard.appendChild(price);
      cryptoCard.appendChild(volume);
      cryptoCard.appendChild(marketCap);
      cryptoCard.appendChild(percentageChange);
  
      cryptoGrid.appendChild(cryptoCard);

    });
  }
  
  // Fetch data using .then
  
  // Alternatively, fetch data using async/await
  // fetchDataWithAsyncAwait();
  