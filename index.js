
const loodData= async(phoneText, isShowAll)=>{
    const responce = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneText} `)
    const data = await responce.json()
    const phones= data.data
    
    // console.log(phones)
    displayData(phones, isShowAll)
}

const displayData = (phones, isShowAll)=>{
    // console.log(phones)
    const cardData = document.getElementById('phoneCard')
    cardData.textContent=' '

    const showAll = document.getElementById('showAll')
    if(phones.length> 10 && !isShowAll){
        showAll.classList.remove('hidden')
    }else{
        showAll.classList.add('hidden')
    }

    console.log('is show all', isShowAll)

if(!isShowAll){
    phones=phones.slice(0, 5)
}

    phones.forEach(phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div')
        phoneCard.classList=`card  bg-base-100 shadow-xl`
        phoneCard.innerHTML=`
        <figure class="px-10 pt-10">
        <img src="${phone.image} " alt="Shoes" class="rounded-xl" />
      </figure>
      <div class="card-body items-center text-center">
        <h2 class="card-title">${phone.phone_name} </h2>
        <p>${phone.brand} </p>
        <div class="card-actions">
          <button class="btn btn-primary" onclick="showDetail('${phone.slug} ')">Detals</button>
        </div>
      </div>

        
        
        `

        cardData.appendChild(phoneCard)
        
    });
    loadingSpiner(false)

}


const searchClick =(isShowAll)=>{
    loadingSpiner(true)
    const inputText= document.getElementById('input')
    const inputValue = inputText.value;
    console.log(inputValue)
    loodData(inputValue, isShowAll)

}

const loadingSpiner= (isLodding)=>{
    const loadingSpinerID = document.getElementById('loddingSpner')
    if(isLodding){
        loadingSpinerID.classList.remove('hidden')
    }else{
        loadingSpinerID.classList.add('hidden')
    }
}


const showAllButton= ()=>{
    // console.log('show all click')

    searchClick(true)
}



const showDetail= async(_id)=>{
    // console.log('click', _id)

 const responce= await fetch('https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089')
 const data=await responce.json()
 const phone = data.data
 
//  console.log(data)
 showModalDetail(phone)

}



const showModalDetail = (data)=>{

    const modalContent = document.getElementById('modal-continer')
    modalContent.innerHTML=`
    
    <dialog id="my_modal_5" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box">

  <img src='${data.image}'/>
    <h3 class="font-bold text-lg">${data.name} </h3>
    <p class="py-4">${data.releaseDate} </p>
    <p class="py-4">${data.others.GPS} </p>
    <p class="py-4">${data.others.USB} </p>
    <p class="py-4">${data.others.WLAN} </p>
    <p class="py-4">${data.others.Bluetooth} </p>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>
</dialog>
    
    
    
    
    `

    my_modal_5.showModal()
}











// loodData()