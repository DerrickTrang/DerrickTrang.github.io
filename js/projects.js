var lastItemId;

const makeProjectsWork = () => {
    lastItemId = "";

    document.querySelectorAll(".project-header").forEach((e) => {
        e.addEventListener('click', () => {
            // Unselect last item
            if(lastItemId != "") {           
                let lastHeader = document.querySelector("#" + lastItemId);
                lastHeader.className = "project-header";
    
                let lastDesc = document.querySelector("#" + lastItemId + "+ .project-desc-selected");
                lastDesc.className = "project-desc";
                
                let lastItem = lastDesc.parentNode;
                lastItem.className = "project-item";            
            }
            
            if(lastItemId != e.id) {
                let header = document.querySelector("#" + e.id);
                header.className = "project-header-selected";
    
                let desc = document.querySelector("#" + e.id + "+ .project-desc");
                desc.className = "project-desc-selected";
    
                let item = desc.parentNode;
                item.className = "project-item-selected";
                lastItemId = e.id;
            } else {
                lastItemId = "";
            }
        })
    });
}

makeProjectsWork();