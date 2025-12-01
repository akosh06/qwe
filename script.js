document.addEventListener('DOMContentLoaded',()=>{
  const params = new URLSearchParams(window.location.search);

  // Index page
  const checkForm = document.getElementById('checkForm');
  const texNumber = document.getElementById('texNumber');
  const resultArea = document.getElementById('resultArea');

  if(!localStorage.getItem('cars_db')){
    const demo = {
      'TX12345': {number:'TX12345', model:'Toyota Camry', color:'Black', probeg:'45000', oil:'2025-01-15', img:'https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg'}
    };
    localStorage.setItem('cars_db', JSON.stringify(demo));
  }

  if(checkForm){
    checkForm.addEventListener('submit', e=>{
      e.preventDefault();
      const num = texNumber.value.trim();
      if(!num) return alert('Iltimos, tex-passport raqamini kiriting');
      const db = JSON.parse(localStorage.getItem('cars_db') || '{}');
      if(db[num]){
        const car = db[num];
        resultArea.innerHTML = `
          <div class="result-card">
            <div class="top">
              <img src="${car.img || 'https://cdn-icons-png.flaticon.com/512/743/743131.png'}" alt="Mashina">
              <div class="info">
                <h2>${car.model}</h2>
                <p><strong>Rangi:</strong> ${car.color || '-'}</p>
                <p><strong>Probeg:</strong> ${car.probeg || 0} km</p>
                <p><strong>Oxirgi yog' almashtirilgan:</strong> ${car.oil || '-'}</p>
                <p><strong>Tex-passport:</strong> ${car.number}</p>
              </div>
            </div>
            <div class="icons">
              <i class="fas fa-car"></i>
              <i class="fas fa-gas-pump"></i>
              <i class="fas fa-tools"></i>
            </div>
          </div>
        `;
      }else{
        resultArea.innerHTML = `
          <p style="color:var(--muted);margin-top:20px">Bu mashina registratsiya qilinmagan.</p>
          <a class="btn primary" href="register.html?number=${encodeURIComponent(num)}">Registratsiya qilish</a>
        `;
      }
    });

    const q = params.get('number');
    if(q){
      texNumber.value = q;
      checkForm.dispatchEvent(new Event('submit'));
    }
  }

  // Register page
  const registerForm = document.getElementById('registerForm');
  if(registerForm){
    const numberInput = document.getElementById('number');
    const q = params.get('number');
    if(q) numberInput.value = q;

    registerForm.addEventListener('submit', e=>{
      e.preventDefault();
      const number = numberInput.value.trim();
      const model = document.getElementById('model').value.trim();
      const color = document.getElementById('color').value.trim();
      const probeg = document.getElementById('probeg').value.trim();
      const oil = document.getElementById('oil').value;

      if(!number || !model) return alert('Tex-passport va model majburiy');

      const db = JSON.parse(localStorage.getItem('cars_db') || '{}');
      db[number]={number,model,color,probeg,oil,img:'https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_960_720.jpg'};
      localStorage.setItem('cars_db',JSON.stringify(db));

      alert('Mashina saqlandi!');
      window.location.href=`index.html?number=${encodeURIComponent(number)}`;
    });
  }
});
