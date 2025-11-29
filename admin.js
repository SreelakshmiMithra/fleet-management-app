let fleetData= [];
let filteredData= [];
//Add Fleet Function
function addFleet(){
    const regNo=document.getElementById('regNo').value.trim();
    const category=document.getElementById('category').value.trim();
    const driverName=document.getElementById('driverName').value.trim();
    const availabilty=document.getElementById('availability').value.checked;
    //validation
    if(!regNo){
        alert('Reg No is required');
        return;
    }
    if(!category){
        alert('Category is required');
        return;
    }
    if(!driverName){
        alert('Driver Name is required');
        return;
    }
    if(!availabilty){
        alert('Availability is required');
        return;
    }
    //create vehicle object
    const vehicle={
        id:Date.now(),
        regNo,
        category,
        driverName,
        availabilty:availability?'Available':'Unavailable'
    };
    fleetData.push(vehicle);
    //clearform
    document.getELementById('regNo').value='';
    document.getELementById('category').value='';
    document.getELementById('driverName').value='';
    document.getELementById('availability').checked=false;
    renderCards();


}


//RenderCards
function renderCards(){
    const container=document.getElementById('cardsContainer');
    const dataToShow = filteredData.length >0||isFilterActive()?filteredData:fleetData;
    if(dataToShow.length===0){
        container.innerHTML='<p>No vehicles to display</p>';
        return;
    }
    container.innerHTML=dataToShow.map(vehicle=>`
    <div class="card">
        <h4>${vehicle.regNo}</h4>
        <p><strong>Category:</strong> ${vehicle.category}</p>
        <p><strong>Driver Name:</strong> ${vehicle.driverName}</p>
        <p><strong>Availability:</strong> ${vehicle.availabilty}</p>

        <div class="card-actions">

            <button class="btn-update" onclick="updateDriver(${vehicle.id})">UpdateDriver</button>
            <button class="btn-toggle" onclick="toggleAvailability(${vehicle.id})">ChangeAvailability</button>
            <button class="btn-delete" onclick="deleteVehicle(${vehicle.id})">DeleteVehicle</button>
        </div>
    </div>
    `).join('');
    //Update Driver
    function updateDriver(id){
        const newDriver=prompt('Enter new driver name:');
        if(newDriverName && newDriverName.trim()){
            const vehicle=fleetData.find(v=>v.id===id);
            if(vehicle){
                vehicle.driverName=newDriverName.trim();
                applyFilters();
            }else if(newDriverName===''){
                alert('Driver name cannot be empty');

            }
        }
        //Toggle Availability
        function toggleAvailability(id){
            const vehicle=fleetData.find(v=>v.id===id);
            if(vehicle){
                vehicle.availabilty=vehicle.availabilty==='Available'?'Unavailable':'Available';
                applyFilters();
            }
        }
        //Delete Vehicle
        function deleteVehicle(id){
            if(confirm('Are you sure you want to delete this vehicle?')){
                fleetData=fleetData.filter(v=>v.id!==id);
                applyFilters();
        
            }
          
        }

    }
    //Apply Filters
    function applyFilters(){
        const categoryFilter=document.getElementById('filterCategory').value;
        const availabilityFilter=document.getElementById('filterAvailability').value;
        filteredData=fleetData.filter(vehicle=>{
            const categoryMatch=categoryFilter==='All'||vehicle.category===categoryFilter;
            const availabilityMatch=availabilityFilter==='All'||vehicle.availabilty===availabilityFilter;
            return categoryMatch && availabilityMatch;
        });
        renderCards();

    }
    //Clear Filters
    function clearFilters(){
        document.getElementById('filterCategory').value='All';
        document.getElementById('filterAvailability').value='All';
        filteredData=[];
        renderCards();
    }
    //Check if filter is active
    function isFilterActive(){
        return document.getElementById('filterCategory').value!=='All'||document.getElementById('filterAvailability').value!=='All';
    }   
}
//Initial Render
renderCards();