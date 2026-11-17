
let products=[];
const rupiah=n=>n==null?'Harga tidak tersedia':new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(n);
const $=id=>document.getElementById(id);
function safe(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function render(){
 const q=$('search').value.trim().toLowerCase(),cat=$('category').value,sort=$('sort').value;
 let list=products.filter(p=>(!cat||p.category===cat)&&(!q||[p.name,p.description,p.category].join(' ').toLowerCase().includes(q)));
 if(sort==='low')list.sort((a,b)=>(a.price??Infinity)-(b.price??Infinity));
 if(sort==='high')list.sort((a,b)=>(b.price??-Infinity)-(a.price??-Infinity));
 if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name,'id'));
 if(sort==='rating')list.sort((a,b)=>(b.rating??0)-(a.rating??0));
 $('result-count').textContent=`${list.length} dari ${products.length} produk`;
 $('empty').classList.toggle('hidden',list.length!==0);
 $('product-grid').innerHTML=list.map(p=>`<article class="product-card">
 <div class="product-image">${p.image?`<img src="${safe(p.image)}" alt="${safe(p.name)}" loading="lazy" onerror="this.style.display='none'">`:''}<span class="image-fallback">LOGGIO</span>${p.discount?`<span class="discount">${safe(p.discount)}</span>`:''}</div>
 <div class="product-info"><span class="category-label">${safe(p.category)}</span><h3 class="product-name">${safe(p.name)}</h3><div class="price">${rupiah(p.price)}</div><div class="meta"><span>★ ${p.rating??'-'}</span><span>${safe(p.sold||'')}</span></div><div class="product-actions"><a class="detail-btn" href="${safe(p.url)}" target="_blank" rel="noopener">Lihat di Shopee ↗</a><a class="chat-btn" href="https://wa.me/?text=${encodeURIComponent('Halo, saya tertarik dengan '+p.name+' '+p.url)}" target="_blank" rel="noopener">Tanya</a></div></div></article>`).join('');
}
function addBubble(text,type){const d=document.createElement('div');d.className='bubble '+type;d.textContent=text;$('chat-messages').appendChild(d);$('chat-messages').scrollTop=$('chat-messages').scrollHeight;}
function answer(q){
 const s=q.toLowerCase();
 let list=products.filter(p=>(p.name+' '+p.description+' '+p.category).toLowerCase().includes(s));
 const max=s.match(/(?:di bawah|dibawah|kurang dari|maksimal)\s*(\d[\d.]*)/);
 const min=s.match(/(?:di atas|diatas|lebih dari|minimal)\s*(\d[\d.]*)/);
 if(max){const n=Number(max[1].replace(/\./g,''));list=products.filter(p=>p.price!=null&&p.price<=n);}
 else if(min){const n=Number(min[1].replace(/\./g,''));list=products.filter(p=>p.price!=null&&p.price>=n);}
 else if(/wanita|cewek|women/.test(s))list=products.filter(p=>p.category==='Jam Tangan Wanita');
 else if(/pria|cowok|men/.test(s))list=products.filter(p=>p.category==='Jam Tangan Pria');
 else if(/termurah|paling murah/.test(s))list=[...products].sort((a,b)=>(a.price??Infinity)-(b.price??Infinity)).slice(0,5);
 else if(/termahal|paling mahal/.test(s))list=[...products].sort((a,b)=>(b.price??0)-(a.price??0)).slice(0,5);
 else if(/rating|terbaik|terlaris/.test(s))list=[...products].sort((a,b)=>(b.rating??0)-(a.rating??0)).slice(0,5);
 if(!list.length)return 'Maaf, saya belum menemukan produk yang cocok. Coba kata kunci seperti “jam tangan pria”, “wanita”, atau “di bawah 60000”.';
 return `Saya menemukan ${list.length} produk yang sesuai.\\n`+list.slice(0,5).map((p,i)=>`${i+1}. ${p.name}\\nHarga: ${rupiah(p.price)} | Rating: ${p.rating??'-'}\\n${p.url}`).join('\\n\\n')+(list.length>5?'\\n\\nSaya tampilkan 5 hasil pertama. Silakan gunakan pencarian dan filter pada katalog untuk melihat lainnya.':'');
}
$('search').addEventListener('input',render);$('category').addEventListener('change',render);$('sort').addEventListener('change',render);
$('chat-form').addEventListener('submit',e=>{e.preventDefault();const q=$('chat-input').value.trim();if(!q)return;addBubble(q,'user');addBubble(answer(q),'bot');$('chat-input').value='';});
fetch('data/products.json').then(r=>{if(!r.ok)throw Error('Gagal membaca data');return r.json()}).then(data=>{products=data;$('total-products').textContent=products.length;render();}).catch(err=>{$('product-grid').innerHTML='<div class="loading">Data produk tidak dapat dimuat. Jalankan melalui Live Server atau hosting web.</div>';console.error(err);});
